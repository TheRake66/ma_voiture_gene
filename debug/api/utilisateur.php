<?php
namespace Api;

use Kernel\Debug\Error;
use Kernel\Communication\Rest;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Session\User;
use Model\Dto\Ma_voiture_gene\Bloque;
use Model\Dto\Ma_voiture_gene\Plaque;
use Model\Dto\Ma_voiture_gene\Signale;
use Model\Dto\Ma_voiture_gene\Utilisateur as DTOUtilisateur;

/**
 * Module d'API Utilisateur.
 * 
 * @author thiba
 * @version 1.0
 * @package Api
 * @category API
 */
class Utilisateur extends Rest {

    /**
     * Appel via la méthode GET.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function get($route, $query, $body) {
        $this->match('/api/utilisateurs', function() {
            $users = DTOUtilisateur::all();
            if ($users) {
                foreach ($users as $user) {
                    if ($user->photo) {
                        $user->photo = base64_encode($user->photo);
                    }
                }
            }
            $this->send($users, 0, 'Recupération des utilisateurs réussie.');
        });
        $this->match('/api/utilisateurs/{id}', function() use ($query) {
            $id = $this->data($query, 'id');
            $user = new DTOUtilisateur($id);
            $user = $user->read();
            if ($user && $user->photo) {
                $user->photo = base64_encode($user->photo);
            }
            $this->send($user, 0, 'Recupération de l\'utilisateur "' . $id . '" réussie.');
        });
        $this->match('/api/utilisateurs/moi', function() use ($query) {
            $user = (new DTOUtilisateur(User::get()->_id))->read();
            if ($user && $user->photo) {
                $user->photo = base64_encode($user->photo);
            }
            $this->send($user, 0, 'Recupération de l\'utilisateur réussie.');
        });
        $this->match('/api/utilisateurs/{id}/bloque', function() use ($query) {
            $id = $this->data($query, 'id');
            $moi = User::get()->_id;
            $je_lai_bloque = new Bloque($moi, $id);
            $this->send($je_lai_bloque->exists(), 0, 'Verification si l\'utilisateur est bloqué.');
        });
        $this->match('/api/utilisateurs/{id}/bloque/moi', function() use ($query) {
            $id = $this->data($query, 'id');
            $moi = User::get()->_id;
            $il_ma_bloque = new Bloque($id, $moi);
            $this->send($il_ma_bloque->exists(), 0, 'Verification si l\'utilisateur est bloqué.');
        });
    }


    /**
     * Appel via la méthode POST.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function post($route, $query, $body) {
        $this->match('/api/utilisateurs/{id}/bloque', function() use ($query) {
            $id = $this->data($query, 'id');
            $moi = User::get()->_id;
            $je_lai_bloque = new Bloque($moi, $id);
            $this->send($je_lai_bloque->create(), 0, 'Bloquage de l\'utilisateur est bloqué.');
        });
        $this->match('/api/utilisateurs/{id}/rapport', function() use ($query, $body) {
            $id = $this->data($query, 'id');
            $raison = $this->data($body, 'raison');
            $signal = new Signale(User::get()->_id, $id, $raison);
            if (!$signal->exists()) {
                $this->send($signal->create(), 0, 'Signalement de l\'utilisateur.');
            } else {
                $this->send($signal->update(), 0, 'Mise a jour du signalement de l\'utilisateur.');
            }
        });
    }


    /**
     * Appel via la méthode PUT.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function put($route, $query, $body) {
        $this->send(null, 0, 'Fonction non implémentée !', 500);
    }


    /**
     * Appel via la méthode DELETE.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function delete($route, $query, $body) {
        $this->match('/api/utilisateurs/{id}/bloque', function() use ($query) {
            $id = $this->data($query, 'id');
            $moi = User::get()->_id;
            $je_lai_bloque = new Bloque($moi, $id);
            $this->send($je_lai_bloque->delete(), 0, 'Debloquage de l\'utilisateur est bloqué.');
        });
    }


    /**
     * Appel via la méthode PATCH.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function patch($route, $query, $body) {
        $this->match('/api/utilisateurs/moi', function() use ($body) {
            $nom = $this->data($body, 'nom');
            $prenom = $this->data($body, 'prenom');
            $email = $this->data($body, 'email');
            $photo = $this->data($body, 'photo');
            $user = (new DTOUtilisateur(User::get()->_id))->read();
            $user->nom = $nom;
            $user->prenom = $prenom;
            if ($user->email != $email) {
                $verif = new DTOUtilisateur();
                $verif->email = $email;
                $verif = $verif->exists('email');
                $this->send(false, 0, 'Email déjà utilisé.', 409);
            } else {
                $user->email = $email;
                $user->photo = $photo ? base64_decode((string)$photo) : null;
                $this->send($user->update(), 0, 'Mise a jour de l\'utilisateur.');
            }
        });
        $this->match('/api/utilisateurs/moi/motdepasse', function() use ($body) {
            $ancien = $this->data($body, 'ancien');
            $nouveau = $this->data($body, 'nouveau');
            $user = (new DTOUtilisateur(User::get()->_id))->read();
            if ($user->mot_de_passe == hash('sha256', $ancien . $user->sel)) {
                $user->mot_de_passe = hash('sha256', $nouveau . $user->sel);
                $this->send($user->update(), 0, 'Mise a jour du mot de passe.');
            } else {
                $this->send(false, 0, 'Mot de passe incorrect.', 401);
            }
        });
    }

}

?>