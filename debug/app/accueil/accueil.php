<?php
namespace Controller;

use Kernel\Database\Transaction;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;
use Model\Dto\Ma_voiture_gene\Utilisateur;

/**
 * Controleur du composant Accueil.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller
 * @category Controleur
 */
class Accueil extends Render {

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