import sbt.Resolver

name := "ScalaProject"
 
version := "1.0" 
      
lazy val root = (project in file(".")).enablePlugins(PlayScala).settings(
   watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

resolvers += Resolver.sonatypeRepo("snapshots")
      
scalaVersion := "2.12.8"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice )

libraryDependencies += "com.typesafe.play" %% "play-slick" % "4.0.0" // Slick
libraryDependencies += "mysql" % "mysql-connector-java" % "5.1.45" // Connecteur MySQL

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  

      