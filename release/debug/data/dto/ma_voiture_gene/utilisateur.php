<?php
namespace Model\Dto\Ma_voiture_gene;

use Kernel\DataBase\Factory\Crud;



/**
 * Classe DTO Utilisateur.
 * 
 * @author thiba
 * @version 1.0
 * @package Model\Dto\Ma_voiture_gene
 * @category DTO (Data Transfer Object)
 */
class Utilisateur extends Crud {

    /**
     * @var mixed Les propriétés de l'objet.
     */
    public $_id;
    public $nom;
    public $prenom;
    public $email;
    public $mot_de_passe;
    public $sel;
    public $jeton;
    public $derniere_connexion;
    public $theme;
    public $photo;


    /**
     * Constructeur de la classe.
     * 
     * @access public
     * @return void
     */
    function __construct(
        $_id = null,
        $nom = null,
        $prenom = null,
        $email = null,
        $mot_de_passe = null,
        $sel = null,
        $jeton = null,
        $derniere_connexion = null,
        $theme = null,
        $photo = null
    ) {
        $this->_id = $_id;
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->email = $email;
        $this->mot_de_passe = $mot_de_passe;
        $this->sel = $sel;
        $this->jeton = $jeton;
        $this->derniere_connexion = $derniere_connexion;
        $this->theme = $theme;
        $this->photo = $photo;
    }

}

?>