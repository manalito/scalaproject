package security
import java.security.MessageDigest

class SecurityFilter {

  val digest = MessageDigest.getInstance("SHA-256")

  def hashPassword(password:String):String = {
    new String(MessageDigest.getInstance("SHA-256").digest("some string".getBytes("UTF-8")))
  }

  /**
    *
    * 1. compare password with hashed stored password
    * 2. login REACT
    * 3. envoi de l'username a la database, une fois ok il ajoute l'utilisateur
    * 4. verify login username is unique in database
    * 5. logged user
  **/
}
