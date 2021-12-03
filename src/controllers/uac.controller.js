import { passwordGenerator } from "../helpers/paswordUtil";
import Usuario from "../model/Usuario";
import passport from 'passport'

export async function registerUser(req, res) {
  const { username, email, password } = req.body
  const { salt, hash } = passwordGenerator(password)
  const registerUser = new Usuario({ username, email, hash, salt })
  await registerUser.save().then((resp) => {
    if (resp) {
      return res.json({ status: "ok", message: resp })
    }
    throw new Error("Ha ocurrido un error: " + resp)
  }).catch(e => {
    res.status(400).json({ status: "fail", erros: e })
  })
}
export function loginUser(req, res, next) {
  // const { username: loginuser, password: loginpass } = req.body
  // const result = await Usuario.findOne({ username: loginuser })
  passport.authenticate("local", (err, user,) => {
    if (err) throw err;
    if (!user) res.json({ message: "usuario no encontrado" });
    else {
      req.logIn(user, function (err) {
        if (err) { return next(err) }
        return res.json({ message: "usuario autenticado" })
      })
    }
  })(req, res, next)


  // if (!result) {
  //   return res.json({ message: "usuario no encontrado" })
  // }
  // const { salt, hash } = result
  // const compareHash = validatePassword(loginpass, hash, salt)

  // res.json({ message: "ruta funcionando" })
  // const registerUser = new Usuario({ username, email, hash, salt })
  // await registerUser.save().then((resp) => {
  //   if (resp) {
  //     return res.json({ status: "ok", message: resp })
  //   }
  //   throw new Error("Ha ocurrido un error: " + resp)
  // }).catch(e => {
  //   res.status(400).json({ status: "fail", error: e })
  // })
}

export function userData(req, res) {
  res.json({ data: req.user })
}