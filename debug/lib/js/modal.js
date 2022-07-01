import Finder from '../../../../.kernel/js/html/finder.js';
import Dom from '../../../../.kernel/js/html/dom.js';



/**
 * Librairie Modal
 * 
 * @author Thibault Bustos (TheRake66)
 * @version 1.0
 * @category Package
 * @license MIT License
 * @copyright © 2022 - Thibault BUSTOS (TheRake66)
 */
export default class Modal {

    /**
     * Creer un modal
     * 
     * @param {string} titre le titre du modal
     * @param {string} content le contenu du modal en HTML
     * @param {function} onsubmit la fonction si on appui sur valider
     * @param {function} oncancel la fonction si on appui sur annuler
     * @param {string} content l'id du container du contenu du modal
     */
    static create(titre, content, onsubmit = null, oncancel = null, id = null) {
        Dom.insert(/*html*/`
            <modal>
                <div>
                    <h1>${titre}</h1>
                    <article ${id !== null ? `id="${id}"` : ''}>${content}</article>
                    <div>
                        <button class="warn" id="cancel">Annuler</button>
                        <button class="good" id="submit">Valider</button>
                    </div>
                </div>
            </modal>`);
        Finder.query('modal #cancel').onclick = oncancel ?? (() => { Finder.query('modal').remove() });
        Finder.query('modal #submit').onclick = onsubmit ?? {};
    }

}