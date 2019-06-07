package repository

import java.util.Date

import models.{User, Session}
import play.api.Play
import play.api.Play.current

import scala.collection.concurrent.TrieMap

/**
  * Created by svinci on 06/12/15.
  */
trait SessionRepository {
  def isLoggedIn(name: String): Boolean
  def login(user: User): Unit
  def logout(name: String): Unit
}
object SessionRepository extends SessionRepository{

  private val repo: TrieMap[String, Session] = TrieMap()
  private val ttl: Long = Play.unsafeApplication.configuration.getLong("user.inactivity.max").get

  def isLoggedIn(name: String): Boolean = {
    val maybeSession: Option[Session] = repo.get(name)
    val result = maybeSession.exists(s => {
      val now: Long = new Date().getTime
      val lastSeen: Long = s.lastSeen.getTime
      now - lastSeen < ttl
    })
    if (result) { repo.put(name, maybeSession.get.copy(lastSeen = new Date())) }
    result
  }
  def login(user: User): Unit = {
    isLoggedIn(user.username) match {
      case true => throw new IllegalArgumentException("user is already logged in")
      case false =>
        val now: Date = new Date()
        repo.put(user.username, Session(user, now, now))
    }
  }

  def logout(name: String): Unit = repo.remove(name)

}
