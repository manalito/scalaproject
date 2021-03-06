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

  // This class convert the database's usersMedias table in a object-oriented entity: the UserMedia model.
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

  // Get the object-oriented list of users-medias directly from the query table.
  val usersMedias = TableQuery[UsersMediasTable]

  /** Retrieve the list of usersMedias sorted by name */
  def list(): Future[Seq[UserMedia]] = {
    db.run(usersMedias.result)
  }

  /** Insert a new user, then return it. */
  def insert(userMedia: UserMedia): Future[UserMedia] = {
    val insertQuery = usersMedias returning usersMedias.map(_.id) into ((user, id) => user.copy(Some(id)))
    db.run(insertQuery += userMedia)
  }

  /** Insert a new userMedia if not exists then return it. */
  def insertIfNotExist(userMedia: UserMedia): Future[Any] = {

    /*def insertIfNotExistQuery(userMedia: UserMedia) = usersMedias.forceInsertQuery {
      val exists = (for (uM <- usersMedias if uM.userId === userMedia.userId.bind && uM.mediaId === userMedia.mediaId.bind) yield uM).exists

      val insert = (None, userMedia.userId, userMedia.mediaId) (UserMedia.apply _ tupled)
      //val insertQuery = usersMedias returning usersMedias.map(_.id) into ((user, id) => user.copy(Some(id)))
      for (uM <- Query(insert) if !exists) yield uM
    }*/

    val a =
       usersMedias.filter(uM => uM.userId === userMedia.userId && uM.mediaId === userMedia.mediaId ).exists.result.flatMap { exists =>
         if (!exists) {
           val userM = UserMedia(
             None,
             userMedia.userId,
             userMedia.mediaId
           )
           usersMedias += userM

         } else {
           DBIO.successful(userMedia) // no-op

         }
       }.transactionally

    db.run(a)


  }



  /** Retrieve a media from the userId and the mediaId. */
  def findByUserMediaId(userId: Long, mediaId: Long): Future[Option[UserMedia]] =
    db.run(usersMedias.filter(m => m.userId === userId && m.mediaId === mediaId).result.headOption)
}
