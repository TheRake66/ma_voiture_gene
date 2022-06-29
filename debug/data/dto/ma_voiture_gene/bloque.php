<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Bloque.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Bloque extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_id;
    public $_id_Utilisateur;
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $id = null,
        $id_Utilisateur = null
    ) {
        $this->_id = $id;
        $this->_id_Utilisateur = $id_Utilisateur;
    }
	
}

?>