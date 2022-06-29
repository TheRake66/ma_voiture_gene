import Attribute from '../../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../../.kernel/js/html/dom.js';
import Finder from '../../../../../.kernel/js/html/finder.js';
import Rest from '../../../../../.kernel/js/communication/rest.js';
import Location from '../../../../../.kernel/js/url/location.js';
import Cookie from '../../../../../.kernel/js/io/cookie.js';
import Msgbox from '../../../../lib/js/msgbox.js';



/**
 * Script du composant Message.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Message {

    /**
     * Les éléments.
     */
    container = Finder.query('menu-conversation-message');
    name = Finder.query('menu-conversation-message #name');
    input = Finder.query('menu-conversation-message #input');
    send = Finder.query('menu-conversation-message #send');
    picture = Finder.query('menu-conversation-message #picture');
    section = Finder.query('menu-conversation-message #section');

    conversation_id = null;
    my_id = Cookie.get('ma_voiture_gene_session_id');
    my = null;
    interlocutors = [];
    last_message_offset = 0;


    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        this.loadMy();
        this.refreshMessage();
    }


    /**
     * Convertit une image base64 en image HTML.
     * 
     * @param {Any} data Transforme une image base64 en image HTML.
     * @returns {String} L'image HTML.
     */
    toImg(data) {
        return data === null ? 
            '/assets/img/default.png' :
            'data:image/png;base64,' + data;
    }


    /**
     * Scroll vers le dernier message.
     * 
     * @returns {void}
     */
    scrollToLast() {
        let div = Finder.queryLast('div', this.section);
        if (div !== null) {
            div.scrollIntoView();
        }
    }
    

    /**
     * Charge les informations de l'utilisateur.
     * 
     * @returns {void}
     */
    loadMy() {
        Rest.get(`/api/utilisateurs/${this.my_id}`,
            (utilisateur, json) => { // Success
                this.my = utilisateur;
            },
            null, null, null, null, 0, false);
    } 


    /**
     * Ajoute un message à l'utilisateur.
     * 
     * @param {Object} message Le message.
     * @returns {void}
     */
    addMessageMy(message) {
        this.last_message_offset++;

        Dom.insert(/*html*/`
            <div class="right">
                <article>
                    <span>${message.contenu}</span>
                    <i>${message.envoye_le}</i>  
                    <div></div>
                </article>
                <img src="${this.toImg(this.my.photo)}" alt="PP">
            </div>
        `, this.section);
        this.scrollToLast();
    }


    /**
     * Ajoute un message à l'interlocuteur.
     * 
     * @param {Object} message Le message.
     * @param {int} interlocutor L'id de l'interlocuteur.
     * @returns {void}
     */
    addMessageInterlocutor(message, interlocutor) {     
        if (this.interlocutors[interlocutor] === undefined) {
            Rest.get(`/api/utilisateurs/${message.id_Utilisateur}`,
            (utilisateur, json) => { // Success
                this.interlocutors[interlocutor] = utilisateur;
            },
            null, null, null, null, 0, false);

            Rest.get(`/api/utilisateurs/${message.id_Utilisateur}/bloque`,
                (content, json) => { // Success
                    if (content) {
                        Attribute.disable(this.input);
                        Attribute.disable(this.send);
                        this.send.style.display = 'none';
                        this.input.value = 'Vous ne pouvez pas discuter avec cet utilisateur.';
                    } else {
                        Attribute.enable(this.input);
                        Attribute.enable(this.send);
                        this.send.style.display = 'block';
                        this.input.value = '';
                    }
                },
            null, null, null, null, 0, false);
        }   
        
        this.last_message_offset++;

        Dom.insert(/*html*/`
            <div class="left">
                <img src="${this.toImg(this.interlocutors[interlocutor].photo)}" alt="PP">
                <article>
                    <div></div>
                    <span>${message.contenu}</span>
                    <i>${message.envoye_le}</i>  
                </article>
            </div>
        `, this.section);

        Rest.post(`/api/messages/${message._id}/vu/${this.my_id}`);

        this.scrollToLast();
    }


    /**
     * Charges les informations de la conversation.
     * 
     * @returns {void}
     */
    loadConversation() {
        let receiver = null

        Rest.getFor(`/api/conversations/${this.conversation_id}/membres`,
            (utilisateur, json) => { // Success
                receiver = utilisateur;
            },
            null, null, null, null, null, null, 0, false);
        this.picture.src = receiver.photo === null ?
            '/assets/img/default.png' :
            'data:image/png;base64,' + receiver.photo;

        this.name.innerText = receiver.prenom + ' ' + receiver.nom;
    }


    /**
     * Envoie un message.
     * 
     * @returns {void}
     */
    sendInput() {
        let contenu = this.input.value;
        if (contenu.trim() === '') return;
        let error = () => Msgbox.show('Erreur', 'Le message n\'a pas pu être envoyé.', Msgbox.IMG_ERROR);
        Rest.post(`/api/conversations/${this.conversation_id}/messages`,
            (content, json) => { // Success
                if (content) {
                    let message = {
                        contenu: contenu,
                        envoye_le: new Date().toLocaleString(),
                    }
                    this.addMessageMy(message);
                    this.input.value = '';
                } else {
                    error();
                }
            },
            () => { // Empty
                error();
            },
            () => { // Failed
                error();
            },
            () => { // Expired
                error();
            },
            {
                contenu: contenu
            },
            0,
            false
        );
    }


    /**
     * Rafraichit les messages.
     * 
     * @returns {void}
     */
    async refreshMessage() {
        let last_date = null;
        while (true) {
            Rest.getFor(`/api/conversations/${this.conversation_id}/messages/${this.last_message_offset}`,
                (message, json) => { // Success
                    // Date
                    let date = new Date(message.envoye_le);
                    if (last_date === null || 
                        (last_date.getDay() !== date.getDay() &&
                        last_date.getMonth() !== date.getMonth() &&
                        last_date.getFullYear() !== date.getFullYear())) {
                        Dom.insert(/*html*/`
                            <span>${message.envoye_le}</span>
                        `, this.section);
                        last_date = date;
                    }

                    // Ajout du message
                    let i_am_sender = message.id_Utilisateur == this.my_id;
                    if (i_am_sender) {
                        this.addMessageMy(message);
                    } else {                    
                        this.addMessageInterlocutor(message, message.id_Utilisateur);
                    }
                },
                () => { // Pre
                    
                },
                () => { // Post

                },
                () => { // Empty
                    
                },
                () => { // Failed
                    
                },
                () => { // Expired,
                    
                },
                {
                    
                },
                0,
                false
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
        this.conversation_id = id;
        this.interlocutors = [];
        this.last_message_offset = 0;
        Dom.clear(this.section);
        this.loadConversation();
    }


    /**
     * Retour en arrière.
     * 
     * @returns {void}
     */
    comeBack() {
        menu_conversation_liste.container.style.transform = 'translateX(0%)';
    }


    /**
     * Affiche les informations de la conversation.
     * 
     * @returns {void}
     */
    showInfo() {
        this.container.style.transform = 'translateX(-100%)';
    }

}