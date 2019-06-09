package controllers

import dao.UsersDAO
import javax.inject._
import models.User
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
          case Some(user) => user.id match {
            case Some(id) => Ok.withCookies(Cookie("walidb", String.valueOf(id)))
          }
          case None => NotFound
        }
    }

  def logout = ???

  def register: Action[JsValue] = Action.async(parse.json) {
    request =>
      val username = (request.body \ "username").as[String]
      val password = (request.body \ "password").as[String]

      usersDAO.findByUsername(username).map{
        case Some(_) => Status(303)
        case None => usersDAO.insert(User(None, username, password))
          Ok
      }
  }
}
