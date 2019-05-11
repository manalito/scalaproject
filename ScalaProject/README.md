# Scala project

## Configuration MySQL

	$ sudo mysql
	# ou mysql -u root -p
	
	mysql> CREATE USER scala;
	
	mysql> CREATE DATABASE scala_project_sql
	
	mysql> GRANT ALL ON scala_project_sql.* TO 'scala'@'localhost';
	
	mysql> exit;
	
	# Se rendre dans le dossier sql
	# Commande ici depuis la racine du repo
	$ cd ScalaProject/sql
	
	# Création et population des tables
	$ mysql --user="scala" --database="scala_project_sql" --password="alacS2019+" < "script.sql"