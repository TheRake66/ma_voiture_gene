<?php
use Kernel\Url\Router as r;
use Controller as c;
use Api as a;
use Kernel\Session\User;



// Route vers les composants.
r::notfound('/connexion');
r::default('/connexion');
r::add([ '/connexion' => c\Connexion::class ]);
r::add([ '/inscription' => c\Inscription::class ]);
r::add([ '/oublie' => c\Oublie::class ]);


if (User::has()) {
    r::notfound('/conversations');
    r::default('/conversations');
    r::add([ '/vehicules' => c\Menu::class ]);
    r::add([ '/scanner' => c\Menu::class ]);
    r::add([ '/conversations' => c\Menu::class ]);
    r::add([ '/conversations/{id}' => c\Menu::class ]);
    r::add([ '/parametres' => c\Menu::class ]);
    r::add([ '/deconnexion' => c\Menu::class ]);
}



// Route vers les API.
r::add([
    '/api/utilisateurs' => [ 
        a\Utilisateur::class, [
            r::METHOD_GET,
            r::METHOD_POST
    ]],
    '/api/utilisateurs/{id}' => [ 
        a\Utilisateur::class, [
            r::METHOD_GET,
            r::METHOD_PUT,
            r::METHOD_DELETE,
            r::METHOD_PATCH
    ]],
    '/api/messages/{id}/vu/{user}' => [ 
        a\Message::class, [
            r::METHOD_GET
    ]],
    '/api/conversations/moi' => [ 
        a\Conversation::class, [
            r::METHOD_GET
    ]],
    '/api/conversations/{id}/messages' => [ 
        a\Conversation::class, [
            r::METHOD_GET,
            r::METHOD_POST
    ]],
    '/api/conversations/{id}/membres' => [ 
        a\Conversation::class, [
            r::METHOD_GET
    ]]
]);



?>