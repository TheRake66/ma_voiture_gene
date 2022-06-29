<?php
namespace Model\Dao\Ma_voiture_gene;

use Kernel\DataBase\Toogle;
use Kernel\DataBase\Transaction;
use Kernel\DataBase\Query;
use Kernel\Session\User;
use Model\Dto\Ma_voiture_gene\Conversation as Dto;
use Model\Dto\Ma_voiture_gene\Message;
use Model\Dto\Ma_voiture_gene\Utilisateur;

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
     * Recupere la liste des conversations de l'utilisateur.
     * 
     * @return array Les derniers messages de chaque conversation.
     */
    static function getMy() {
        return Toogle::object(function() {
            return Query::objects(
                'SELECT *
                FROM message AS m1
                WHERE m1.id IN (

                    SELECT MAX(m2.id)
                    FROM message AS m2

                    INNER JOIN conversation AS c 
                        ON c.id = m2.id_Conversation

                    INNER JOIN membre AS m 
                        ON m.id_Conversation = c.id
                        AND m.id = ?

                    WHERE m2.id_Conversation = m1.id_Conversation
                    AND m.id 
                    GROUP BY m2.id_Conversation
                )',
                Message::class,
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
                'SELECT *
                FROM utilisateur AS u
                INNER JOIN membre AS m 
                    ON m.id = u.id
                    AND m.id_Conversation = ?
                WHERE u.id != ?',
                Utilisateur::class,
                [
                    $id,
                    User::get()->_id
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