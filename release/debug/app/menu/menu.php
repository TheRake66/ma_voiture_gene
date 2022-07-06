<?php
namespace Controller;

use Controller\Menu\Conversation;
use Controller\Menu\Conversation\Message;
use Controller\Menu\Parametre;
use Controller\Menu\Scanner;
use Controller\Menu\Vehicule;
use Kernel\Html\Builder;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Io\Render;
use Kernel\Url\Router;

/**
 * Controleur du composant Menu.
 * 
 * @author thiba
 * @version 1.0
 * @package Controller
 * @category Controleur
 */
class Menu extends Render {

    /**
     * Point d'entrée du controleur.
     * 
     * @access public
     * @return void
     */
    function __construct() {
        $this->view([
            'get' => function() {
                $composants =  [
                    '/vehicules' => Vehicule::class,
                    '/scanner' => Scanner::class,
                    '/conversations' => Conversation::class,
                    '/parametres' => Parametre::class,
                    '/conversations/{id}' => Conversation\Message::class,
                    '/conversations/{id}/details' => Conversation\Info::class
                ];
                $current = $composants[Router::current()];
                if (!is_null($current)) {
                    return new $current();
                }
            },
            'make' => function($route, $img, $alt, $text) {
                $active = Router::current() === $route;
                $img = Builder::create('img', [
                    'src' => '/assets/img/menu/' . $img . '.png',
                    'alt' => $alt,
                ]);
                $span = Builder::create('span', [], $text);
                $div = $active ? Builder::create('div', null, null, false) : '';
                $a = Builder::create('a', [
                    'href' => $route,
                    'class' => $active ? 'active' : ''
                ], $img . $div . $span);
                return $a;
            }
        ]);
    }

}

?>