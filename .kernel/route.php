<?php
use Kernel\Url\Router as r;
use Controller as c;
use Api as a;




// Route vers les composants.
r::notfound('/accueil');
r::default('/accueil');
r::add([ '/accueil' => c\Accueil::class ]);




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