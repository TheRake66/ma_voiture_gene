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
    public $date;
    public $id_Utilisateur;
    public $id_Utilisateur_1;
    

    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $_id = null,
        $contenu = null,
        $date = null,
        $id_Utilisateur = null,
        $id_Utilisateur_1 = null
    ) {
        $this->_id = $_id;
        $this->contenu = $contenu;
        $this->date = $date;
        $this->id_Utilisateur = $id_Utilisateur;
        $this->id_Utilisateur_1 = $id_Utilisateur_1;
    }
	
}

?>