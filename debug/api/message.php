<?php
namespace Api;

use Kernel\Debug\Error;
use Kernel\Communication\Rest;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Model\Dao\Ma_voiture_gene\Conversation;
use Model\Dao\Ma_voiture_gene\Message as DAOMessage;
use Model\Dto\Ma_voiture_gene\Exemple;
use Model\Dto\Ma_voiture_gene\Message as DTOMessage;
use Model\Dto\Ma_voiture_gene\Vu;

/**
 * Module d'API Message.
 * 
 * @author thiba
 * @version 1.0
 * @package Api
 * @category API
 */
class Message extends Rest {

    /**
     * Appel via la méthode GET.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function get($route, $query, $body) {
        $this->match('/api/messages/{id}/vu/{user}', function() use ($query) {
            $id = $this->data($query, 'id');
            $user = $this->data($query, 'user');
            $vu = (new Vu($id, $user))->read();
            $this->send($vu, 0, 'Recuperation de la date de vu du message');
        });
        $this->match('/api/messages/exemples', function() {
            $this->send(Exemple::all(), 0, 'Recuperation des exemples.');
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