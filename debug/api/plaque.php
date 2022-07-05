<?php
namespace Api;

use Kernel\Debug\Error;
use Kernel\Communication\Rest;
use Kernel\IO\Path;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Session\User;
use Library\thiagoalessio\TesseractOCR\TesseractOCR;
use Model\Dto\Ma_voiture_gene\Plaque as Ma_voiture_genePlaque;

/**
 * Module d'API Plaque.
 * 
 * @author thiba
 * @version 1.0
 * @package Api
 * @category API
 */
class Plaque extends Rest {

    /**
     * Appel via la méthode GET.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function get($route, $query, $body) {
        $this->match('/api/plaques/moi', function() {
            $id = User::get()->_id;
            $plaque = new Ma_voiture_genePlaque(null, $id);
            $this->send($plaque->many('id'), 0, 'Récupération des plaques de l\'utilisqteur réussie.');
        });
    }


    /**
     * Appel via la méthode POST.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function post($route, $query, $body) {
        $this->match('/api/plaques/ocr', function() use ($body) {
            $image = $this->data($body, 'image');
            $base64 = str_replace('data:image/png;base64,', '', (string)$image);
            $string = base64_decode($base64);
            $resource = imagecreatefromstring($string);
    
            // $width = imagesx($resource);
            // $height = imagesy($resource);
    
            // for($x = 0; $x < $width; $x++) {
            //     for($y = 0; $y < $height; $y++) {
            //         $color = imagecolorat($resource, $x, $y);
            //         $r = ($color >> 16) & 0xFF;
            //         $g = ($color >> 8) & 0xFF;
            //         $b = $color & 0xFF;
            //         $gray = ($r + $g + $b) / 3;
            //         if($gray > 100) {
            //            $color = imagecolorallocate($resource, 255, 255, 255);
            //         } else {
            //            $color = imagecolorallocate($resource, 0, 0, 0);
            //         }
            //         imagesetpixel($resource, $x, $y, $color);
            //     }
            // }
            
            try {
                $uuid = uniqid();
                $folder = Path::absolute('tmp');
                if (!file_exists($folder)) {
                    mkdir($folder, 0777, true);
                }
                $file = $folder . '/' . $uuid . '.png';
                imagepng($resource, $file);
        
                $string = (new TesseractOCR($file))
                    ->lang('eng')
                    ->psm(11)
                    ->run();
        
                unlink($file);

                $m = [];
                $result = strtoupper($string);
                preg_match('/[A-Z]{2}-[0-9]{3}-[A-Z]{2}/', $result, $m);
                if (count($m) > 0) {
                    $this->send($m[0], 0, 'Analyse de la plaque réussie.');
                } else {
                    throw new \Exception('Analyse de la plaque échouée.');
                }
    
            } catch (\Exception $e) {
                $this->send(false, 0, 'Analyse de la plaque échouée.');
            }
        });
        $this->match('/api/plaques', function() use ($body) {
            $numero = $this->data($body, 'numero');
            $id = User::get()->_id;
            $plaque = new Ma_voiture_genePlaque($numero, $id);
            if ($plaque->exists('_numero')) {
                $this->send(false, 0, 'Cette plaque existe déjà.');
            } else {
                $this->send($plaque->create(), 0, 'Enregistrement de la plaque réussie.');
            }
        });
    }


    /**
     * Appel via la méthode PUT.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function put($route, $query, $body) {
        $this->send(null, 0, 'Fonction non implémentée !', 500);
    }


    /**
     * Appel via la méthode DELETE.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function delete($route, $query, $body) {
        $this->match('/api/plaques/{numero}', function() use ($query) {
            $numero = $this->data($query, 'numero');
            $plaque = new Ma_voiture_genePlaque($numero);
            $this->send($plaque->delete(), 0, 'Suppression de la plaque réussie.');
        });
    }


    /**
     * Appel via la méthode PATCH.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function patch($route, $query, $body) {
        $this->send(null, 0, 'Fonction non implémentée !', 500);
    }

}

?>