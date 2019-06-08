package controllers

import dao.MediasDAO
import javax.inject.{Inject, Singleton}
import models.Media
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._
import play.api.libs.json._
import play.api.mvc.{AbstractController, ControllerComponents}
import services.Omdb

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class MediasController @Inject()(cc: ControllerComponents, mediasDAO: MediasDAO, omdb: Omdb) extends AbstractController(cc) {

  // Refer to the MediasController class in order to have more explanations.
  implicit val mediaToJson: Writes[Media] = (
    (JsPath \ "id").write[Option[Long]] and
    (JsPath \ "imdb_id").write[String]
  )(unlift(Media.unapply))

  implicit val jsonToMedia: Reads[Media] = (
    (JsPath \ "id").readNullable[Long]  and
    (JsPath \ "imdb_id").read[String] (minLength[String](9) keepAnd maxLength[String](11))
  )(Media.apply _)

  def validateJson[A : Reads] = parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  def getMedias = Action.async {
    val mediasList = mediasDAO.list()
    mediasList map (c => Ok(Json.toJson(c)))
  }

  def createMedia = Action.async(validateJson[Media]) { request =>
    val media = request.body
    val createdMedia = mediasDAO.insert(media)

    createdMedia.map(c =>
      Ok(
        Json.obj(
          "status" -> "OK",
          "id" -> c.id,
          "message" -> ("Media '" + c.imdbId + "' saved.")
        )
      )
    )
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


}
