import Attribute from '../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../.kernel/js/html/dom.js';
import Finder from '../../../../.kernel/js/html/finder.js';
import Rest from '../../../../.kernel/js/communication/rest.js';
import Location from '../../../../.kernel/js/url/location.js';
import Cookie from '../../../../.kernel/js/io/cookie.js';


/**
 * Script du composant Conversation.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Conversation {

    /**
     * Les éléments.
     */
    container = Finder.query('menu-conversation');


    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        this.loadConversation();   
    }


    /**
     * Charge la liste des conversations.
     * 
     * @return {void}
     */
    loadConversation() {
        let my_id = Cookie.get('ma_voiture_gene_session_id');
        Rest.getFor('/api/conversations/moi',
            (message, json) => { // Success

                // Conversation ===========================
                let receiver = null
                Rest.getFor(`/api/conversations/${message.id_Conversation}/membres`,
                    (utilisateur, json) => { // Success
                        receiver = utilisateur;
                    },
                    null, null, null, null, null, null, 0, false);
                    
                let photo = receiver.photo === null ?
                    '/assets/img/default.png' :
                    'data:image/png;base64,' + receiver.photo;

                let titre = receiver.prenom + ' ' + receiver.nom;

                let vu = '';
                Rest.get(`/api/messages/${message._id}/vu/${receiver._id}`,
                    (vu, json) => { // Success
                        vu = /*html*/`<img src="/assets/img/icons8-double-coche-30.png" alt="Vu"/>`;
                    },
                    null, null, null, null, 0, false);



                // Date d'envoi =============================
                let envoye_le = new Date(message.envoye_le);
                let today = new Date();
                let date_str = '';
                if (today.getFullYear() === envoye_le.getFullYear() &&
                    today.getMonth() === envoye_le.getMonth() &&
                    today.getDate() === envoye_le.getDate()) {
                    date_str += envoye_le.getHours() + ':' + envoye_le.getMinutes();
                } else {
                    date_str += envoye_le.getDate() + ' ' + envoye_le.toLocaleString('default', { month: 'long' });
                }



                // Le message ==============================
                let texte = '';
                if (message.id_Utilisateur == my_id) {
                    texte = 'Vous : ' + message.contenu;
                } else {
                    Rest.get(`/api/messages/${message._id}/vu/${my_id}`,
                        (vu, json) => { // Success
                            texte = message.contenu;
                        },
                        () => {
                            texte = /*html*/`<b>${message.contenu} </b>`;
                            date_str = /*html*/`<b>• ${date_str}</b>`;
                        }, null, null, null, 0, false);
                }
                

                // On crée l'élément ======================
                Dom.insert(/*html*/`
                    <a href="/conversations/${message.id_Conversation}">
                        <img src="${photo}" alt="PP" />
                        <article>
                            <b>${titre}</b>
                            <p>${texte}</p>
                        </article>
                        <div>
                            <i>${date_str}</i>
                            ${vu}
                        </div>
                    </a>
                `, this.container);

            },
            () => { // Pre
                Dom.clear(this.container);
            },
            () => { // Post
                
            },
            () => { // Empty
                Dom.insert(/*html*/`<span>Aucune conversation</span>`, this.container);
            },
            () => { // Failed
                Dom.insert(/*html*/`<span>Impossible de charger la liste des conversations</span>`, this.container);
            },
            () => { // Expired,
                Dom.insert(/*html*/`<span>La liste des conversations a expiré</span>`, this.container);
            },
            {
                
            },
            0,
            true
        );
    }

}