package models

import java.util.Date

// Represent a database's User entry; the ID is optional because we don't necessary want to have it (for example when
// we create a new user).
case class User(id: Option[Long], username: String, password: String, time_movies: Long, time_series: Long, time_total: Long)

// Represent a database's media entry.
case class Media(id: Option[Long], ombd_id: String)

// Represent a database's user <- > media entry.
case class UserMedia(id: Option[Long], user_id: Long, media_id: Long)

case class UserTest(username: String, password: String)


case class Session(user: User, loggedIn: Date, lastSeen: Date)