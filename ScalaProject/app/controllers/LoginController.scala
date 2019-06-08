package controllers

import dao.UsersDAO
import javax.inject._
import play.api.Logger
import play.api.libs.json.{JsResult, JsSuccess, JsValue, Json}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Cookie}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class LoginController @Inject()(cc: ControllerComponents, usersDAO: UsersDAO) extends AbstractController(cc) {

    def login(): Action[JsValue] = Action.async(parse.json) {
      request =>
        val username = (request.body \ "username").as[String]
        val password = (request.body \ "password").as[String]

        usersDAO.authenticate(username,password).map {
          case _ => Ok.withCookies(Cookie("walidb", username))
          case false => NotFound
        }
        //Future {Ok(Json.obj("username" -> username, "pw" -> password))}
    }
/*
  def login() = Action.async(parse.json) {
      request =>
      val logger: play.api.Logger = Logger(this.getClass)
      logger.error("aaaaaaaaaaaaaaaaaaaaaaah")
      Future {Ok(Json.obj("walidb" -> "iscool"))}
  }*/
}
