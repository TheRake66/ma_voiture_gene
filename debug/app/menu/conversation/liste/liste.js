import Attribute from '../../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../../.kernel/js/html/dom.js';
import Finder from '../../../../../.kernel/js/html/finder.js';
import Rest from '../../../../../.kernel/js/communication/rest.js';
import Location from '../../../../../.kernel/js/url/location.js';
import Cookie from '../../../../../.kernel/js/io/cookie.js';



/**
 * Script du composant Liste.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Liste {

    /**
     * Les éléments.
     */
    container = Finder.query('menu-conversation-liste');
    conversations = [];
    last_clicked_id = null;
    cleared = false;
    open = false;


    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        this.refreshMessage();   
    }
    

    /**
     * Rafraichit les messages.
     * 
     * @returns {void}
     */
    async refreshMessage() {
        let my_id = Cookie.get('ma_voiture_gene_session_id');
        while (true) {
            Rest.getFor('/api/conversations/moi',
                (conversation, json) => { // Success
                    let receiver = null
                    let message = null;
                    let vu = '';
                    let date_str = '';
                    let texte = '';
                    let photo = '';
                    let titre = '';


                    
                    // L'interlocuteur ===========================
                    Rest.getFor(`/api/conversations/${conversation._id}/membres`,
                        (utilisateur, json) => { // Success
                            receiver = utilisateur;
                        },
                        null, null, null, null, null, null, 0, false);
                        
                    photo = receiver.photo === null ?
                        '/assets/img/default.png' :
                        'data:image/png;base64,' + receiver.photo;
    
                    titre = receiver.prenom + ' ' + receiver.nom;



                    // Le message ===========================
                    Rest.get(`/api/conversations/${conversation._id}/messages/last`,
                        (content, json) => { // Success
                            message = content;
                        },
                        () => { // Empty
                            
                        },
                        () => { // Failed
                            
                        },
                        () => { // Expired
                            
                        },
                        {
                            
                        },
                        0,
                        false
                    );
                    if (message !== null) {



                        // Date d'envoi =============================
                        let envoye_le = new Date(message.envoye_le);
                        let today = new Date();
                        if (today.getFullYear() === envoye_le.getFullYear() &&
                            today.getMonth() === envoye_le.getMonth() &&
                            today.getDate() === envoye_le.getDate()) {
                            let hours = envoye_le.getHours() < 10 ? 
                                '0' + envoye_le.getHours() : 
                                envoye_le.getHours();
                            let minutes = envoye_le.getMinutes() < 10 ? 
                                '0' + envoye_le.getMinutes() : 
                                envoye_le.getMinutes();
                            date_str += hours + ':' + minutes;
                        } else {
                            date_str += envoye_le.getDate() + ' ' + envoye_le.toLocaleString('default', { month: 'long' });
                        }



                        // Vu ou pas ==============================
                        if (message.id_Utilisateur == my_id) {                
                            Rest.get(`/api/messages/${message._id}/vu/${receiver._id}`,
                            (content, json) => { // Success
                                vu = /*html*/`<img src="/assets/img/icons8-double-coche-30.png" alt="Vu"/>`;
                            }, null, null, null, null, 0, false);
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
                    } else {
                        texte = /*html*/`<i>Dites bonjour à ${receiver.prenom} !</i>`;
                    }
    


                    // On crée l'élément ou on le modifie ===============
                    let div = this.conversations[conversation._id];
                    if (div) {
                        Dom.replace(/*html*/`
                            <img src="${photo}" alt="PP" />
                            <article>
                                <b>${titre}</b>
                                <p>${texte}</p>
                            </article>
                            <div>
                                <i>${date_str}</i>
                                ${vu}
                            </div>
                        `, div);
                    } else {
                        Dom.insert(/*html*/`
                            <div class="conv_div" onclick="menu_conversation_liste.changeConv(${message.id_Conversation})">
                                <img src="${photo}" alt="PP" />
                                <article>
                                    <b>${titre}</b>
                                    <p>${texte}</p>
                                </article>
                                <div>
                                    <i>${date_str}</i>
                                    ${vu}
                                </div>
                            </div>
                        `, this.container);
                        
                        let div = Finder.queryLast('.conv_div', this.container);
                        this.conversations[conversation._id] = div;
                        
                        if (Object.keys(this.conversations).length === 1 && !window.onMobile) {
                            this.changeConv(conversation._id);
                        }
                    }
                    
                },
                () => { // Pre
                    if (!this.cleared) {
                        Dom.clear(this.container);
                        this.cleared = true;
                    }
                },
                () => { // Post
                    
                },
                () => { // Empty
                    Dom.clear(this.container);
                    Dom.insert(/*html*/`<span>Aucune conversation</span>`, this.container);
                },
                () => { // Failed
                    Dom.clear(this.container);
                    Dom.insert(/*html*/`<span>Impossible de charger la liste des conversations</span>`, this.container);
                },
                () => { // Expired,
                    Dom.clear(this.container);
                    Dom.insert(/*html*/`<span>La liste des conversations a expiré</span>`, this.container);
                },
                {
                    
                },
                0,
                true
            );
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
 

    /**
     * Change la conversation.
     * 
     * @param {int} id L'id de la conversation
     * @returns {void}
     */
    changeConv(id) {
        if (window.onMobile) {
            this.container.style.transform = 'translateX(-100%)';
            this.open = true;
        }
        if (this.last_clicked_id !== id) {
            menu_conversation_message.changeConv(id);
            menu_conversation_info.changeConv(id);
        }
        this.last_clicked_id = id;
    }


    /**
     * Supprime la conversation.
     * 
     * @returns {void}
     */
    deleteConv() {
        this.conversations[this.last_clicked_id].remove();
        delete this.conversations[this.last_clicked_id];
        this.last_clicked_id = null;
    }

}