package services

import java.time.{Clock, Instant}

import javax.inject._
import play.api.Logger
import play.api.inject.ApplicationLifecycle
import dao.UsersDAO
import javax.inject.{Inject, Singleton}
import models.User
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._
import play.api.libs.json._
import play.api.libs.ws
import play.api.libs.ws.WSClient
import play.api.mvc.{AbstractController, ControllerComponents}

import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

@Singleton
class Omdb @Inject() (ws: WSClient) {
   val url = "https://www.omdbapi.com/?apikey=f59fab75"

   // TODO use futur to manage timeout
   //def searchMedia(media: String): Future[String] = scala.io.Source.fromURL(url + "&s=" + media)

   def searchMedia(media: String): Future[String] = {
      ws.url(url + "&s=" + media).get().map { response =>
         response.body
      }
   }

   def requestMedia(mediaId: String): Future[String] = {
      ws.url(url + "&i=" + mediaId).get().map { response =>
         response.body
      }
   }

   def getMediaDuration(mediaId: String): Future[Int] = {
      ws.url(url + "&i=" + mediaId).get().map { response =>
         Integer.valueOf((Json.parse(response.body) \ "Runtime").toString.split(' ')(0))
      }
   }
}
