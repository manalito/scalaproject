package controllers

import dao.{MediasDAO, UsersDAO, UsersMediasDAO}
import javax.inject.{Inject, Singleton}
import models.User
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._
import play.api.libs.json._
import play.api.mvc.{AbstractController, ControllerComponents}
import services.Omdb

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.{Await, Future}
import scala.util.{Failure, Success}

@Singleton
class UsersController @Inject()(cc: ControllerComponents, usersDAO: UsersDAO, mediasDAO: MediasDAO, usersMediasDAO: UsersMediasDAO, omdb: Omdb) extends AbstractController(cc) {

   // Refer to the UsersController class in order to have more explanations.
   implicit val userToJson: Writes[User] = (
      (JsPath \ "id").write[Option[Long]] and
         (JsPath \ "username").write[String] and
         (JsPath \ "password").write[String] and
         (JsPath \ "runtime").write[Long]
      ) (unlift(User.unapply))

   implicit val jsonToUser: Reads[User] = (
      (JsPath \ "id").readNullable[Long] and
         (JsPath \ "username").read[String](minLength[String](1) keepAnd maxLength[String](44)) and
         (JsPath \ "password").read[String] and
         (JsPath \ "runtime").read[Long]
      ) (User.apply _)

   def validateJson[A: Reads] = parse.json.validate(
      _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
   )

   def getUsers = Action.async {
      val usersList = usersDAO.list()
      usersList map (c => Ok(Json.toJson(c)))
   }

   def createUser = Action.async(validateJson[User]) { request =>
      val user = request.body
      val createdCourse = usersDAO.insert(user)

      createdCourse.map(c =>
         Ok(
            Json.obj(
               "status" -> "OK",
               "id" -> c.id,
               "message" -> ("User '" + c.username + "' saved.")
            )
         )
      )
   }

   def getUser(userId: Long) = Action.async {
      for {
         userOption <- usersDAO.findById(userId)
         movieSeq <- usersDAO.getMediasOfUser(userId)
      } yield (userOption, movieSeq) match {
         case (Some(user), _) =>
            Ok(Json.obj(
            "username" -> user.username,
            "runtime" -> user.runtime,
            "movieList" -> movieSeq
         ))
         case _ => NotFound
      }
   }

   def updateUser(userId: Long) = Action.async(validateJson[User]) { request =>
      val newUser = request.body
      usersDAO.update(userId, newUser).map {
         case 1 => Ok(
            Json.obj(
               "status" -> "OK",
               "message" -> ("User '" + newUser.username + "' updated.")
            )
         )
         case 0 => NotFound(Json.obj(
            "status" -> "Not Found",
            "message" -> ("User #" + userId + " not found.")
         ))
      }
   }

   def deleteUser(userId: Long) = Action.async {
      usersDAO.delete(userId).map {
         case 1 => Ok(
            Json.obj(
               "status" -> "OK",
               "message" -> ("User #" + userId + " deleted.")
            )
         )
         case 0 => NotFound(Json.obj(
            "status" -> "Not Found",
            "message" -> ("User #" + userId + " not found.")
         ))
      }
   }

   def getStatistics(userId: Long) = Action.async {

      usersDAO.findById(userId).map{
         case Some(user) => Ok(Json.obj("runetime" -> user.runtime))
         case _ => NotFound
      }
   }

   def listMedias(userId: Long) = Action.async {
      for {
         u <- usersDAO.getMediasOfUser(userId)
      } yield u

      Future {Ok}
   }
}