<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Vu.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Vu extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_id;
    public $_id_Utilisateur;
    public $vu_le;
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $_id = null,
        $_id_Utilisateur = null,
        $vu_le = null
    ) {
        $this->_id = $_id;
        $this->_id_Utilisateur = $_id_Utilisateur;
        $this->vu_le = $vu_le;
    }
	
}

?>