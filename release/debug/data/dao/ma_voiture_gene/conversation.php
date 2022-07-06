<?php
namespace Model\Dao\Ma_voiture_gene;

use Kernel\DataBase\Toogle;
use Kernel\DataBase\Transaction;
use Kernel\DataBase\Query;
use Kernel\Debug\Log;
use Kernel\Session\User;
use Model\Dto\Ma_voiture_gene\Conversation as Dto;
use Model\Dto\Ma_voiture_gene\Message;
use Model\Dto\Ma_voiture_gene\Utilisateur;
use Model\Dto\Ma_voiture_gene\Vu;

/**
 * Classe DAO Conversation.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dao\Ma_voiture_gene
 * @category DAO (Data Access Object)
 */
class Conversation {

    /**
     * Supprime une conversation.
     * 
     * @param int $id L'identifiant de la conversation.
     * @return bool True si la conversation a été supprimée, false sinon.
     */
    static function delete($id) {
        return Toogle::object(function() use ($id) {
            try {
                Transaction::begin();

                Query::execute(
                    'DELETE n.*
                    FROM notification AS n
                    INNER JOIN message AS m 
                        ON n.id_message = m.id
                        AND m.id_conversation = ?',
                    $id);

                Query::execute(
                    'DELETE v.*
                    FROM vu AS v
                    INNER JOIN message AS m 
                        ON v.id_message = m.id
                        AND m.id_conversation = ?',
                    $id);

                Query::execute(
                    'DELETE 
                    FROM message 
                    WHERE id_conversation = ?',
                    $id);

                Query::execute(
                    'DELETE 
                    FROM membre 
                    WHERE id_conversation = ?',
                    $id);

                Query::execute(
                    'DELETE 
                    FROM conversation 
                    WHERE id = ?', 
                    $id);
                
                Transaction::commit();
                return true;
            } catch (\Exception $e) {
                Transaction::rollback();
                Log::add($e->getMessage());
                return false;
            }
        }, Dto::class);
    }


    /**
     * Met tous les messages en vu.
     * 
     * @param int $id L'id de la conversation.
     * @return bool True si tout s'est bien passé.
     */
    static function setVu($id) {
        return Toogle::object(function() use ($id) {
            return Query::execute(
                'INSERT INTO vu (id, id_Message, vu_le)
                SELECT ?, m.id, NOW()
                FROM message AS m
                WHERE m.id NOT IN (
                    SELECT v.id_Message
                    FROM vu AS v
                    WHERE v.id_message = m.id
					AND v.id = ?
                )
                AND m.id_Conversation = ?', 
                [
                    User::get()->_id,
                    User::get()->_id,
                    $id
                ]);
        }, Vu::class);
    }


    /**
     * Recupere la liste des conversations de l'utilisateur.
     * 
     * @return array Les derniers messages de chaque conversation.
     */
    static function getMy() {
        return Toogle::object(function() {
            return Query::objects(
                'SELECT c.*
                FROM conversation AS c
                INNER JOIN membre AS m 
                    ON m.id_Conversation = c.id
                    AND m.id = ?',
                Dto::class,
                User::get()->_id);
        }, Message::class);
    }
    
    
    /**
     * Recupere les membres de la conversation.
     * 
     * @return array Les membres.
     */
    static function getMembers($id) {
        return Toogle::object(function() use ($id) {
            return Query::objects(
                'SELECT u.*
                FROM utilisateur AS u
                INNER JOIN membre AS m 
                    ON m.id = u.id
                WHERE u.id != ?
                AND m.id_Conversation = ?',
                Utilisateur::class,
                [
                    User::get()->_id,
                    $id
                ]);
        }, Utilisateur::class);
    }


    /**
     * Recupere les messages d'une conversation.
     * 
     * @return array Les messages.
     */
    static function getMessages($id) {
        return Toogle::object(function() use ($id) {
            return Query::objects(
                'SELECT *
                FROM message
                WHERE id_Conversation = ?
                ORDER BY envoye_le',
                Message::class,
                $id);
        }, Message::class);
    }


    /**
     * Recupere le dernier message d'une conversation.
     * 
     * @return Object Le dernier message.
     */
    static function getLastMessage($id) {
        return Toogle::object(function() use ($id) {
            return Query::object(
                'SELECT *
                FROM message
                WHERE id_Conversation = ?
                ORDER BY envoye_le DESC
                LIMIT 1',
                Message::class,
                $id);
        }, Message::class);
    }


    /**
     * Recupere les messages d'une conversation depuis un message.
     * 
     * @param int $offset Le message de depart.
     * @return array Les messages.
     */
    static function getMessagesOffset($id, $offset) {
        return Toogle::object(function() use ($id, $offset) {
            return Query::objects(
                'SELECT *
                FROM message
                WHERE id_Conversation = ?
                ORDER BY envoye_le
                LIMIT 100000 OFFSET ?',
                Message::class,
                [
                    $id,
                    $offset
                ]);
        }, Message::class);
    }

}

?>