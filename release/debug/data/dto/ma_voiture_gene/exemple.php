<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Exemple.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Exemple extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_id;
    public $contenu;
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $_id = null,
        $contenu = null
    ) {
        $this->_id = $_id;
        $this->contenu = $contenu;
    }
	
}

?>