import Dom from '../../../../.kernel/js/html/dom.js';



/**
 * Librairie Msgbox
 */
export default class Msgbox {

    /**
     * Les images
     */
    static IMG_OK = 'ok';
    static IMG_WARN = 'warn';
    static IMG_INFO = 'info';
    static IMG_ERROR = 'error';


    /**
     * Affiche une messagebox
     * 
     * @param {string} titre le titre de la msgbox
     * @param {string} content le contenu de la msgbox
     * @param {string} level l'image de la msgbox
     */
    static show(titre, content, level = Msgbox.IMG_OK) {
        level = 'assets/img/msgbox/' + level + '.svg';
        Dom.insert(/*html*/`
            <msgbox>
                <div>
                    <h1>${titre}</h1>
                    <article>
                        <img src="${level}" alt="Msgbox">
                        <p>${content}</p>
                    </article>
                    <div>
                        <button script="this.focus();" onclick="this.parentNode.parentNode.parentNode.remove();">Ok</button>
                    </div>
                </div>
            </msgbox>`);

    }

}