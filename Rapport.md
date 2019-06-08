# SCALA - Projet - WaliDB

*Auteurs : Siu Aurélien, Koubaa Walid, Gallay Romain*

## Concept

Notre but est d'offrir une application permettant de rechercher des films et de garder une trace sur les médias déjà visionnées. Ainsi un utilisateur peut se créer un compte en choisissant un pseudo et mot de passe pour ensuite se log sur le site. Il peut ensuite rechercher des films qui l'intéresse et les ajouter à sa liste lorsqu'il les a visionné. Le profile d'un utilisateur est accessible publiquement et montre les média déjà regardés ainsi que des statistiques montrant par exemple le nombre d'heures passées à visionner sa collection de films.

## Choix des technologie

Le backend est écrit en Scala en utilisant le framework Play 2.7. Nous avons choisi une base de donnée MySQL que nous accédons avec Slick. Cette base de donnée tourne sur un docker que nous lançons avec docker-compose. Enfin le frontend a été fait en React, une technologie que nous trouvons agréable à utiliser et qui offre des très bonnes performances.

## Implémentation

### Scala

Notre première reflection a concerné la séparation du backend en différentes catégories: Controllers, Services, Models et DAO.

Nous avons commencé par définir 

### Slick

TODO : refactor FrontendController in HomeController

### React

## Problèmes rencontrés

La principale difficulté de ce projet a été d'apprendre à utiliser le framework Play. En effet coder en Scala, comme nous l'avons appris durant la première partie du cours, est une chose, mais l'utiliser dans le cadre de Play nous a demandé un certain temps d'apprentissage pour se familiariser avec l'environnement. Cet apprentissage a principalement été en mode essai/erreur, en suivant des tutoriels sur le net et bien sur grâce à la documentation officielle.

Deux d'entre nous ont déjà eu l'occasion de travailler sur Spring et Spring Boot durant le cours d'AMT, mais le troisième a du découvrir les notions qui accompagnent ce type de framework, par exemple les injections de dépendances ou l'abstraction d'un certain nombre de concepts.

Nous avons eu un chapitre sur les Futures durant le cours. Néanmoins nous avons pu remarquer que leur utilisation n'était pas toujours simple, comme c'est par ailleurs souvent le cas avec l'asynchronisme en programmation. De plus l'utilisation des Futures en Scala diffère sensiblement de la gestion de l'asynchronisme en Javascript que nous avions pu expérimenter dans le cours de TWEB. Typiquement l'utilisation de callback et surtout d'async/await n'est en général pas conseillée alors qu'on les trouve fréquemment en Javascript.

Au départ avaient été prévu un certain nombre de fonctionnalités qui n'ont finalement pas vu le jour. Par exemple la possibilité d'avoir des séries en plus des films, celle des noter les medias ou encore des les ajouter en favoris. Cela n'aurait à priori pas posé de problèmes techniques particuliers mais nous avons vite réalisé que le temps que nous avions à disposition était réduit. Ainsi nous avons choisi d'assurer une application simple mais fonctionnelle plutôt que d'offrir des features mal inmplémentées et/ou buggées.