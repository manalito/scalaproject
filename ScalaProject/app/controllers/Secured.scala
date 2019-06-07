package controllers

import play.api.mvc._
import repository.UserRepository

import scala.concurrent.{ExecutionContext, Future}
import scala.concurrent.ExecutionContext.Implicits.global

case class Secured[A](action: Action[A]) extends Action[A] {

  private val repository: UserRepository = UserRepository

  override def apply(request: Request[A]): Future[Result] = request.session.get("user").map(repository.isLoggedIn) match {
    case None => Future(Results.Redirect("/login"))
    case Some(r) if r => action(request)
    case Some(r) if !r => Future(Results.Redirect("/login"))
  }

  override def parser: BodyParser[A] = action.parser

  override def executionContext: ExecutionContext = ???
}
