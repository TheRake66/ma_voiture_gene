<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Membre.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Membre extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_id;
    public $_id_Conversation;	
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $id = null,
        $id_Conversation = null
    ) {
        $this->_id = $id;
        $this->_id_Conversation = $id_Conversation;
    }
	
}

?>