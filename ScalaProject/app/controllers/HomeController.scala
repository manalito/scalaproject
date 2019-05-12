package controllers

import dao.UsersDAO
import javax.inject._
import play.api.mvc._
import play.api.routing.JavaScriptReverseRouter
import scala.concurrent.ExecutionContext.Implicits.global

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents, usersDAO: UsersDAO) extends AbstractController(cc) {

  val title = "WaliDB 2019 !"

  def javascriptRoutes = Action { implicit request =>
    Ok(
      JavaScriptReverseRouter("jsRoutes")(
        routes.javascript.UsersController.getUsers,
        routes.javascript.UsersController.createUser,
        routes.javascript.UsersController.getUser,
        routes.javascript.UsersController.updateUser,
        routes.javascript.UsersController.deleteUser
      )
    ).as("text/javascript")
  }
  /**
    * Create an Action to render an HTML page with a welcome message.
    * The configuration in the `routes` file means that this method
    * will be called when the application receives a `GET` request with
    * a path of `/`.
    */
  def index = Action.async { implicit request =>
    val usersList = usersDAO.list()

    // Wait for the promises to resolve, then return the list of students and courses.
    for {
      users <- usersList
    } yield Ok(views.html.index(title, users))
  }

}
