package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext

class FilmsController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc) {


  def films = Action {
    Ok(views.html.films("Walid Koubaa"))
  }
}
