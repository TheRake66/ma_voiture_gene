<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Conversation.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Conversation extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_id;
    public $cree_le;
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $id = null,
        $cree_le = null
    ) {
        $this->_id = $id;
        $this->cree_le = $cree_le;
    }
	
}

?>