import Attribute from '../../../.kernel/js/html/attribute.js';
import Dom from '../../../.kernel/js/html/dom.js';
import Finder from '../../../.kernel/js/html/finder.js';
import Rest from '../../../.kernel/js/communication/rest.js';
import Location from '../../../.kernel/js/url/location.js';



/**
 * Script du composant Menu.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Menu {

    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
    constructor() {
        this.notificationChecker();
    }


    /**
     * Envoie les notifications.
     * 
     * @return {void}
     */
    async notificationChecker() {
        while (true) {
            Rest.getFor(`/api/messages/notifications`,
                (notification, json) => { // Success
                    Rest.get(`/api/messages/${notification._id_Message}`,
                        (message, json) => { // Success
                            Rest.get(`/api/utilisateurs/${message.id_Utilisateur}`,
                                (utilisateur, json) => { // Success
                                    window.sendNotification(
                                        `${utilisateur.prenom} ${utilisateur.nom}`,
                                        message.contenu,
                                        utilisateur.photo === null ?
                                            '/assets/img/default.png' :
                                            'data:image/png;base64,' + utilisateur.photo);
                                }, null, null, null, null, 0, false);
                        }, null, null, null, null, 0, false);
                }, null, null, null, null, null, null, 0, false);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

}