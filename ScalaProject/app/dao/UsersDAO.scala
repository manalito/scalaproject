package dao

import scala.concurrent.Future
import javax.inject.{Inject, Singleton}
import models.{Media, User}
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile

import scala.concurrent.ExecutionContext

trait UsersComponent {
  self: HasDatabaseConfigProvider[JdbcProfile] =>

  import profile.api._

  // This class convert the database's courses table in a object-oriented entity: the Course model.
  class UsersTable(tag: Tag) extends Table[User](tag, "User") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc) // Primary key, auto-incremented
    def username = column[String]("username")
    def password = column[String]("password")
    def time_movies = column[Long]("time_movies")
    def time_series = column[Long]("time_series")
    def time_total = column[Long]("time_total")

    // Map the attributes with the model; the ID is optional.
    def * = (id.?, username, password, time_movies, time_series, time_total) <> (User.tupled, User.unapply)
  }

}

// This class contains the object-oriented list of courses and offers methods to query the data.
// A DatabaseConfigProvider is injected through dependency injection; it provides a Slick type bundling a database and
// driver. The class extends the courses' query table and loads the JDBC profile configured in the application's
// configuration file.
@Singleton
class UsersDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext)
   extends UsersComponent with MediasComponent with UsersMediasComponent with HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  // Get the object-oriented list of courses directly from the query table.
  val users = TableQuery[UsersTable]
  val medias = TableQuery[MediasTable]
  val usersMedias = TableQuery[UsersMediasTable]

  /** Retrieve the list of courses sorted by name */
  def list(): Future[Seq[User]] = {
    val query = users.sortBy(s => s.username)
    db.run(query.result)
  }

  /** Retrieve the names of the users only */
  def namesList(): Future[Seq[String]] = {
    val query = for {
      user <- users
    } yield user.username

    db.run(query.result)
  }

  /** Retrieve a user from the id. */
  def findById(id: Long): Future[Option[User]] =
    db.run(users.filter(_.id === id).result.headOption)

  /** Retrieve a user from the username. */
  def findByUsername(username: String): Future[Option[User]] =
    db.run(users.filter(_.username === username).result.headOption)

  /** Get the Medias associated with the given user's ID. */
  def getMediasOfUser(id: Long): Future[Seq[Media]] = {
    val query = for {
      userMedias <- usersMedias
      media <- medias if userMedias.mediaId === media.id
    } yield media

    db.run(query.result)
  }

  /** Insert a new user, then return it. */
  def insert(user: User): Future[User] = {
    val insertQuery = users returning users.map(_.id) into ((user, id) => user.copy(Some(id)))
    db.run(insertQuery += user)
  }

  /** Update a user, then return an integer that indicates if the course was found (1) or not (0). */
  def update(id: Long, user: User): Future[Int] = {
    val courseToUpdate: User = user.copy(Some(id))
    db.run(users.filter(_.id === id).update(courseToUpdate))
  }

  /** Delete a user, then return an integer that indicates if the course was found (1) or not (0) */
  def delete(id: Long): Future[Int] =
    db.run(users.filter(_.id === id).delete)
}