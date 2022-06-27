import Dom from '../../../../.kernel/js/html/dom.js';



/**
 * Librairie Msgbox
 */
export default class Msgbox {

    /**
     * Les images
     */
    static IMG_OK = 'icons8-ok-96';
    static IMG_WARN = 'icons8-erreur-96';
    static IMG_INFO = 'icons8-information-96';
    static IMG_ERROR = 'icons8-warning-64';


    /**
     * Affiche une messagebox
     * 
     * @param {string} titre le titre de la msgbox
     * @param {string} content le contenu de la msgbox
     * @param {string} level l'image de la msgbox
     */
    static show(titre, content, level = Msgbox.IMG_OK) {
        level = '/assets/img/' + level + '.png';
        Dom.insert(/*html*/`
            <msgbox>
                <div>
                    <h1>${titre}</h1>
                    <article>
                        <img src="${level}" alt="Msgbox">
                        <p>${content}</p>
                    </article>
                    <div>
                        <button class="button" script="this.focus();" onclick="this.parentNode.parentNode.parentNode.remove();">Ok</button>
                    </div>
                </div>
            </msgbox>`);

    }

}