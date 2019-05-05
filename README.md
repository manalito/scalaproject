# Scalaproject

> Auteurs : Gallay Romain, Koubaa Walid, Siu Aurélien
>
> Professeur : Nastaran Fatemi 
>
> Assistants : Santamaria Miguel  & Lovino Maxime Alexandre
>
> Date: 09/06/19

###Introduction:

Ce repository présente le projet du cours Scala, au sein de la Haute Ecole d'Ingénierie et de Gestion du canton de Vaud (HEIG-VD).

### Membres du groupe

- Gallay Romain
- Koubaa Walid
- Siu Aurélien

###Description du projet

Notre idée consiste en une **web app pour gérer ses séries/films préferées** (favoris/vu/non vu/…).

Un utilisateur s'identifie à l'application et peut sélectionner parmi une liste de séries et de films ceux qu'il préfèrent, les ajouter à ses favoris... L'utilisateur devrait pouvoir effectuer actions suivantes:

1. S'inscrire à l'application
2. Se connecter à l'application
3. Rechercher une série ou un film et obtenir des informations
4. Ajouter une série/film à ses favoris
5. Spécifier une note pour chaque série
6. Spécifier pour chaque épisode de série ainsi que pour chaque film sélectionné s'il l'a déjà vu ou non (vu, non vu).
7. Estimation du nombre d'heures passées à regarder des séries, des films ou les deux ensembles (statistique aussi disponible pour une série en particulier) (?)


Les élements ci-dessous sont à prévoir:

- Plateforme de login
- "Route" pour les films pour la page de profil
- "Route" pour les séries
- "Route" pour la page de profil
- "Route" pour la page de statistique

### Implémentation

Voic ci dessous les différents framework, outils et langage de programmation envisagés pour réaliser notre projet:

- **Backend**: *Slick, ScalaPlay*
- **Frontend** : *Javascript*, *HTML/CSS* et eventuellement *ScalaJS*
-  **Type de base de donnée**: 
	- Base de donnée relationnelle: *MySQL*
	utilisée pour stocker les informations des utilisateurs et leurs médias sélectionnés avec leurs états (vu, non vu, favoris,...)
- **Autres Framework/outils:** 
	- *Omdb Api*: api nous permettant de récupérer toutes les informations nécessaires sur les médias recherchés.


### Répartition des tâches

- Gallay Romain, Siu Aurélien -> Backend

-  Koubaa Walid -> Frontend

  Bien évidemment des interactions entre les différents membres du groupe seront nécessaires pour lier les differentes parties.