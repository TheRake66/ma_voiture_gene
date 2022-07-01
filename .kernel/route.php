<?php
use Kernel\Url\Router as r;
use Controller as c;
use Api as a;
use Kernel\Session\User;



// Route vers les composants.
r::notfound('/connexion');
r::default('/connexion');
r::add([ 
    '/connexion' => c\Connexion::class,
    '/inscription' => c\Inscription::class,
    '/oublie' => c\Oublie::class 
]);


if (User::has()) {
    r::notfound('/conversations');
    r::default('/conversations');
    r::add([ 
        '/vehicules' => c\Menu::class,
        '/scanner' => c\Menu::class,
        '/conversations' => c\Menu::class,
        '/conversations/{id}' => c\Menu::class,
        '/conversations/{id}/details' => c\Menu::class,
        '/parametres' => c\Menu::class,
        '/deconnexion' => c\Menu::class 
    ]);
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
    '/api/utilisateurs/{id}/bloque' => [ 
        a\Utilisateur::class, [
            r::METHOD_GET,
            r::METHOD_POST,
            r::METHOD_DELETE
    ]],
    '/api/utilisateurs/{id}/bloque/moi' => [ 
        a\Utilisateur::class, [
            r::METHOD_GET
    ]],
    '/api/messages/{id}/vu/{user}' => [ 
        a\Message::class, [
            r::METHOD_GET
    ]],
    '/api/messages/exemples' => [ 
        a\Message::class, [
            r::METHOD_GET
    ]],
    '/api/conversations/moi' => [ 
        a\Conversation::class, [
            r::METHOD_GET
    ]],
    '/api/conversations/{id}/vu' => [ 
        a\Conversation::class, [
            r::METHOD_POST
    ]],
    '/api/conversations/{id}' => [ 
        a\Conversation::class, [
            r::METHOD_GET,
            r::METHOD_DELETE
    ]],
    '/api/conversations/{id}/messages' => [ 
        a\Conversation::class, [
            r::METHOD_GET,
            r::METHOD_POST
    ]],
    '/api/conversations/{id}/messages/{offset}' => [ 
        a\Conversation::class, [
            r::METHOD_GET
    ]],
    '/api/conversations/{id}/membres' => [ 
        a\Conversation::class, [
            r::METHOD_GET
    ]]
]);



?>