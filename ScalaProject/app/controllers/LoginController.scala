package controllers

import play.api.libs.json.Json
import dao.UsersDAO
import models.User
import play.mvc.Controller
import play.api.mvc.{AbstractController, Action}
import javax.inject.{Inject, Singleton}
import models.Media
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._
import play.api.libs.json._
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.None
import scala.concurrent.ExecutionContext.Implicits.global

@Singleton
class LoginController @Inject()(cc: ControllerComponents, usersDAO: UsersDAO) extends AbstractController(cc){


  implicit val jsonToUser: Reads[User] = (
      (JsPath \ "username").read[String](minLength[String](1) keepAnd maxLength[String](44)) and
      (JsPath \ "password").read[String]
    ) (User.apply _)

  def validateJson[A: Reads] = parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  def login(username: String, password: String) = Action.async(validateJson[User]) { request =>
    val user = request.body
    val authentication = usersDAO.authenticate(username,password)
    authentication.map {
      case true =>
      Ok(
        Json.obj(
          "status" -> "OK",
        )
      )
      case false =>
      NotFound (Json.obj(
          "status" -> "Not Found",
      ))}
  }


  def logout = Action { implicit request =>
    repository.lo(request.session.get("user").get)
    Redirect("/login") withNewSession
  }
}
