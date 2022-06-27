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
    const IMG_OK = 'ok';
    const IMG_WARN = 'warn';
    const IMG_INFO = 'info';
    const IMG_ERROR = 'error';


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
                        <img ' . Attribute::src('assets/img/msgbox/' . $level . '.svg', 'Msgbox') . '>
                        <p>' . $content . '</p>
                    </article>
                    <div>
                        <button script="this.focus();" onclick="this.parentNode.parentNode.parentNode.remove();">Ok</button>
                    </div>
                </div>
            </msgbox>');
    }
    
}

?>