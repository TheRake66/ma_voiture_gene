<?php
namespace Api;

use Kernel\Debug\Error;
use Kernel\Communication\Rest;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Session\User;
use Model\Dto\Ma_voiture_gene\Plaque as Ma_voiture_genePlaque;

/**
 * Module d'API Plaque.
 * 
 * @author thiba
 * @version 1.0
 * @package Api
 * @category API
 */
class Plaque extends Rest {

    /**
     * Appel via la méthode GET.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function get($route, $query, $body) {
        $this->match('/api/plaques/moi', function() {
            $id = User::get()->_id;
            $plaque = new Ma_voiture_genePlaque(null, $id);
            $this->send($plaque->many('id'), 0, 'Récupération des plaques de l\'utilisqteur réussie.');
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
        $this->match('/api/plaques', function() use ($body) {
            $numero = $this->data($body, 'numero');
            $id = User::get()->_id;
            $plaque = new Ma_voiture_genePlaque($numero, $id);
            if ($plaque->exists('_numero')) {
                $this->send(false, 0, 'Cette plaque existe déjà.');
            } else {
                $this->send($plaque->create(), 0, 'Enregistrement de la plaque réussie.');
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
        $this->match('/api/plaques/{numero}', function() use ($query) {
            $numero = $this->data($query, 'numero');
            $plaque = new Ma_voiture_genePlaque($numero);
            $this->send($plaque->delete(), 0, 'Suppression de la plaque réussie.');
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
        $this->send(null, 0, 'Fonction non implémentée !', 500);
    }

}

?>