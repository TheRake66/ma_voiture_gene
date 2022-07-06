<?php
namespace Api;

use Kernel\Debug\Error;
use Kernel\Communication\Rest;
use Kernel\Database\Statement;
use Kernel\Database\Transaction;
use Kernel\Security\Vulnerability\Xss;
use Kernel\Security\Vulnerability\Csrf;
use Kernel\Security\Validation;
use Kernel\Session\User;
use Model\Dao\Ma_voiture_gene\Conversation as DAOConversation;
use Model\Dao\Ma_voiture_gene\Message as Ma_voiture_geneMessage;
use Model\Dto\Ma_voiture_gene\Conversation as Ma_voiture_geneConversation;
use Model\Dto\Ma_voiture_gene\Membre;
use Model\Dto\Ma_voiture_gene\Message;

/**
 * Module d'API Conversation.
 * 
 * @author thiba
 * @version 1.0
 * @package Api
 * @category API
 */
class Conversation extends Rest {

    /**
     * Appel via la méthode GET.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function get($route, $query, $body) {
        $this->match('/api/conversations/moi', function() {
            $this->send(DAOConversation::getMy(), 0, 'Recupere la liste des conversations de l\'utilisateur');
        });
        $this->match('/api/conversations/{id}', function() use ($query) {
            $id = $this->data($query, 'id');
            $this->send((new Ma_voiture_geneConversation($id))->read(), 0, 'Recupere la conversation');
        });
        $this->match('/api/conversations/{id}/messages', function() use ($query) {
            $id = $this->data($query, 'id');
            $this->send(DAOConversation::getMessages($id), 0, 'Recupere les messages de la conversation.');
        });
        $this->match('/api/conversations/{id}/messages/last', function() use ($query) {
            $id = $this->data($query, 'id');
            $this->send(DAOConversation::getLastMessage($id), 0, 'Recupere le dernier message');
        });
        $this->match('/api/conversations/{id}/messages/{offset}', function() use ($query) {
            $id = $this->data($query, 'id');
            $offset = $this->data($query, 'offset');
            $this->send(DAOConversation::getMessagesOffset($id, $offset), 0, 'Recupere les derniers messages de la conversation.');
            
        });
        $this->match('/api/conversations/{id}/membres', function() use ($query) {
            $id = $this->data($query, 'id');
            $members = DAOConversation::getMembers($id);
            if ($members) {
                foreach ($members as $member) {
                    if ($member->photo) {
                        $member->photo = base64_encode($member->photo);
                    }
                }
            }
            $this->send($members, 0, 'Recupere les membres la conversation.');
        });
    }


    /**
     * Appel via la méthode POST.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function post($route, $query, $body) {
        $this->match('/api/conversations/{id}/messages', function() use ($query, $body) {
            $id = $this->data($query, 'id');
            $contenu = $this->data($body, 'contenu');
            try {
                Transaction::begin();

                $message = new Message(
                    null, 
                    $contenu, 
                    new \DateTime(), 
                    User::get()->_id, 
                    $id);
                $message->create();
                $message->_id = Statement::instance()->lastInsertId();

                Ma_voiture_geneMessage::sendNotification($message->_id);

                Transaction::commit();
                $this->send(true, 0, 'Envoie un message.');
            } catch (\Exception $e) {
                Transaction::rollback();
                $this->send(false, 1, 'Erreur lors de l\'envoi du message.');
            }
        });
        $this->match('/api/conversations/{id}/vu', function() use ($query) {
            $id = $this->data($query, 'id');
            $this->send(DAOConversation::setVu($id), 0, 'Met les messages en vu.');
        });
        $this->match('/api/conversations', function() use ($body) {
            $interlocuteur = $this->data($body, 'interlocuteur');
            try {
                Transaction::begin();

                $conversation = new Ma_voiture_geneConversation(null, new \DateTime());
                $conversation->create();
                $conversation->_id = Statement::instance()->lastInsertId();

                $membre1 = new Membre(User::get()->_id, $conversation->_id);
                $membre1->create();

                $membre2 = new Membre($interlocuteur, $conversation->_id);
                $membre2->create();

                Transaction::commit();
                $this->send($conversation->_id, 0, 'Créé une conversation.');
            } catch (\Exception $e) {
                Transaction::rollback();
                $this->send(null, 1, 'Erreur lors de la creation de la conversation.');
            }
        });
    }


    /**
     * Appel via la méthode PUT.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function put($route, $query, $body) {
        $this->send(null, 0, 'Fonction non implémentée !', 500);
    }


    /**
     * Appel via la méthode DELETE.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function delete($route, $query, $body) {
        $this->match('/api/conversations/{id}', function() use ($query) {
            $id = $this->data($query, 'id');
            $this->send(DAOConversation::delete($id), 0, 'Supprime la conversation');
        });
    }


    /**
     * Appel via la méthode PATCH.
     * 
     * @param string $route La route de l'appel.
     * @param array $query Les paramètres de la route.
     * @param array $body Le corps de la requête.
     * @return mixed Résultat de l'appel.
     */
    function patch($route, $query, $body) {
        $this->send(null, 0, 'Fonction non implémentée !', 500);
    }

}

?>