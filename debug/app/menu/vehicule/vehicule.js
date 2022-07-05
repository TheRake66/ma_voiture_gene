import Attribute from '../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../.kernel/js/html/dom.js';
import Finder from '../../../../.kernel/js/html/finder.js';
import Rest from '../../../../.kernel/js/communication/rest.js';
import Location from '../../../../.kernel/js/url/location.js';
import Modal from '../../../lib/js/modal.js';
import Msgbox from '../../../lib/js/msgbox.js';




/**
 * Script du composant Vehicule.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Vehicule {

    /**
     * Les éléments.
     */
    container = Finder.query('menu-vehicule');
    liste = Finder.query('menu-vehicule #liste');


    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        this.loadPlates();
    }


    /**
     * Supprime une plaque.
     * 
     * @param {string} plaque La plaque à supprimer.
     * @return {void}
     */
    deletePlate(numero) {
        let error = () => Msgbox.show('Erreur', 'Impossible de supprimer la plaque.', Msgbox.IMG_ERROR);
        Rest.delete(`/api/plaques/${numero}`,
            (content, json) => { // Success
                if (content) {
                    Msgbox.show('Succès', 'La plaque a été supprimée.');
                    menu_vehicule.loadPlates();
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


    /**
     * Charge les plaques.
     * 
     * @return {void}
     */
    loadPlates() {
        Dom.clear(this.liste);

        Rest.getFor('/api/plaques/moi',
            (plaque, json) => { // Success
                Dom.insert(/*html*/`
                    <div class="item">
                        <span>${plaque._numero}</span>
                        <button class="button-danger-border-small" onclick="menu_vehicule.deletePlate('${plaque._numero}')">Supprimer</button>
                    </div>
                `, this.liste);
            },
            () => { // Pre
            },
            () => { // Post
                
            },
            () => { // Empty
                Dom.insert(/*html*/`
                    <p>Aucune plaque</p>
                `, this.liste);
            },
            () => { // Failed
                Dom.insert(/*html*/`
                    <p>Impossible de charger les plaques</p>
                `, this.liste);
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
     * Ouvre le modal d'ajout de plaque.
     * 
     * @return {void}
     */
    addPlate() {
        Modal.create('Ajouter', /*html*/`
            <label class="label">NUMERO DE PLAQUE</label>
            <input type="text" id="numero" class="input" placeholder="AA-123-BB">
        `, 
        this.submitPlate, 
        null,
        'add');
    }


    /**
     * Envoie la plaque.
     * 
     * @return {void}
     */
    submitPlate() {
        let numero = Finder.query('modal #numero');
        let trimed = numero.value.trim();
        if (trimed === '') {
            Msgbox.show('Attention', 'Veuillez entrer un numéro de plaque.', Msgbox.IMG_WARN);
        } else if (!/^[A-Z]{2}-[0-9]{3}-[A-Z]{2}$/.test(trimed)) {
            Msgbox.show('Attention', 'Veuillez entrer un numéro de plaque valide.', Msgbox.IMG_WARN);
        } else {
            let error = () => Msgbox.show('Erreur', 'Impossible d\'ajouter la plaque.', Msgbox.IMG_ERROR);
            Rest.post('/api/plaques',
                (content, json) => { // Success
                    if (content) {
                        Msgbox.show('Succès', 'La plaque a été ajoutée.');
                        Modal.close();
                        menu_vehicule.loadPlates();
                    } else {
                        Msgbox.show('Erreur', 'Cette plaque existe déjà.', Msgbox.IMG_ERROR);
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
                    numero: trimed
                },
                0,
                true
            );
        }
    }

}