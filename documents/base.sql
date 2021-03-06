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
        jeton              Varchar (500) ,
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
# Table: Exemple
#------------------------------------------------------------

CREATE TABLE Exemple(
        id      Int  Auto_increment  NOT NULL ,
        contenu Text NOT NULL
	,CONSTRAINT Exemple_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Conversation
#------------------------------------------------------------

CREATE TABLE Conversation(
        id      Int  Auto_increment  NOT NULL ,
        cree_le Datetime NOT NULL
	,CONSTRAINT Conversation_PK PRIMARY KEY (id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Message
#------------------------------------------------------------

CREATE TABLE Message(
        id              Int  Auto_increment  NOT NULL ,
        contenu         Text NOT NULL ,
        envoye_le       Datetime NOT NULL ,
        id_Conversation Int NOT NULL ,
        id_Utilisateur  Int NOT NULL
	,CONSTRAINT Message_PK PRIMARY KEY (id)

	,CONSTRAINT Message_Conversation_FK FOREIGN KEY (id_Conversation) REFERENCES Conversation(id)
	,CONSTRAINT Message_Utilisateur0_FK FOREIGN KEY (id_Utilisateur) REFERENCES Utilisateur(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Membre
#------------------------------------------------------------

CREATE TABLE Membre(
        id              Int NOT NULL ,
        id_Conversation Int NOT NULL
	,CONSTRAINT Membre_PK PRIMARY KEY (id,id_Conversation)

	,CONSTRAINT Membre_Utilisateur_FK FOREIGN KEY (id) REFERENCES Utilisateur(id)
	,CONSTRAINT Membre_Conversation0_FK FOREIGN KEY (id_Conversation) REFERENCES Conversation(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Vu
#------------------------------------------------------------

CREATE TABLE Vu(
        id         Int NOT NULL ,
        id_Message Int NOT NULL ,
        vu_le      Datetime NOT NULL
	,CONSTRAINT Vu_PK PRIMARY KEY (id,id_Message)

	,CONSTRAINT Vu_Utilisateur_FK FOREIGN KEY (id) REFERENCES Utilisateur(id)
	,CONSTRAINT Vu_Message0_FK FOREIGN KEY (id_Message) REFERENCES Message(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Bloque
#------------------------------------------------------------

CREATE TABLE Bloque(
        id             Int NOT NULL ,
        id_Utilisateur Int NOT NULL
	,CONSTRAINT Bloque_PK PRIMARY KEY (id,id_Utilisateur)

	,CONSTRAINT Bloque_Utilisateur_FK FOREIGN KEY (id) REFERENCES Utilisateur(id)
	,CONSTRAINT Bloque_Utilisateur0_FK FOREIGN KEY (id_Utilisateur) REFERENCES Utilisateur(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Signale
#------------------------------------------------------------

CREATE TABLE Signale(
        id             Int NOT NULL ,
        id_Utilisateur Int NOT NULL ,
        raison         Text NOT NULL
	,CONSTRAINT Signale_PK PRIMARY KEY (id,id_Utilisateur)

	,CONSTRAINT Signale_Utilisateur_FK FOREIGN KEY (id) REFERENCES Utilisateur(id)
	,CONSTRAINT Signale_Utilisateur0_FK FOREIGN KEY (id_Utilisateur) REFERENCES Utilisateur(id)
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: Notification
#------------------------------------------------------------

CREATE TABLE Notification(
        id         Int NOT NULL ,
        id_Message Int NOT NULL
	,CONSTRAINT Notification_PK PRIMARY KEY (id,id_Message)

	,CONSTRAINT Notification_Utilisateur_FK FOREIGN KEY (id) REFERENCES Utilisateur(id)
	,CONSTRAINT Notification_Message0_FK FOREIGN KEY (id_Message) REFERENCES Message(id)
)ENGINE=InnoDB;

