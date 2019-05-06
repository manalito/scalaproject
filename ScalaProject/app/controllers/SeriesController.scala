package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext

class SeriesController @Inject()(cc: ControllerComponents, actorSystem: ActorSystem)(implicit exec: ExecutionContext) extends AbstractController(cc){


  def seriesHeader = Action {
    Ok(views.html.series("Walid Koubaa"))
  }

  def showSeries = Action {
    Ok(views.html.series("Here is all the series available"))
    // TODO list all series available
  }
}
