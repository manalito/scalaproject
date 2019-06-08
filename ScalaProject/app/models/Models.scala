package models

// Represent a database's User entry; the ID is optional because we don't necessary want to have it (for example when
// we create a new user).
case class User(id: Option[Long], username: String, password: String, time_movies: Long, time_series: Long, time_total: Long)

// Represent a database's media entry.
case class Media(id: Option[Long], imdbId: String)

// Represent a database's user <- > media entry.
case class UserMedia(id: Option[Long], user_id: Long, imdbId: String)
