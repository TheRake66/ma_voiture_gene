import Dom from '../../../../.kernel/js/html/dom.js';
import Finder from '../../../../.kernel/js/html/finder.js';



/**
 * Librairie Confirmbox.
 * 
 * @author thiba
 * @version 1.0
 * @category Librairie
 */
export default class Confirmbox {

    /**
     * Les images
     */
    static IMG_OK = 'icons8-ok-96';
    static IMG_WARN = 'icons8-erreur-96';
    static IMG_INFO = 'icons8-information-96';
    static IMG_ERROR = 'icons8-warning-64';


    /**
     * Affiche une boite de confirmation.
     * 
     * @param {string} titre Le titre de la boite de confirmation.
     * @param {string} content Le contenu de la boite de confirmation.
     * @param {function} yes La fonction à exécuter lorsque l'utilisateur clique sur oui.
     * @param {function} no La fonction à exécuter lorsque l'utilisateur clique sur non.
     * @param {string} level Le niveau de la boite de confirmation.
     */
    static show(titre, content, yes = null, no = null, level = Confirmbox.IMG_OK) {
        level = '/assets/img/confirmbox/' + level + '.png';
        Dom.insert(/*html*/`
            <confirmbox>
                <div>
                    <h1>${titre}</h1>
                    <article>
                        <img src="${level}" alt="Msgbox">
                        <p>${content}</p>
                    </article>
                    <div>
                        <button class="button confirm-no" script="this.focus();">Non</button>
                        <button class="button confirm-yes">Oui</button>
                    </div>
                </div>
            </confirmbox>`);
        let confirmbox = Finder.queryLast('confirmbox');
        let buttons = Finder.queryAll('button', confirmbox);
        buttons[0].onclick = () => {
            if (no !== null) {
                no();
            }
            confirmbox.remove();
        };
        buttons[1].onclick = () => {
            if (yes !== null) {
                yes();
            }
            confirmbox.remove();
        }
    }

}