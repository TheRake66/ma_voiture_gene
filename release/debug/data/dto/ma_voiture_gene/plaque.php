<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Plaque.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Plaque extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_numero;
    public $id;
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $_numero = null,
        $id = null
    ) {
        $this->_numero = $_numero;
        $this->id = $id;
    }
	
}

?>