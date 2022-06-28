<?php
namespace Api;

use Kernel\Debug\Error;
use Kernel\Communication\Rest;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
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
            $this->send($user, 0, 'Recupération de l\'utilisateur réussie.');
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
        $this->send(null, 0, 'Fonction non implémentée !', 500);
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
        $this->send(null, 0, 'Fonction non implémentée !', 500);
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
        $this->send(null, 0, 'Fonction non implémentée !', 500);
    }

}

?>