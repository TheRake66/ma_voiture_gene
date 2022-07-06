<?php
namespace Controller\Menu\Conversation;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;



/**
 * Controleur du composant Liste.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller\Menu\Conversation
 * @category Controleur
 */
class Liste extends Render {

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