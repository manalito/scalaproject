package repository

import models.{User, UserTest}
import org.mindrot.jbcrypt.BCrypt

import scala.collection.concurrent.TrieMap

trait UserRepository {
  def create(name: String, password: String): User
  def login(name: String, password: String): Boolean
  def logout(name: String): Unit
  def isLoggedIn(name: String): Boolean

}

object UserRepository extends UserRepository {

  private val sessionRepository: SessionRepository = SessionRepository

  private val repo: TrieMap[String, User] = TrieMap()
  private val salt: String = BCrypt.gensalt()

  private def hash(v: String): String = BCrypt.hashpw(v, salt)

  private def compare(v: String, hashed: String): Boolean = hash(v) == hashed

  override def create(name: String, password: String): User = {
    repo.get(name) match {
      case Some(_) => throw new IllegalArgumentException("duplicated user name")
      case None =>
        //val user = UserTest(name, hash(password))
        //repo.put(name, user)
        //user
    }
  }

  override def isLoggedIn(name: String): Boolean = this.sessionRepository.isLoggedIn(name)

  override def logout(name: String): Unit = this.sessionRepository.logout(name)

  override def login(name: String, password: String): Boolean = repo.get(name) match {
    case None => false
    case Some(u) =>
      val pwdMatch = compare(password, u.password)
      if (pwdMatch) sessionRepository.login(u)
      pwdMatch
  }
}