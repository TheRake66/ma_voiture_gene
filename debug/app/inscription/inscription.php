<?php
namespace Controller;

use Kernel\Io\Convert\Encoded;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;
use Kernel\Url\Location;
use Library\Msgbox;
use Model\Dto\Ma_voiture_gene\Utilisateur;

/**
 * Controleur du composant Inscription.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller
 * @category Controleur
 */
class Inscription extends Render {

    /**
     * Point d'entrée du controleur.
     * 
     * @access public
     * @return void
     */
    function __construct() {

        if (isset($_POST['inscription'])) {
            if (Csrf::check()) {
                Csrf::destroy();

                if ($_POST['password'] === $_POST['confirm']) {
                    $sel = Encoded::random(10);
                    $password = Xss::escape($_POST['password']);
                    $hash = hash('sha256', $password . $sel);
                    
                    $user = new Utilisateur(
                        null,
                        Xss::escape($_POST['nom']),
                        Xss::escape($_POST['prenom']),
                        Xss::escape($_POST['email']),
                        $hash,
                        $sel);

                    if (!$user->exists('email')) {
                        if ($user->create()) {
                            Location::go('/connexion', [ 'creee' => 'true' ]);
                        } else {
                            Msgbox::show('Erreur', 'Une erreur est survenue lors de la création de votre compte.', Msgbox::IMG_ERROR);
                        }
                    } else {
                        Msgbox::show('Attention', 'Cette adresse e-mail est déjà utilisée.', Msgbox::IMG_WARN);
                    }
                } else {
                    Msgbox::show('Les mots de passe ne correspondent pas.', 'error');
                }
            } else {
                Msgbox::show('Erreur', 'Une erreur est survenue lors de la vérification du jeton CSRF.', Msgbox::IMG_ERROR);
            }
        }


        $this->view();
    }

}

?>