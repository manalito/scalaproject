package controllers

import dao.{MediasDAO, UsersMediasDAO}
import javax.inject.{Inject, Singleton}
import models._
import play.api.db
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._
import play.api.libs.json._
import play.api.mvc.{AbstractController, Action, ControllerComponents}
import services.Omdb

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class MediasController @Inject()(cc: ControllerComponents, mediasDAO: MediasDAO, usersMediasDAO: UsersMediasDAO, omdb: Omdb) extends AbstractController(cc) {

  // Refer to the MediasController class in order to have more explanations.
  implicit val mediaToJson: Writes[Media] = (
    (JsPath \ "id").write[Option[Long]] and
    (JsPath \ "imdb_id").write[String]
  )(unlift(Media.unapply))

  implicit val jsonToMedia: Reads[Media] = (
    (JsPath \ "id").readNullable[Long]  and
    (JsPath \ "imdb_id").read[String] (minLength[String](9) keepAnd maxLength[String](11))
  )(Media.apply _)

  val keywordsPopularMovies = Array("harry", "avenger", "jones", "man", "bourne", "fast",
    "die", "evil", "matrix", "terminator", "pirate", "mission")

  def validateJson[A : Reads] = parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  def getMedias = Action.async {

    val mediasList = mediasDAO.list()
    mediasList map (c => Ok(Json.toJson(c)))
  }

  def createMedia = Action.async(validateJson[Media]) { request =>
    val media = request.body
    val userId = request.cookies.get("walidb") match {
      case Some(x) => java.lang.Long.valueOf(x.value)
    }

    mediasDAO.insertIfNotExist(media).map {
      case Some(m) => m.id match {
        case Some(id) => usersMediasDAO.insertIfNotExist(UserMedia(None, userId, id))
          Ok(Json.obj("status" -> "OK"))
        case _ => NotFound(Json.obj("status" -> "Error insert in Media table"))
      }
      case _ => NotFound(Json.obj("status" -> "Error insert in UserMedia table"))
    }

  }

  def getMedia(id: Long) = Action.async {
    val optionalMedia = mediasDAO.findById(id)

    optionalMedia.map {
      case Some(c) => Ok(Json.toJson(c))
      case None =>
        NotFound(Json.obj(
          "status" -> "Not Found",
          "message" -> ("Media #" + id + " not found.")
        ))
    }
  }

  def updateMedia(id: Long) = Action.async(validateJson[Media]) { request =>
    val newMedia = request.body

    mediasDAO.update(id, newMedia).map {
      case 1 => Ok(
        Json.obj(
          "status" -> "OK",
          "message" -> ("Media '" + newMedia.imdbId + "' updated.")
        )
      )
      case 0 => NotFound(Json.obj(
        "status" -> "Not Found",
        "message" -> ("Media #" + id + " not found.")
      ))
    }
  }

  def deleteMedia(mediaId: String) = Action.async {
    mediasDAO.delete(mediaId).map {
      case 1 => Ok(
        Json.obj(
          "status"  -> "OK",
          "message" -> ("Media #" + mediaId + " deleted.")
        )
      )
      case 0 => NotFound(Json.obj(
        "status" -> "Not Found",
        "message" -> ("Media #" + mediaId + " not found.")
      ))
    }
  }

  def searchMedia(search: String) = Action.async {
    omdb.searchMedia(search).map {
      e => Ok(Json.parse(e))
    }
  }

  def requestMedia(imdbId: String) = Action.async {
    omdb.requestMedia(imdbId).map {
      e => Ok(Json.parse(e))
    }
  }

  def randomMedias = Action.async {
    val index = scala.util.Random.nextInt(keywordsPopularMovies.length)
    omdb.searchMedia(keywordsPopularMovies(index)).map(movies =>
    Ok(Json.parse(movies)))
  }
}
