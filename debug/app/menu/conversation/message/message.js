import Attribute from '../../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../../.kernel/js/html/dom.js';
import Finder from '../../../../../.kernel/js/html/finder.js';
import Rest from '../../../../../.kernel/js/communication/rest.js';
import Location from '../../../../../.kernel/js/url/location.js';
import Cookie from '../../../../../.kernel/js/io/cookie.js';
import Msgbox from '../../../../lib/js/msgbox.js';
import Builder from '../../../../../.kernel/js/html/builder.js';



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
    predefini = Finder.query('menu-conversation-message #predefini');

    conversation_id = null;
    my_id = Cookie.get('ma_voiture_gene_session_id');
    my = null;
    interlocutor_id = null;
    interlocutor_id = null;
    last_message_offset = 0;
    bloquer = false;
    last_date = new Date();


    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        
    }


    /**
     * Charge les messages prédéfinis.
     * 
     * @returns {void}
     */
    loadPredefini() {
        Rest.getFor('/api/messages/exemples',
            (exemple, json) => { // Success
                Dom.append(
                    Builder.create('button', {
                        innerText: exemple.contenu,
                        className: 'button-circle',
                        onclick: () => {
                            this.input.value = exemple.contenu;
                        }
                    }), this.predefini);
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
            true
        );
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
        if (div) {
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
     * Charge les informations de l'interlocuteur.
     * 
     * @returns {void}
     */
    loadInterlocutor() {
        Rest.get(`/api/utilisateurs/${this.interlocutor_id}`,
            (utilisateur, json) => { // Success
                this.interlocutor = utilisateur;
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
     * @returns {void}
     */
    addMessageInterlocutor(message) {
        this.last_message_offset++;

        Dom.insert(/*html*/`
            <div class="left">
                <img src="${this.toImg(this.interlocutor.photo)}" alt="PP">
                <article>
                    <div></div>
                    <span>${message.contenu}</span>
                    <i>${message.envoye_le}</i>  
                </article>
            </div>
        `, this.section);

        this.scrollToLast();
        menu_conversation_liste.refreshMessage();
    }


    /**
     * Vérifie si un message peut être ajouté.
     * 
     * @returns {void} 
     */
    checkBloque() {
        let bloquer = false;
        let message = '';

        Rest.get(`/api/utilisateurs/${this.interlocutor_id}/bloque`,
            (content, json) => { // Success
                if (content) {
                    bloquer = true;
                    message = 'Vous avez bloqué cet utilisateur.';
                }
            },

        null, null, null, null, 0, false);

        if (!bloquer) {
            Rest.get(`/api/utilisateurs/${this.interlocutor_id}/bloque/moi`,
                (content, json) => { // Success
                    if (content) {
                        bloquer = true;
                        message = 'Cet utilisateur vous a bloqué.';
                    }
                },
            null, null, null, null, 0, false);
        }

        if (bloquer !== this.bloquer) {
            if (bloquer) {
                Attribute.disable(this.input);
                Attribute.disable(this.send);
                this.predefini.style.display = 'none';
                this.send.style.display = 'none';
                this.input.value = message;
            } else {
                Attribute.enable(this.input);
                Attribute.enable(this.send);
                this.predefini.style.display = 'flex';
                this.send.style.display = 'block';
                this.input.value = '';
            }
            this.bloquer = bloquer;
        }
    }


    /**
     * Charges les informations de la conversation.
     * 
     * @returns {void}
     */
    loadConversation() {
        Rest.getFor(`/api/conversations/${this.conversation_id}/membres`,
            (utilisateur, json) => { // Success
                this.interlocutor = utilisateur;
                this.interlocutor_id = utilisateur._id;
                this.picture.src = this.interlocutor.photo === null ?
                    '/assets/img/default.png' :
                    'data:image/png;base64,' + this.interlocutor.photo;
                this.name.innerText = this.interlocutor.prenom + ' ' + this.interlocutor.nom;
            },
            null, null, null, null, null, null, 0, false);
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
                    menu_conversation_liste.refreshMessage();
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
     * Actualise les messages.
     * 
     * @returns {void}
     */
    async mainLoop() {
        while (true) {
            if (this.conversation_id !== null) {
                this.refreshMessage();
            }
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }


    /**
     * Rafraichit les messages.
     * 
     * @returns {void}
     */
    refreshMessage() {
        Rest.getFor(`/api/conversations/${this.conversation_id}/messages/${this.last_message_offset}`,
            (message, json) => { // Success
                // Date
                let date = new Date(message.envoye_le);
                if (this.last_date === null || 
                    (this.last_date.getDay() !== date.getDay() &&
                    this.last_date.getMonth() !== date.getMonth() &&
                    this.last_date.getFullYear() !== date.getFullYear())) {
                    Dom.insert(/*html*/`
                        <span>${message.envoye_le}</span>
                    `, this.section);
                    this.last_date = date;
                }

                // Ajout du message
                let i_am_sender = message.id_Utilisateur == this.my_id;
                if (i_am_sender) {
                    this.addMessageMy(message);
                } else {                    
                    this.addMessageInterlocutor(message);
                }
            },
            () => { // Pre
                
            },
            () => { // Post
                this.setAllSeen();
                this.checkBloque();
            },
            () => { // Empty
                this.setAllSeen();
                this.checkBloque();
            },
            () => { // Failed
                this.setAllSeen();
                this.checkBloque();
            },
            () => { // Expired,
                
            },
            {
                
            },
            0,
            true
        );
    }


    /**
     * Met tous les messages en vu.
     * 
     * @returns {void}
     */
    setAllSeen() {
        // Change au moment de la reception des messages en pc
        if (!window.onMobile || menu_conversation_liste.open) {
            Rest.post(`/api/conversations/${this.conversation_id}/vu`);
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
        this.interlocutor_id = null;
        this.interlocutor = null;
        this.last_message_offset = 0;
        Dom.clear(this.section);
        Attribute.enable(this.input);
        Attribute.enable(this.send);
        this.predefini.style.display = 'flex';
        this.loadConversation();
        this.checkBloque();
        this.refreshMessage();
    }


    /**
     * Supprimer la conversation.
     * 
     * @returns {void}
     */
    deleteConv() {
        this.conversation_id = null;
        this.interlocutor_id = null;
        this.interlocutor = null;
        this.last_message_offset = 0;
        Dom.clear(this.section);
        Attribute.disable(this.input);
        Attribute.disable(this.send);
        this.predefini.style.display = 'none';
        this.picture.src = '/assets/img/default.png';
        this.name.innerText = '';
        this.refreshMessage();
        if (window.onMobile) {
            this.comeBack();
        }
    }


    /**
     * Retour en arrière.
     * 
     * @returns {void}
     */
    comeBack() {
        menu_conversation_liste.container.style.transform = 'translateX(0%)';
        menu_conversation_liste.open = false;
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