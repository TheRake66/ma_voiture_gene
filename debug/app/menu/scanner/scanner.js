import Attribute from '../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../.kernel/js/html/dom.js';
import Finder from '../../../../.kernel/js/html/finder.js';
import Rest from '../../../../.kernel/js/communication/rest.js';
import Cookie from '../../../../.kernel/js/io/cookie.js';
import Location from '../../../../.kernel/js/url/location.js';
import Modal from '../../../lib/js/modal.js';
import Msgbox from '../../../lib/js/msgbox.js';




/**
 * Script du composant Scanner.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Scanner {

    /**
     * Les éléments.
     */
    scanner = Finder.tag('scanner')[0];
    video = Finder.query('video', this.scanner);
    canvas = Finder.query('canvas', this.scanner);
    width = 500;
    height = 500;
    streaming = false;
    pocessing = false;
    openned = false;
    redirect = false;


    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        this.startStream();
        this.mainLoop();
    }


    /**
     * Boucle principale du script.
     * 
     * @return {void}
     */
    async mainLoop() {
        while (true) {
            if (this.streaming && !this.openned && !this.pocessing) {
                this.takePicture();
            } else {
                await new Promise(resolve => setTimeout(resolve, 10));
            }
        }
    }


    /**
     * Démarre le stream.
     * 
     * @return {void}
     */
    startStream() {
        window.navigator.getMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

            window.navigator.getMedia(
            {
                video: {
                    facingMode: "environment"
                },
                audio: false,
            }, 
            stream => {
                this.video.srcObject  = stream;
                this.video.play();
            }, 
            error => {
                Msgbox.show('Erreur', 'Impossible de lancer le stream', Msgbox.IMG_ERROR);
            }
        );

        this.video.addEventListener('canplay', event => {
            if (!this.streaming) {
                this.height = this.video.videoHeight / 
                            (this.video.videoWidth / this.width);
                this.video.setAttribute('width', this.width);
                this.video.setAttribute('height', this.height);
                this.canvas.setAttribute('width', this.width);
                this.canvas.setAttribute('height', this.height);
                this.streaming = true;
            }
        }, false);
    }


    /**
     * Prends une photo et l'envoie au serveur.
     * 
     * @return {void}
     */
    takePicture() {
        this.pocessing = true;

        this.canvas
            .getContext('2d')
            .drawImage(this.video, 0, 0, this.width, this.height);
        let data = this.canvas.toDataURL('image/png');

        Rest.post('/api/plaques/ocr',
            (content, json) => { // Success
                if (content) {
                    menu_scanner.scanManually();
                    Finder.query('modal #add #numero').value = content;
                }
                this.pocessing = false;
            },
            () => { // Empty
                this.pocessing = false;
            },
            () => { // Failed
                this.pocessing = false;
            },
            () => { // Expired
                this.pocessing = false;
            },
            {
                image: data
            },
            0,
            true
        );
        
    }


    /**
     * Ouvre le modal de scan manuel.
     * 
     * @return {void}
     */
    scanManually() {
        // Creer le modal
        this.openned = true;
        Modal.create('Ajouter', /*html*/`
            <label class="label">NUMERO DE PLAQUE</label>
            <input type="text" id="numero" class="input" placeholder="AA-123-BB">
        `, 
        // Submit
        () => {
            let numero = Finder.query('modal #add #numero').value.trim();

            if (numero === '') {
                Msgbox.show('Attention', 'Veuillez entrer un numéro de plaque', Msgbox.IMG_WARN);
            } else {

                // On recupere la plaque en BDD
                Rest.get(`/api/plaques/${numero}`,
                    (plaque, json) => { // Success

                        
                        if (plaque.id == Cookie.get('ma_voiture_gene_session_id')) {
                            Msgbox.show('Attention', 'Vous ne pouvez pas scanner votre propre véhicule', Msgbox.IMG_WARN);
                            return;
                        }

                        let create = () => {
                            if (menu_scanner.redirect) return;
                            // On creer la conversation
                            let error = () => Msgbox.show('Erreur', 'Impossible de créer la conversation', Msgbox.IMG_ERROR);
                            Rest.post(`/api/conversations`,
                                (content, json) => { // Success
                                    Location.go(`/conversations?id=${content}`);
                                },
                                error, error, error,
                                { interlocuteur: plaque.id },
                                0, false
                            );
                        }

                        // On verifi dans la liste des conversations existantes
                        let error = () => Msgbox.show('Erreur', 'Impossible de récupérer les conversations.', Msgbox.IMG_ERROR);
                        Rest.getFor('/api/conversations/moi',
                            (conversation, json) => { // Success
                                // On verifie si le proprietaire de la plaque est le meme que le membre
                                let error = () => Msgbox.show('Erreur', 'Impossible de récupérer les membres.', Msgbox.IMG_ERROR);
                                Rest.getFor(`/api/conversations/${conversation._id}/membres`,
                                    (membre, json) => { // Success
                                        // On redirige vers la conversation si le proprietaire est le meme que le membre
                                        if (membre._id == plaque.id) {
                                            menu_scanner.redirect = true;
                                            Location.go(`/conversations?id=${conversation._id}`);
                                        }
                                    }, null, null, error, error, error, null, 0, false);
                            }, null, create, create, error, error, null, 0, false);

                    },
                    () => { // Empty
                        Msgbox.show('Introuvable', 'Cette plaque n\'est associée à aucun de nos utilisateur.', Msgbox.IMG_ERROR);
                    },
                    () => { // Failed
                        Msgbox.show('Erreur', 'Impossible de récupérer les informations de cette plaque.', Msgbox.IMG_ERROR);
                    }
                );
            }
        },

        // Cancel
        () => {
            this.openned = false;
            Modal.close();
        }, 

        'add');
    }


}