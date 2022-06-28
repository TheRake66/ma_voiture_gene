<?php
namespace Controller;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;
use Kernel\Security\Cookie;
use Kernel\Session\Token;
use Kernel\Session\User;
use Kernel\Url\Location;
use Kernel\Url\Router;
use Library\Msgbox;
use Locale;
use Model\Dto\Ma_voiture_gene\Utilisateur;

/**
 * Controleur du composant Connexion.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller
 * @category Controleur
 */
class Connexion extends Render {

    /**
     * Point d'entrée du controleur.
     * 
     * @access public
     * @return void
     */
    function __construct() {
        if (isset($_GET['deconnexion'])) {
            User::logout();

        } elseif (isset($_GET['creee'])) {
            Msgbox::show('Inscription', 'Votre compte a été créé avec succès.');

        } elseif (isset($_POST['connect'])) {
            if (Csrf::valid()) {
                Csrf::destroy();

                $email = Xss::filter($_POST['email']);
                $password = Xss::filter($_POST['password']);

                $user = new Utilisateur();
                $user->email = $email;
                $user = $user->read('email');

                if ($user) {
                    $hash = hash('sha256', $password . $user->sel);
                    if ($hash === $user->mot_de_passe) {
                        $token = Token::generate();
                        User::login($user, $token);
                        $user->jeton = $token;
                        $user->derniere_connexion = new \DateTime();
                        $user->update();
                        Cookie::set('session_id', $user->_id);
                        Location::go('/conversations');
                    } else {
                        Msgbox::show('Attention', 'L\'adresse e-mail ou le mot de passe sont incorrects.', Msgbox::IMG_WARN);
                    }
                } else {
                    Msgbox::show('Erreur', 'Cette adresse e-mail n\'existe pas.', Msgbox::IMG_ERROR);
                }
            } else {
                Msgbox::show('Erreur', 'Une erreur est survenue lors de la vérification du jeton CSRF.', Msgbox::IMG_ERROR);
            }
        }

        $this->view();
    }



    /**
     * Auto-connexion via les cookies.
     * 
     * @return void
     */
    public static function autoLogin() {
        if (Token::has()) {
            $token = Token::get();
            $user = new Utilisateur();
            $user->jeton = $token;
            $user = $user->read('jeton');
            if ($user && strtotime($user->derniere_connexion) > strtotime('-31 day')) {
                User::login($user, $token);
                $user->derniere_connexion = new \DateTime();
                $user->update();
            } else {
                Token::remove();
                Location::go('/connexion');
            }
        }
    }

}

?>