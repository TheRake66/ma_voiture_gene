<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Message.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Message extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_id;
    public $contenu;
    public $envoye_le;
    public $id_Utilisateur;
    public $id_Conversation;
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $id = null,
        $contenu = null,
        $envoye_le = null,
        $id_Utilisateur = null,
        $id_Conversation = null
    ) {
        $this->_id = $id;
        $this->contenu = $contenu;
        $this->envoye_le = $envoye_le;
        $this->id_Utilisateur = $id_Utilisateur;
        $this->id_Conversation = $id_Conversation;
    }
	
}

?>