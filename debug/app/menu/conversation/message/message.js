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
    id = Finder.id('id');
    name = Finder.id('name');
    input = Finder.id('input');
    picture = Finder.id('picture');
    section = Finder.id('section');
    my_id = Cookie.get('ma_voiture_gene_session_id');
    interlocutor_id = null;
    my = null;
    interlocutor = null;


    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        this.loadMy();
        this.loadConversation();
        setTimeout(() => {
            this.loadMessages();
        }, 300);
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
        Rest.get(`/api/utilisateurs/${message.id_Utilisateur}`,
        (utilisateur, json) => { // Success
            interlocutor = utilisateur;
        },
        null, null, null, null, 0, false);

        Dom.insert(/*html*/`
            <div class="left">
                <img src="${this.toImg(interlocutor.photo)}" alt="PP">
                <article>
                    <div></div>
                    <span>${message.contenu}</span>
                    <i>${message.envoye_le}</i>  
                </article>
            </div>
        `, this.section);
        this.scrollToLast();
    }


    /**
     * Charges les infor,mations de la conversation.
     * 
     * @returns {void}
     */
    loadConversation() {
        let receiver = null

        Rest.getFor(`/api/conversations/${this.id.value}/membres`,
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
     * Charge les messages de la conversation.
     * 
     * @returns {void}
     */
    loadMessages() {
        let last_date = null;

        Rest.getFor(`/api/conversations/${this.id.value}/messages`,
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
            true
        );
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
        Rest.post(`/api/conversations/${this.id.value}/messages`,
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
            true
        );
    }
}