package controllers

import dao.UsersDAO
import javax.inject._
import play.api.http.HttpErrorHandler
import play.api.libs.json.Json
import play.api.mvc._
import play.api.Configuration

import scala.concurrent.ExecutionContext.Implicits.global

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(assets: Assets, errorHandler: HttpErrorHandler, config: Configuration, cc: ControllerComponents, usersDAO: UsersDAO) extends AbstractController(cc) {


  def appSummary = Action {
    Ok(Json.obj("content" -> "Scala Play React Seed"))
  }
  def index: Action[AnyContent] = assets.at("index.html")

  def assetOrDefault(resource: String): Action[AnyContent] = if (resource.startsWith(config.get[String]("apiPrefix"))){
    Action.async(r => errorHandler.onClientError(r, NOT_FOUND, "Not found"))
  } else {
    if (resource.contains(".")) assets.at(resource) else index
  }
}
