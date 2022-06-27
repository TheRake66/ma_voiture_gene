<?php
use Kernel\Url\Router as r;
use Controller as c;
use Api as a;
use Kernel\Session\User;



// Route vers les composants.
r::notfound('/inscription');
r::default('/inscription');
r::add([ '/connexion' => c\Connexion::class ]);
r::add([ '/inscription' => c\Inscription::class ]);
r::add([ '/oublie' => c\Oublie::class ]);


if (User::has()) {

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
    ]]
]);



?>