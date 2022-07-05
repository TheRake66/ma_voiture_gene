import Attribute from '../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../.kernel/js/html/dom.js';
import Finder from '../../../../.kernel/js/html/finder.js';
import Rest from '../../../../.kernel/js/communication/rest.js';
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
    width = 1280;
    height = 720;
    streaming = false;
    pocessing = false;


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
            if (this.streaming && !this.pocessing) {
                await this.takePicture();
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
                video: true,
                audio: false
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
    async takePicture() {
        this.canvas
            .getContext('2d')
            .drawImage(this.video, 0, 0, this.width, this.height);
        let data = this.canvas.toDataURL('image/png');

        Rest.post('/api/plaques/ocr',
            (content, json) => { // Success
                console.log(content);
            },
            () => { // Empty
                
            },
            () => { // Failed
                
            },
            () => { // Expired
                
            },
            {
                image: data
            },
            0,
            false
        );
        
    }


    /**
     * Ouvre le modal de scan manuel.
     * 
     * @return {void}
     */
    scanManually() {
        Modal.create('Ajouter', /*html*/`
            <label class="label">NUMERO DE PLAQUE</label>
            <input type="text" id="numero" class="input" placeholder="AA-123-BB">
        `, 
        this.submitPlate, 
        null,
        'add');
    }


}