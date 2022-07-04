import Attribute from '../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../.kernel/js/html/dom.js';
import Finder from '../../../../.kernel/js/html/finder.js';
import Rest from '../../../../.kernel/js/communication/rest.js';
import Location from '../../../../.kernel/js/url/location.js';
import Modal from '../../../lib/js/modal.js';
import Msgbox from '../../../lib/js/msgbox.js';



/**
 * Script du composant Parametre.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Parametre {

    /**
     * Les éléments.
     */
    container = Finder.query('menu-parametre');
    image = Finder.query('menu-parametre #image');
    titre = Finder.query('menu-parametre #titre');
    nom = Finder.query('menu-parametre #nom');
    prenom = Finder.query('menu-parametre #prenom');
    email = Finder.query('menu-parametre #email');


    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        this.loadProfil();
    }


    /**
     * Charge le profil.
     * 
     * @return {void}
     */
    loadProfil() {
        Rest.get('/api/utilisateurs/moi',
            (moi, json) => { // Success
                this.image.src = moi.photo === null ?
                    '/assets/img/default.png' :
                    'data:image/png;base64,' + moi.photo;
                    this.titre.innerText = moi.nom + ' ' + moi.prenom;
                    this.nom.innerText = moi.nom;
                    this.prenom.innerText = moi.prenom;
                    this.email.innerText = moi.email;
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
            true
        );
    }


    /**
     * Ouvre la modal de modification du profil.
     * 
     * @return {void}
     */
    modifyProfil() {
        Modal.create('Modifier', /*html*/`
                <div>
                    <img id="image" src="/assets/img/default.png" alt="">
                    <input type="file" id="file" accept="image/*">
                    <div>
                        <button id="changer" class="button">Changer</button>
                        <button id="retirer" class="button-danger-border">Retirer</button>
                    </div>
                </div>

                <label class="label" for="">NOM</label>
                <input id="nom" class="input" type="text">
    
                <label class="label" for="">PRENOM</label>
                <input id="prenom" class="input" type="text">
    
                <label class="label" for="">ADRESSE E-MAIL</label>
                <input id="email" class="input" type="email">
            `,
            null,
            null,
            'profil');

        let image = Finder.query('modal #image');
        let nom = Finder.query('modal #nom');
        let prenom = Finder.query('modal #prenom');
        let email = Finder.query('modal #email');

        image.src = this.image.src;
        nom.value = this.nom.innerText;
        prenom.value = this.prenom.innerText;
        email.value = this.email.innerText;

        let file = Finder.query('modal #file');
        let changer = Finder.query('modal #changer');
        let retirer = Finder.query('modal #retirer');

        file.addEventListener('change', () => {
            let f = file.files[0];
            let r = new FileReader();
            r.readAsDataURL(f);
            r.onload = () => {
                image.src = r.result;
            };
        });
        changer.onclick = () => {
            file.click();
        };
        retirer.onclick = () => {
            file.value = '';
            image.src = '/assets/img/default.png';
        };
    }


    /**
     * Ouvre la modal de modification du mot de passe.
     * 
     * @return {void}
     */
    modifyPass() {
        Modal.create('Changer', /*html*/`
                <label class="label" for="">ANCIEN MOT DE PASSE</label>
                <input id="old" class="input" type="password">

                <label class="label" for="">NOUVEAU MOT DE PASSE</label>
                <input id="neww" class="input" type="password">

                <label class="label" for="">CONFIRMER MOT DE PASSE</label>
                <input id="confirm" class="input" type="password">
            `,
            null,
            null,
            'pass');

        let old = Finder.query('modal #old').value.trim();
        let neww = Finder.query('modal #neww').value.trim();
        let confirm = Finder.query('modal #confirm').value.trim();

        let changer = Finder.query('modal #changer');
        changer.onclick = () => {
            if (old === '') {
                Msgbox.error('Veuillez entrer votre ancien mot de passe.');
            } else if (neww !== confirm) {
                Msgbox.error('Les mots de passe ne correspondent pas.');
            } else {

            }
        };
    }

}