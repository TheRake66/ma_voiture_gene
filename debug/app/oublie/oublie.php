<?php
namespace Controller;

use Kernel\Communication\Mail;
use Kernel\Debug\Log;
use Kernel\Io\Convert\Encoded;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;
use Library\Msgbox;
use Model\Dto\Ma_voiture_gene\Utilisateur;

/**
 * Controleur du composant Oublie.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller
 * @category Controleur
 */
class Oublie extends Render {

    /**
     * Point d'entrée du controleur.
     * 
     * @access public
     * @return void
     */
    function __construct() {

        if (isset($_POST['new'])) {
            if (Csrf::valid()) {
                Csrf::destroy();

                $email = Xss::filter($_POST['email']);
                $user = new Utilisateur();
                $user->email = $email;
                $user = $user->read('email');   

                if ($user) {
                    $new = Csrf::generate(10);
                    $send = Mail::send($user->email, 'Réinitialisation de votre mot de passe', 'Votre mot de passe temporaire est : ' . $new, 'ma.voiture.gene@mail.com');
                    if ($send) {
                        
                        $sel = Encoded::random(10);
                        $hash = hash('sha256', $new . $sel);
                        $user->mot_de_passe = $hash;
                        $user->sel = $sel;
                        $user->update();
                        Msgbox::show('Succès', 'Un nouveau mot de passe vous a été envoyé par mail.');
                    } else {
                        Msgbox::show('Erreur', 'Une erreur est survenue lors de l\'envoi du mail.', Msgbox::IMG_ERROR);
                    }
                } else {
                    Msgbox::show('Attention', 'Cette adresse e-mail n\'existe pas.', Msgbox::IMG_WARN);
                }
            } else {
                Msgbox::show('Erreur', 'Une erreur est survenue lors de la vérification du jeton CSRF.', Msgbox::IMG_ERROR);
            }
        }


        $this->view();
    }

}

?>