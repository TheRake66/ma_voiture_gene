<?php
namespace Model\Dao\Ma_voiture_gene;

use Kernel\DataBase\Toogle;
use Kernel\DataBase\Transaction;
use Kernel\DataBase\Query;
use Kernel\Session\User;
use Model\Dto\Ma_voiture_gene\Message as Dto;



/**
 * Classe DAO Message.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dao\Ma_voiture_gene
 * @category DAO (Data Access Object)
 */
class Message {

    /**
     * Enregistre les notifications d'un message.
     * 
     * @return bool True si l'enregistrement s'est bien passé, false sinon.
     */
    static function sendNotification($id) {
        return Toogle::object(function() use ($id) {
            return Query::execute(
                'INSERT INTO notification

                SELECT u.id, m2.id
                FROM utilisateur AS u

                INNER JOIN membre AS m
                    ON u.id = m.id

                INNER JOIN conversation AS c
                    ON m.id_conversation = c.id

                INNER JOIN message AS m2
                    ON c.id = m2.id_conversation

                WHERE m2.id = ?
                AND u.id != ?',
                [
                    $id,
                    User::get()->_id
                ]);
        }, Dto::class);
    }
    
}

?>