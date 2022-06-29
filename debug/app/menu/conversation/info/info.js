import Attribute from '../../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../../.kernel/js/html/dom.js';
import Finder from '../../../../../.kernel/js/html/finder.js';
import Rest from '../../../../../.kernel/js/communication/rest.js';
import Location from '../../../../../.kernel/js/url/location.js';



/**
 * Script du composant Info.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Info {

    /**
     * Les éléments.
     */
    container = Finder.query('menu-conversation-info');
    retour = Finder.query('menu-conversation-info #retour');
    name = Finder.query('menu-conversation-info #name');
    date = Finder.query('menu-conversation-info #date');
    picture = Finder.query('menu-conversation-info #picture');

    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        
    }
 

    /**
     * Change la conversation.
     * 
     * @param {int} id L'id de la conversation
     * @returns {void}
     */
    changeConv(id) {
        Rest.getFor(`/api/conversations/${id}/membres`,
            (utilisateur, json) => { // Success
                this.picture.src = utilisateur.photo === null ?
                    '/assets/img/default.png' :
                    'data:image/png;base64,' + utilisateur.photo;

                this.name.innerText = utilisateur.prenom + ' ' + utilisateur.nom;
            },
            null, null, null, null, null, null, 0, false);

        Rest.get(`/api/conversations/${id}`,
            (conversation, json) => { // Success
                this.date.innerText = `Depuis le ${conversation.cree_le}`;
            },
            null, null, null, null, 0, false);
    }


    /**
     * Retour en arrière.
     * 
     * @returns {void}
     */
    comeBack() {
        Attribute.hide(this.container);
        menu_conversation_message.container.style.display = 'flex';
    }

}