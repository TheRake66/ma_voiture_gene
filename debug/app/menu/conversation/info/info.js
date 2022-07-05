import Attribute from '../../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../../.kernel/js/html/dom.js';
import Finder from '../../../../../.kernel/js/html/finder.js';
import Rest from '../../../../../.kernel/js/communication/rest.js';
import Location from '../../../../../.kernel/js/url/location.js';
import Confirmbox from '../../../../lib/js/confirmbox.js';
import Msgbox from '../../../../lib/js/msgbox.js';
import Modal from '../../../../lib/js/modal.js';




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
    bloque = Finder.query('menu-conversation-info #bloque');
    delete = Finder.query('menu-conversation-info #delete');
    report = Finder.query('menu-conversation-info #report');
    conversation_id = null;
    interlocutor_id = null;
    bloquer = false;


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
        this.conversation_id = id;
        
        Attribute.enable(this.delete);
        Attribute.enable(this.report);
        Attribute.enable(this.bloque);

        Rest.getFor(`/api/conversations/${id}/membres`,
            (utilisateur, json) => { // Success
                this.interlocutor_id = utilisateur._id;

                this.picture.src = utilisateur.photo === null ?
                    '/assets/img/default.png' :
                    'data:image/png;base64,' + utilisateur.photo;

                this.name.innerText = utilisateur.prenom + ' ' + utilisateur.nom;
            },
            null, null, null, null, null, null, 0, false);
        

        Rest.get(`/api/utilisateurs/${this.interlocutor_id}/bloque`,
            (content, json) => { // Success
                this.bloquer = content;
                this.bloque.innerText = content ? 
                    'Débloquer cet utilisateur' : 
                    'Bloquer cet utilisateur';
            },
            null, null, null, null, 0, false);


        Rest.get(`/api/conversations/${id}`,
            (conversation, json) => { // Success
                this.date.innerText = `Depuis le ${conversation.cree_le}`;
            },
            null, null, null, null, 0, false);
    }


    /**
     * Signale la conversation.
     * 
     * @returns {void}
     */
    repportUser() {
        Modal.create('Signalement', /*html*/`
            <textarea class="input" id="rapport" placeholder="Raison du signalement..."></textarea>`, 
            () => {
                let raison = Finder.query('#rapport').value.trim();
                if (raison === '') {
                    Msgbox.show('Attention', 'Vous devez entrer une raison.', Msgbox.IMG_WARN);
                } else if (raison.length < 10) {
                    Msgbox.show('Attention', 'Vous devez entrer une raison de plus de 10 caractères.', Msgbox.IMG_WARN);
                } else {
                    let error = () => Msgbox.show('Erreur', 'Une erreur est survenue.', Msgbox.IMG_ERROR);
                    Rest.post(`/api/utilisateurs/${this.interlocutor_id}/rapport`,
                        (content, json) => { // Success
                            if (content) {
                                Modal.close();
                                Msgbox.show('Signalement', 'Votre rapport a été envoyé.', Msgbox.IMG_OK);
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
                            raison: raison
                        },
                        0,
                        true
                    );
                }
            });
    }


    /**
     * Bloque ou débloque l'utilisateur.
     * 
     * @returns {void}
     */
    blockUser() {
        let error = () => Msgbox.show('Erreur', 'Une erreur est survenue.', Msgbox.IMG_ERROR);
        if (this.bloquer) {
            Rest.delete(`/api/utilisateurs/${this.interlocutor_id}/bloque`,
                (content, json) => { // Success
                    if (content) {
                        this.bloquer = false;
                        this.bloque.innerText = 'Bloquer cet utilisateur';
                        menu_conversation_message.checkBloque();
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
                    
                },
                0,
                true
            );
        } else {
            Rest.post(`/api/utilisateurs/${this.interlocutor_id}/bloque`,
                (content, json) => { // Success
                    if (content) {
                        this.bloquer = true;
                        this.bloque.innerText = 'Débloquer cet utilisateur';
                        menu_conversation_message.checkBloque();
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
                    
                },
                0,
                true
            );
        }
    }


    /**
     * Retour en arrière.
     * 
     * @returns {void}
     */
    comeBack() {
        menu_conversation_message.container.style.transform = 'translateX(0%)';
    }


    /**
     * Supprime la conversation.
     * 
     * @returns {void}
     */
    deleteConv() {
        if (this.conversation_id !== null) {
            Confirmbox.show(
                'Suppression', 
                'Voulez-vous vraiment supprimer cette conversation ?', 
                () => {
                    let error = () => Msgbox.show('Erreur', 'Une erreur est survenue.', Msgbox.IMG_ERROR);
                    Rest.delete(`/api/conversations/${this.conversation_id}`,
                        (content, json) => { // Success
                            if (content) {
                                this.conversation_id = null;
                                this.name.innerText = '';
                                this.date.innerText = '';
                                Attribute.disable(this.delete);
                                Attribute.disable(this.report);
                                Attribute.disable(this.bloque);
                                this.picture.src = '/assets/img/default.png';
                                menu_conversation_message.deleteConv();
                                menu_conversation_liste.deleteConv();
                                if (window.onModile()) {
                                    this.comeBack();
                                }
                            }
                            else error();
                        },
                        error, error, error, error, 0, false);
                },
                () => {
                },
                Confirmbox.IMG_WARN);
        }
    }

}