import { Strategy } from 'passport-local'
import { validatePassword } from '../helpers/paswordUtil'
import Usuario from '../model/Usuario'


function AunthPassport(passport) {
  passport.use(
    new Strategy((username, password, done) => {
      //console.log("verification function executed")
      Usuario.findOne({ username: username }, (err, usuario) => {
        if (err) {
          //console.log("error fetchin data")
          throw err

        }
        if (!usuario) {
          //console.log("no user found")
          return done(null, false)
        }
        const compareHash = validatePassword(password, usuario.hash, usuario.salt)
        //console.log("comparison function executed")
        if (compareHash === true) {
          //console.log("done callback for correct credentials")
          return done(null, usuario)
        } else {
          //console.log("done callback for incorrect credentials")
          return done(null, false)
        }

      })

    })
  );

  passport.serializeUser((user, done) => {
    //console.log("serializing user")
    done(null, user._id)
  })
  passport.deserializeUser((id, done) => {
    //console.log("deserializing user")
    Usuario.findById(id, (err, user) => {
      done(err, user)
    })

  })
}

export default AunthPassport