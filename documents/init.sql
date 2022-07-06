-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 06 juil. 2022 à 16:45
-- Version du serveur : 5.7.36
-- Version de PHP : 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ma_voiture_gene`
--

-- --------------------------------------------------------

--
-- Structure de la table `bloque`
--

DROP TABLE IF EXISTS `bloque`;
CREATE TABLE IF NOT EXISTS `bloque` (
  `id` int(11) NOT NULL,
  `id_Utilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_Utilisateur`),
  KEY `Bloque_Utilisateur0_FK` (`id_Utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
CREATE TABLE IF NOT EXISTS `conversation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cree_le` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `exemple`
--

DROP TABLE IF EXISTS `exemple`;
CREATE TABLE IF NOT EXISTS `exemple` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenu` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `exemple`
--

INSERT INTO `exemple` (`id`, `contenu`) VALUES
(1, 'Hello, ta voiture est mal garée !'),
(2, 'Bonjour, ta voiture gène !'),
(3, 'Salut, tu as un pneu crevé !'),
(4, 'Attention, tu t\'es fait vandalisé ! '),
(5, 'Tes feux sont allumés !'),
(6, 'Tu as tes fenêtres ouvertes !'),
(7, 'OK merci !'),
(8, 'J\'arrive !'),
(9, 'Pas de soucis !'),
(10, 'Je ne peux pas venir désolé.');

-- --------------------------------------------------------

--
-- Structure de la table `membre`
--

DROP TABLE IF EXISTS `membre`;
CREATE TABLE IF NOT EXISTS `membre` (
  `id` int(11) NOT NULL,
  `id_Conversation` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_Conversation`),
  KEY `Membre_Conversation0_FK` (`id_Conversation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contenu` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `envoye_le` datetime NOT NULL,
  `id_Conversation` int(11) NOT NULL,
  `id_Utilisateur` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_Conversation_FK` (`id_Conversation`),
  KEY `Message_Utilisateur0_FK` (`id_Utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `id` int(11) NOT NULL,
  `id_Message` int(11) NOT NULL,
  PRIMARY KEY (`id`,`id_Message`),
  KEY `Notification_Message0_FK` (`id_Message`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `plaque`
--

DROP TABLE IF EXISTS `plaque`;
CREATE TABLE IF NOT EXISTS `plaque` (
  `numero` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `Plaque_Utilisateur_FK` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `plaque`
--

INSERT INTO `plaque` (`numero`, `id`) VALUES
('FA-235-FB', 1),
('AB-123-CD', 2);

-- --------------------------------------------------------

--
-- Structure de la table `signale`
--

DROP TABLE IF EXISTS `signale`;
CREATE TABLE IF NOT EXISTS `signale` (
  `id` int(11) NOT NULL,
  `id_Utilisateur` int(11) NOT NULL,
  `raison` text NOT NULL,
  PRIMARY KEY (`id`,`id_Utilisateur`),
  KEY `Signale_Utilisateur0_FK` (`id_Utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mot_de_passe` varchar(500) NOT NULL,
  `sel` varchar(50) NOT NULL,
  `jeton` varchar(500) DEFAULT NULL,
  `derniere_connexion` datetime DEFAULT NULL,
  `theme` varchar(50) DEFAULT NULL,
  `photo` longblob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `nom`, `prenom`, `email`, `mot_de_passe`, `sel`, `jeton`, `derniere_connexion`, `theme`, `photo`) VALUES
(1, 'Bustos', 'Thibault ', 'thibault.bustos1234@gmail.com', 'e5b856f1c9f972dfbc467ca30c6dc0494a9c570f4d24eb56914639844c8171a3', 'zMDGTykx3Q', '817a2eb4a1ede805949b9efc2ad8b061b56bb290b8a714892b4ec74d7461607e8f4a80c11da95952e394791bb8b1dbf840fb04a74cc362bfdadadd6db829e50f8f233c593ca840746416977c7225a14de4917835684edb1a24fe7a612774498aacc2f2ec', '2022-07-06 18:19:42', NULL, 0x89504e470d0a1a0a0000000d494844520000013e0000013e080600000014387c30000016ee49444154789cedddeb72e3380e8661656beeff96b33fa6b8cb46f3008a0780c2fb544d49b12d8962ac2f2065f7fc3ccff3fb004020ffb16e00009c46f0010887e003100ec107201c820f4038041f8070083e00e1107c00c221f8008443f0010887e003100ec107201c820f4038041f8070083e00e1107c00c221f8008443f0010887e003100ec107201c820f4038041f8070083e00e1107c00c221f8008443f0010887e003100ec107201c820f4038041f8070083e00e1107c00c221f870c4efefeff3fbfb6bdd0ce0791e820f40403fcff3f067185b952abd9f9f1f839600fffac7ba01f8b6147a041d3c61a80b201c86bad84e0e75a9fe608de0c3510c7de101435d00e17073035b7147171e31d4c5110c71e109435d00e150f10108878a0fff1b86d6961eb66f7dd7b7b7bdf5f9c11f822f90d285fafbfbfbfcfcfc54979a7df6b6cf434b06d8eee38fec7f47ffe4fbe11f6af083e00ba276c1f5c2a1e7c4f6adca6f26f4e47e779c5fbeeffc0f016c31c7f701b50bab747196aa9cdd1557cd4838d5da325bf19de81fb95fee70dba3e2fb80d290323df6f3f3d3bcc0b415576db83a329c2cadefae1835cbd9fec17df800f3e56a179fb6aa18adb84a3f9f9c2394e7b4728eef6dfb701f2abecbd52a965e2593bfcefb1c5f3a97d21cd9ca61ee8ef393a8127d20f83e400644fe9866db53737ca5f513c7f752f1117a7e70732388d6d0f74d65343adc4cdb94da315a51c97358117e33fd936f5f6b5fef1c7016737c1f272fba37737432a4e4fe4e5454b5609a0dbd15fdd3d3ea3fd8a0e2832a145a95d189f09bad584f0ce77bfb92a147d56787e00b6e7418f73ce7436f667bebf6c1276e6e5c2005cf8ea57618980f7b47b75f71fcdafa8a61ee8af6e12e049f732be6b06e5f3ecfdf374646c269e7127722f89cb30e1d2fcbbc2f3cf50beec41c9f731e2e6e0f1555fe7369ddba7db80bc17701eb8bdbbaa26a059e87fec17d083ee7ac2f6aeb65de07a5f5e7b11df6e24e04df05acc3c77a99f7815cf7d03fb80f37379cb3bea83d2c9f87bbba588be073ce3a74bc2cf3bef0d42fb813435de73c5cdc1e2aaafce7d2ba75fb701782ef02d617b77545d50a3c0ffd83fb107cce595fd4d6cbbc0f4aebcfc35d5d8c638ecf390fe13372f1cbc757547c49e9f1ddc7efed3fb5abb5843f04df01bfbff5ffafac665b0fe1d60ba7dafa178e3fb37ff844f039e56118b7221cbe72fcb7fb874fccf16dd67af3d72a829b422f6f73fab9b47eebf167f70f9f08be036a1543efb5f9631e42ae5509e5edacaddf78fc55fb4f34ef01ec47f01da00dbedb424f1308f979df78fc15fbcf7fa7849e0fccf13951bb203c849be6a2aeaddf7efcd9fdc327826fb3fccddf5baf5581d6e136130e5f38feccfee113c1b759fee62fadf7863ed6a1361b0e5f39feccfed3ef990ad00f82cf815665e021d47a17b565f8ed3efeecfed3ebd27ff0819b1b17b00e374d2594b7b3b67ee3f167f79fe4afcd7f860d82cf390fe1a619c6d5d69f27f65dddfc7509a1678fa1ae03e9c2282d3d849ba6a291ed4db4e1527a7dfab9f57cfe5869ddfafcf273c8db035b04df41a537bc87f0b25e3e4ffbaee9ecf39ecf0f3608be436a6f74eb8bd2cb32ef8b52bfcc3e6fbdacb58f00b4c11cdf66f28d9d863df9f3d617a5e552f6835c9f7ddefbf9e5418873a8f836fbf9697f8cc143f8582e5bd5d0f3cc0f75bd9f9f0c409c41f019f3103e964b6d60bd7ddefbf9a5f5f45ec0190c750f690d69ac2f4eeb65de07725df6d19be76f38bfde7b046b51f119b3be283d2c9f87bbbae9f1fc9cb00fc167ccfaa2f4b2ccfba2d42fb3cf5b2f6bed2bbd1f9e87f0db8da1ee66b537b01cf6445de6fd24fb44f6e39be76f39bfd2fba6f71abc47f039607d717aa884f27e28f5c9dbe7adfbb7777eb041f019f3103ed615d16cb8b59e7f1edb61afe6fc701ec1f711b2baf0644578ccec7fd5393ccffbfef5fcfb89e81feb06a03c0fb8f202e9ed7ff6f8aded57865eeb31edf69a737fd307b80b159f91da3c507a4e3ed6db97541aee95f63f7b7ccdf6ab868bb53669c34f7baea5f64babfe30c006159f815695f1765f5e2e24796e2be6ca7ac7db39cc6588fb4d04df61bdcae5c4b1df3eff66ff2b6f1094ccce11ae0cc795fbc45e7c80f9a01d7ffdf36048ff591a9d833b7963e3e7a7ffffbd90bfa35effe6af2f85b4b7df0ffe45f01db273c8932eba5e75b4d34c45f67698abd9bf6c636b9fb5df91a67f5bfbf6f0fbc19f18ea1ea00dbddd43a4ddc77f73e3e164c5d7db4fed1c3418dede85e0db6cf7e4f6a93b86a5e19be698abe6f86a5684a7f6bc7be79abf7ef48e70af7fb1161f67d94c73f1ad08afd19b26a58f6fb48edfba305bdbefbaababdd7fa99dad3eaaf5fb48ffceecbff51aac43f07dc4ceca72c5473a6e18eef68ef13c7b3ed6b27b5480bf117cd8ea0ba187ef21f8608ef0c269dcdcc090d1b9b0d64737de547cb5e3335cc4083ec707b599cf9fc9cfb2e58f8f7c0eafd72e3e23070d2a3ea86803e5cddd684dc547a061252a3e74698691e99b0bf21b0ca52a2fa7a9f818c66235820f4d23df3ad1de85cdf7a7fd1c5f2f3c4beb400dc1071559c9bd197a96424c3bc7b7e2f840c21c1f9a56dd3d6ddd8d5d7157974a0f23a8f860eacdd7d54a644508b4107c502b0d356703e7cd776de53a308a6f6e604aed03cb23434fbeb981d3083e4cd3fceb24ad6d093d9c46f0010887bbba934a43bb681fb8cdcff7cd77754baf8fd277b0c1cd8d45e4b70cf0a7da7775d1c6fb690f826fa1886fd2da9dd6957d51faf072a4be8e74aea7107c9852fbba585a5f51e5e5c3e0684361cd9401c6117c8be4173aea6470f542ad56dd45aafa08bff508be8508bd36cdd7cd4acf95fa35da7c21e1b716c18729da39be99216abe6de400887ceeab117c98d29be35b750cb9ef48d55e8ef05b83e08339be833b266ae8afc43737008443c507201c82ef00f9ad8edbbee531db7ecdf60c77711243ddc546ff9f121ef4be6b3bf32f246bfe9f1af2b5a5f59c977edb21da07b4ad50f12d54aa5456fd0bc35646daffe6fc65d8caf5481f65f9ea797944f02d527bd37aaff87ac34d6dfb67cebf157e51107a67117c0bb42e54ef159fe6bbb6bdf6cf9c7fabda8b2262d05b23f826f5deb4de2bbe9e9161ea9bed7b43ddd27779bf84d0b3c1cd8d49ad8bf1961b1cbd61e6db8a75e4fc6bebb5767e85e6fd83f508bec56ebbabdbbbf03cdcd5adedfb8b229ca3070c75378b30c7d7dbffcc5ddd8440c04a04df42337745bd1a69ffdbf3efddd5f5f007e284da1d76acc750f78048e137bafdf3fc3d2c96ebc06a547c9b117a737775811d08be456a1fb7f03ec7d7a3697f6b990f674b4bcdbae638ad655abfa1bf7106ff5fddcdb4773373a72bc15a60a7e7b437285a15a1f6e6c4dbbbc29e2bead6fc256c50f12dd0aa2c7a17677e21584ce6cbe3cb36cc844eadf2eab525b7e3f8547ea0e29bd4fb0baebd38bd3a5571d5fa61f6f8d615562df43d55a411117c9bad08bd520599d647b76f6db7a3e2d2de0091e7b6eaf8d65a376f12eba98e8808be4972c89a1e4bb4737cad8a27dfe7dbd093c71ad97e36f45a61bda2621eeddf56e8e44e04d0ecef07ef107c0bc80ba974d1b7966f436dc4dbeae744c5576a5fde37b3c7effd7e3cf0509d4642f06db66a0e6c96e658a5d7ac0abddaf17b15e089d0dd493bc7e7a1ad91107c936af362f9ba763826b7cdb75f55118c5695ab2abeb7d5ec8e39bed37f707a737cb99d553ffe8fafac2dd29ac3d28642697bed7134dbd48ed10aef551597a6dda5769e3cfe2ebde0ebfd7eb01ec1b748ebc29a198e95867eb5e3ec623ddcb4ac38f14d04df663b26fe09bd7be6f8e013dfdcd84c3307d55ba6fde4fbd36c37b2ff56fb6796b3561dbf769321ff7966595bcf8fa1e96f9c41f02d547a73cf562cbb97b2ddad0bd4fae27d73fcdafc5a7ebeb3fdd8da3f7c22f836f3106ebd8bf6cb7ae1b433f4e4fc625a8fd0efdef17196cd3c849b36fce4fa57e6c8f2f3adadcf56ccf971e47afa197e50f16d661d6ada8b37b5b5b4ee5daaa24ad594a62a9be9bf1543dd56fbb107777537b30eb5998ae506b56165de7e79aeb5f3de31eccd8f93c8b6f5da8ff5a8f8162afdc5f6106e9a61eedbf33ba975fcd673ad60da197af238b520ecb51feb31c7b7998770d3869f5cbfa9eaa8b5359d477ece3bfa6f66a8db6a3ff6a0e2dbcc3ad4b4c3ddd4d6d2fa4d64e5d40ba7dd955e6a4fdeae56df52f99d41f06d661d6adad0bb553e7cac05cbcef0d3ecbbf50745d37eacc7cd8d03acc3edebe1d7929f636f7d669aa01580e918f9cfb045f06d661d6a91432f6905def3ecbfab0b7f08be0fd0845b6dfd163361c21f0f48ccf16d2627ab574f5ebfad4456b6c15aead352dfde167aabdf1f2823f82e37330cbbe5226bfde1c8cf470e61d3e33bc36fd779622f82ef729a8a443bf1ee910cb63ce0b4dbdf50f179fe1d7c11c1e7406ba8269fcf7f7e9e7e45d31beade107e334e547cbddf5fcfccfc25dee1e6c601f262c8dfe0b5001af9f9ed8d0db92edbe645abff4acfe7afd95df1f57e3fda73bbe1f7f02504df21b53774ad42d0065f7aec6df869dae849ab8dad3e3e3dc7371a7c33fbc038beabebc4db37b9f622adadcb36a4e1da572ebad315dfa8da1fc2aff4bf57ccf13923e789f22aad36a41bb9384beb727fe978a5769d9e0b2ccd9f8d547b2742afd45ef8c650f780d139aad65ffb37737cf9ebe47aeb38a5b9c85efb76d1845ee9f9dd159f3c7ead8d23e738bb1ff4117ccecdcef1c96d47c2afd6060b336d38117e3bdb8ff508be0bb42a016d45321b7eb7f2147acf43f079c11cdf05d20d89f49f7caeb5ccd5e6a6d2cfb5654f6ffbd9fdcf1c5f1b5e6f971ab5df1dec7057f702ad9b10a5e7472ac2d98a66d50d82de50be76feab8f2fdbd00a676dffcc6c8f3da8f89ccb2fc2bc6a90c3a7da45b422145a76efbf77feab8edfab4267ab36aa3e5f08be8ff35ef1793abf55436ff8c750f700599d958652b202a9cdd18d9aad887ae1b4bbe2eb9dff898a7606159e4f547c9bc9a19a9c53927355a5a1ececf13d577cf9f996e6db4e9d9ffc7db48e37dac695db630d82efe36e98e32b0590c5f9117a7130d4bdc89b0bc67bc5377bfeb3c7d756d684deb750f16d561aca9d3efe8a5048ed2f5549a7e6f8769e1f62a1e23b20ff2bdfbad8f2e7f239a75ae0d4f699571737547c3260e5d0b775fea72a3e7c0b5f59db4c0e714a439eddc3a055e1506bdfc9e1aec7e3e33e04df0123d5daea0bf1868acff3f9e19b08be0b585fdc2b2a466d45591aa65bb71fdfc31c9f73abe7d092d2055dbad02d432f6f43afed3bfb4feeafd486bc8d84a57f547c17980d95e7e9cf29b6e6f1ac424faef7dab9a3ff6ad312b5be7bd33e9cc7c7599c3b314757aa08571dbfb7d4567ddabe92dbec083db9ffd4de7c39da769c45f039b7a2a24a4ac190c267d7f17bcb55a1b7b3ffa8e2be87e0736e77c5b7fbf89af6b5aabebc826a555df973f9cf2b87e3f80e82cfb995159fc5f147c3a51780e967d946f9bc0cd5d9fe2b856b0943dc3b7057d7b955a1f23c3eff473dbb87baab2be6560548e8dd83bbba87cc04d089d0eb5dd056959ea67d3bfb4f1eafd5b61c4363dfa8f89c5b71d196e6c7f2e7e4f1e4f33b2b3e794cb93e5bfded08bd7cbf795f95fa133e51f11d3053ada4ed570ed74e1f5f5b91f6aa3eabf68f1c2747d5e717c1e7dc97434f33ecb56e3fbe89e00ba03794b4361b3e3784dbca30c73ce6f83ea0342f977eeead9f6e63decef4b865e8b5fa411b52a57d1070bef139be00760e256be48d80fc78a5b9bdd150d26e3f32c798fe7b739e72fbd2f9a7756e80d823f83ecea2ea6b859e0c06eb8a6f35d9a7a560a41ab447f07d40e942d20e7b571bad26ad2bbe95414425770fe6f83e22bf78e5857c6aa8fb66bfb37370ab2bbed9be290da1e5f0968acf1ec1f771bda1eeea6aa7b73f1964b3c3d195e137137ada9b242904093f5b0c753feec450f76de8a5c73cccf1ada88209b37b50f105b073a8dbdb5769a897bfde53c5a739cfdab9d6f6530a7b02d21ec1f7712786ba9a704a4a773d3d547c6f69823d3f6f42cf07beb9f171bda1eec90bb1160edec36f455f117cbe107c1f27ef8e5a855e8df7d0c337117c203c100e77750f29cd037940e8212282ef803cf0bc85dfec5d51e046045f70547c8888e00b8e8a0f11117c07e49591b72a898a0f11117cc151f121223ece121c151f22a2e23bc4ebc759a8f81011c1171c151f2262a80bc20fe150f10547e8212282cf813457565beedc3e85d7dbe517ccf63feec3bfc7676cf7bf4e82b6d1fe4b6158ebdbd2f3a500e577638b8a6fb35ed5d01b4ece6e8fb691feebf567e9f93c08d37f9a7d612f82ef80d69b5c5371cc6e8f3a6dffbd09bd99d7612f826fb35e78696f20bcdd1e6d9afe7b33bc6dbd0ef608be035ae1a509bdd9ed51a7fd90f66ce825fc4e7ce0737c07d52e92d1e1d6dbed51f6b662eebda6f4bc264cb11fc177987cd3cfde5524f4e6ecbeab9b079f7c8cdf8f1d86ba8795defc2315c7ecf6f8d3a9fe23e47ca1e233a2995b6a5d2cb3dbe35f23fd571ab66a9e6ffd01830d82cf81d9f022fce6d07ff130d43546e8d9a2ff6222f88ccdce31dd32c797b7c553bbe44786e452437ede4f2ee10f43dd836af3465faef8f276b4d6250f6dd7f0deff2823f80e697d84e1ed876735db7bb8f83481a7f9bca257defb1f7f63a8bbd9ef6ffb1f1ad05c34b3dbef26cf51fe2c43bcf747e0261efa1fe308becd7e7e7e9a1780f62329b540f030c797b751865a2df04a6dbb2df49ec747ff631cc1674c137aadf0b3ae386a156d7abc55eddd3cb79758f73fde21f88c692b865af859571cb58a367f5c33d4bdb53ab2ee7fbc43f0191ba9184ae1e7a1e2c8834cb6f1cbd5def3f8e87f8ce3aeee216fefeab66e00c83ba55e2f3eeeeac21b826fb3d64d89f4fc9b8ba6b79db78bae167ee967c953db5b6ee97ffc89e07360f6e2f17cf1b5aa3debb6ade2b9ff51c61c9fb12f87def3b46f6c7c61f2df7bffa38ce033263fb22297cff3e74746e4ba76fb99656b7de41c6beb9ae3f7ccb46f86a6ffe10fc1e748e982d5544b290cf350cc9fd3cc05f63e92a139be5cd79ef36cc5db6b1f20117c4eb42e544d00953e4a92bf6677f8bda539ae66fb5dedc3377173c398bc387b1f5fa95dd832f4b4778db51557eb2645cdaa39cad239c9fd7ff5c609f6a0e23396576a25b3d5cc6ca5a7a934f36395d667da97ef4bb66745ff202682ef02dae16d6d8e7026fc760f2547c2576e7762288e6f22f89c1b9ddf4b3fcbed77ccedad184e6ac3b7b45d7a7c67fbf04d049f73b3d5ccee1b1b793b6aeb33ed937d201fa3dac31b04df0534154dadca990dbd5ef89d9ae393fbd6547b841f6a083e63720e4bfe3c5a7595f63f137abd36ac38ffdef17b18ea62141f67716ec53cdb8a4a2fdf8f5c5f718e6fc3afd6a695edd3206cef42c57701abd04b43ca9d43c9d98acfc3509721f57d083ee7f2e166695dbb7dfeb31cc6b69ecfc94a307f3c1f768fdcf81839bee61c4beb33edd33c2ffb9220f48fe0fb38edfc60ebf9b7373e561cdfc3f95bb61f7b107c1fa7b92bab79fe4de86986ca2786aa3bdbe761a88d71dcdc08a237f1dfbb49d09a83eb05c3ccf1579dfbeef659de58c1382abe0f48f356f9fc55fedcf3bc1faaf52a3eef434586ba2821f82e27876df963e9f199a19aa6e263a84bf8dd86a1eee56a17d7caa1dacc5c1f435d7844c5f711a97ac92bbfe7e1ae2e435d94107c1f23e7f9560de5de841e435dc2cf2b86ba1f202fb0d230ebed504d33c7c75097a1ee6d08be8fd306dac86b65a5f33ced6a67f6f8b3e7bfb37dbbdb8f3d18ea7edcec504d53f131d465a87b1b2a3e00e150f1010887e003100ec107209c7fac1b00ff5a776f811b117c68922147e8e10b18ea020887e003100e9fe34357e983b80c757133e6f8d095871cdf46c01730d44593fcd75e802f60a88b2ecdbffe02dc84e003100e435d00e1107c00c221f8008443f0010887e003100ec107201c820f4038041f8070083e00e1107c00c221f8008443f0010887e003100ec107201c820f4038041f8070083e00e1107c00c221f8008443f0010887e003100ec107201c820f4038041f8070083e00e1107c00c221f8008443f0010887e003100ec107201c820f4038041f8070fe0bfc98e653b0828e580000000049454e44ae426082),
(2, 'Test', 'Test', 'test@test.com', '562031f55db5c2aec14702d990f0986e93c90720befb0d5dac5ee016e3c4be81', 'PGRj8PTi51', 'f01a0abda2b92a81b0bc7a546466e3de1f288ab38220f519586d020acdc4a8e1d328681eb1dd6a4191f6fa813f85c9a0aee02c5eb433c8f76486dd4448286e40e1823a65d70411fd628f9800b89e47130bf3c22885a2141520e544127486759aa0e13ee1', '2022-07-06 18:40:08', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `vu`
--

DROP TABLE IF EXISTS `vu`;
CREATE TABLE IF NOT EXISTS `vu` (
  `id` int(11) NOT NULL,
  `id_Message` int(11) NOT NULL,
  `vu_le` datetime NOT NULL,
  PRIMARY KEY (`id`,`id_Message`),
  KEY `Vu_Message0_FK` (`id_Message`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `bloque`
--
ALTER TABLE `bloque`
  ADD CONSTRAINT `Bloque_Utilisateur0_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `Bloque_Utilisateur_FK` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `membre`
--
ALTER TABLE `membre`
  ADD CONSTRAINT `Membre_Conversation0_FK` FOREIGN KEY (`id_Conversation`) REFERENCES `conversation` (`id`),
  ADD CONSTRAINT `Membre_Utilisateur_FK` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `Message_Conversation_FK` FOREIGN KEY (`id_Conversation`) REFERENCES `conversation` (`id`),
  ADD CONSTRAINT `Message_Utilisateur0_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `Notification_Message0_FK` FOREIGN KEY (`id_Message`) REFERENCES `message` (`id`),
  ADD CONSTRAINT `Notification_Utilisateur_FK` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `plaque`
--
ALTER TABLE `plaque`
  ADD CONSTRAINT `Plaque_Utilisateur_FK` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `signale`
--
ALTER TABLE `signale`
  ADD CONSTRAINT `Signale_Utilisateur0_FK` FOREIGN KEY (`id_Utilisateur`) REFERENCES `utilisateur` (`id`),
  ADD CONSTRAINT `Signale_Utilisateur_FK` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Contraintes pour la table `vu`
--
ALTER TABLE `vu`
  ADD CONSTRAINT `Vu_Message0_FK` FOREIGN KEY (`id_Message`) REFERENCES `message` (`id`),
  ADD CONSTRAINT `Vu_Utilisateur_FK` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
