package controllers

import dao.UsersDAO
import javax.inject._
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.ExecutionContext.Implicits.global

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents, usersDAO: UsersDAO) extends AbstractController(cc) {


  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }

}
