<?php
namespace Controller\Accueil;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;



/**
 * Controleur du composant Footer.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller\Accueil
 * @category Controleur
 */
class Footer extends Render {

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