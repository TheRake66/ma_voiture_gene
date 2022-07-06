<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Notification.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Notification extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_id;
    public $_id_Message;
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $_id = null,
        $_id_Message = null
    ) {
        $this->_id = $_id;
        $this->_id_Message = $_id_Message;
    }
	
}

?>