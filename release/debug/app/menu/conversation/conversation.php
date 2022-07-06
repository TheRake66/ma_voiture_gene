<?php
namespace Controller\Menu;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;



/**
 * Controleur du composant Conversation.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller\Menu
 * @category Controleur
 */
class Conversation extends Render {

    /**
     * Point d'entrée du controleur.
     * 
     * @access public
     * @return void
     */
    function __construct() {
        $this->view();
    }

}

?>