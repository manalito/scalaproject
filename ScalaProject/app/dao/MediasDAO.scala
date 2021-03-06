package dao

import javax.inject.{Inject, Singleton}
import models.Media
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import scala.concurrent.duration._
import scala.concurrent.{Await, ExecutionContext, Future}

// We use a trait component here in order to share the MediasTable class with other DAO, thanks to the inheritance.
trait MediasComponent {
  self: HasDatabaseConfigProvider[JdbcProfile] =>

  import profile.api._

  // This class convert the database's medias table in a object-oriented entity: the Media model.
  class MediasTable(tag: Tag) extends Table[Media](tag, "Media") {
    def id = column[Option[Long]]("id", O.PrimaryKey, O.AutoInc) // Primary key
    def imdbId = column[String]("imdb_id")

    // Map the attributes with the model; the ID is optional.
    def * = (id, imdbId) <> (Media.tupled, Media.unapply)


  }
}

// This class contains the object-oriented list of medias and offers methods to query the data.
// A DatabaseConfigProvider is injected through dependency injection; it provides a Slick type bundling a database and
// driver. The class extends the students' query table and loads the JDBC profile configured in the application's
// configuration file.
@Singleton
class MediasDAO @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit executionContext: ExecutionContext) extends MediasComponent with HasDatabaseConfigProvider[JdbcProfile] {
  import profile.api._

  // Get the object-oriented list of medias directly from the query table.
  val medias = TableQuery[MediasTable]

  /** Retrieve the list of medias */
  def list(): Future[Seq[Media]] = {
    val query = medias.sortBy(s => s.id)
    db.run(query.result)
  }


  // TODO: use or remove

  /** Retrieve the names (first and last names) and the age of the students, whose age is inferior of the given one,
    * then sort the results by last name, then first name
  def findIfAgeIsInferior(age: Int): Future[Seq[(String, String, Int)]] = {
    val query = (for {
      student <- students
      if student.age < age
    } yield (student.firstName, student.lastName, student.age)).sortBy(s => (s._2, s._1))

    db.run(query.result)
  }*/

  /** Retrieve a media from the id. */
  def findById(id: Long): Future[Option[Media]] =
    db.run(medias.filter(_.id === id).result.headOption)

  /** Retrieve a media from the id. */
  def findByImdbId(imdbId: String): Future[Option[Media]] =
    db.run(medias.filter(_.imdbId === imdbId).result.headOption)

  /** Insert a new media, then return it. */
  def insert(media: Media): Future[Media] = {
    val insertQuery = medias returning medias.map(_.id) into ((media, id) => media.copy(id))

    db.run(insertQuery += media)
  }

  /** Insert a new userMedia if not exists then return it. */
  def insertIfNotExist(media: Media): Future[Option[Media]] = {

    /*val exists = (for (m <- medias if m.imdbId === media.imdbId.bind) yield m).exists
    val insertQuery = medias returning medias.map(_.id) into ((user, id) => user.copy(id))
    for (m <- Query(insertQuery) if !exists) yield m*/

    val a =
      medias.filter(m => m.imdbId === media.imdbId ).exists.result.flatMap { exists =>
        if (!exists) {
          val med = Media(
            None,
            media.imdbId
          )
          medias += med

        } else {
          DBIO.successful(None) // no-op

        }
      }.transactionally
    // TODO better handling of asynchronism
    Await.result(db.run(a), 50 milliseconds)
    findByImdbId(media.imdbId)

  }

  /** Update a media, then return an integer that indicate if the media was found (1) or not (0). */
  def update(id: Long, media: Media): Future[Int] = {
    val mediaToUpdate: Media = media.copy(Some(id))
    db.run(medias.filter(_.id === id).update(mediaToUpdate))
  }

  /** Delete a media, then return an integer that indicate if the media was found (1) or not (0). */
  def delete(imdbId: String): Future[Int] =
    db.run(medias.filter(_.imdbId === imdbId).delete)
}
