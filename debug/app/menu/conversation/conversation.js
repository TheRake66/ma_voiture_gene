import Attribute from '../../../../.kernel/js/html/attribute.js';
import Dom from '../../../../.kernel/js/html/dom.js';
import Finder from '../../../../.kernel/js/html/finder.js';
import Rest from '../../../../.kernel/js/communication/rest.js';
import Location from '../../../../.kernel/js/url/location.js';


/**
 * Script du composant Conversation.
 * 
 * @author thiba
 * @version 1.0
 * @category Script
 */
export default class Conversation {

    /**
     * Point d'entrée du script.
     * 
     * @access public
     * @return {void}
     */
     constructor() {
        menu_conversation_liste.mainLoop();
        menu_conversation_message.loadMy();
        menu_conversation_message.loadPredefini();
        menu_conversation_message.mainLoop();
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                menu_conversation_message.scrollToLast();
            }, 500);
        });
    }

}