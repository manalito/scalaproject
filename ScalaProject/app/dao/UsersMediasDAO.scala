package dao

import javax.inject.{Inject, Singleton}
import models.UserMedia
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile

import scala.concurrent.{ExecutionContext, Future}

// We use a trait component here in order to share the StudentsTable class with other DAO, thanks to the inheritance.
trait UsersMediasComponent extends UsersComponent with MediasComponent {
  self: HasDatabaseConfigProvider[JdbcProfile] =>

  import profile.api._

  // This class convert the database's students table in a object-oriented entity: the Student model.
  class UsersMediasTable(tag: Tag) extends Table[UserMedia](tag, "UsersMedias") {
    def id = column[Long]("ID", O.PrimaryKey, O.AutoInc) // Primary key, auto-incremented
    def userId = column[Long]("user_id")
    def mediaId = column[Long]("media_id")

    // Map the attributes with the model; the ID is optional.
    def * = (id.?, userId, mediaId) <> (UserMedia.tupled, UserMedia.unapply)
  }
}

@Singleton
class UsersMediasDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) extends UsersMediasComponent with HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  // Get the object-oriented list of courses-students directly from the query table.
  val coursesStudents = TableQuery[UsersMediasTable]

  /** Retrieve the list of courses sorted by name */
  def list(): Future[Seq[UserMedia]] = {
    db.run(coursesStudents.result)
  }
}
