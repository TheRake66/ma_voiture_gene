<?php
namespace Controller\Menu\Conversation;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;
use Kernel\Url\Location;

/**
 * Controleur du composant Message.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller\Menu\Conversation
 * @category Controleur
 */
class Message extends Render {

    /**
     * Point d'entrée du controleur.
     * 
     * @access public
     * @return void
     */
    function __construct() {

        if (!isset($GLOBALS['_ROUTE']['id'])) {
            Location::go('/conversations');
        }

        $this->view([
            'id' => $GLOBALS['_ROUTE']['id']
        ]);
    }

}

?>