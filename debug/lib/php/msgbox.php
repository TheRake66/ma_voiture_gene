<?php
namespace Library;

use Kernel\Html\Attribute;
use Kernel\Html\Output;



/**
 * Librairie Msgbox
 *
 * @author Thibault Bustos (TheRake66)
 * @version 1.0
 * @package Librairy
 * @category Package
 * @license MIT License
 * @copyright © 2022 - Thibault BUSTOS (TheRake66)
 */
class Msgbox {

    /**
     * Les images
     */
    const IMG_OK = 'icons8-ok-96';
    const IMG_WARN = 'icons8-erreur-96';
    const IMG_INFO = 'icons8-information-96';
    const IMG_ERROR = 'icons8-warning-64';


    /**
     * Affiche une messagebox
     *
     * @param string le titre de la msgbox
     * @param string le contenu de la msgbox
     * @param string l'image de la msgbox
     */
    static function show($titre, $content, $level = Msgbox::IMG_OK) {
        Output::add('<msgbox>
                <div>		
                    <h1>' . $titre . '</h1>
                    <article>
                        <img ' . Attribute::src('/assets/img/' . $level . '.PNG', 'Msgbox') . '>
                        <p>' . $content . '</p>
                    </article>
                    <div>
                        <button class="button" script="this.focus();" onclick="this.parentNode.parentNode.parentNode.remove();">Ok</button>
                    </div>
                </div>
            </msgbox>');
    }
    
}

?>