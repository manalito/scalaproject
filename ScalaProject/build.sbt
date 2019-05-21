import sbt.Resolver

name := "ScalaProject"
 
version := "1.0" 
      
lazy val root = (project in file(".")).enablePlugins(PlayScala).settings(
   watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"

resolvers += "Akka Snapshot Repository" at "http://repo.akka.io/snapshots/"
      
scalaVersion := "2.12.8"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice )

libraryDependencies += "com.typesafe.play" %% "play-slick" % "4.0.0" // Slick
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.45" // Connecteur MySQL 

      