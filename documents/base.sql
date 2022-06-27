#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: Utilisateur
#------------------------------------------------------------

CREATE TABLE Utilisateur(
        id                 Int  Auto_increment  NOT NULL ,
        nom                Varchar (50) NOT NULL ,
        prenom             Varchar (50) NOT NULL ,
        email              Varchar (100) NOT NULL ,
        mot_de_passe       Varchar (500) NOT NULL ,
        sel                Varchar (50) NOT NULL ,
        jeton              Varchar (500) NOT NULL ,
        derniere_connexion Datetime ,
        theme              Varchar (50) ,
        photo              Longblob
	,CONSTRAINT Utilisateur_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Plaque
#------------------------------------------------------------

CREATE TABLE Plaque(
        numero Varchar (50) NOT NULL ,
        id     Int NOT NULL
	,CONSTRAINT Plaque_PK PRIMARY KEY (numero)

	,CONSTRAINT Plaque_Utilisateur_FK FOREIGN KEY (id) REFERENCES Utilisateur(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Message
#------------------------------------------------------------

CREATE TABLE Message(
        id               Int  Auto_increment  NOT NULL ,
        contenu          Text NOT NULL ,
        envoye_le        Datetime NOT NULL ,
        vue_le           Datetime ,
        id_Utilisateur   Int NOT NULL ,
        id_Utilisateur_1 Int NOT NULL
	,CONSTRAINT Message_PK PRIMARY KEY (id)

	,CONSTRAINT Message_Utilisateur_FK FOREIGN KEY (id_Utilisateur) REFERENCES Utilisateur(id)
	,CONSTRAINT Message_Utilisateur0_FK FOREIGN KEY (id_Utilisateur_1) REFERENCES Utilisateur(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Exemple
#------------------------------------------------------------

CREATE TABLE Exemple(
        id      Int  Auto_increment  NOT NULL ,
        contenu Text NOT NULL
	,CONSTRAINT Exemple_PK PRIMARY KEY (id)
)ENGINE=InnoDB;

