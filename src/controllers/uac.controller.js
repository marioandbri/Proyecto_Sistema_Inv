import { passwordGenerator } from "../helpers/paswordUtil";
import Usuario from "../model/Usuario";
import passport from 'passport'
const { ADMIN_KEY } = process.env
//ADMIN_KEY=QXJyaWVuZGFMdGRhLmtleWZvcmFkbWluaXN0cmF0aW9u

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
    res.status(400).json({ status: "fail", error: e })
  })
}

export async function registerAdmin(req, res) {
  const { username, email, password, isAdmin } = req.body.signupData
  const { adminKey } = req.body.adminKey
  if (adminKey === ADMIN_KEY) {

    const { salt, hash } = passwordGenerator(password)
    const registerUser = new Usuario({ username, email, hash, salt, isAdmin })
    await registerUser.save().then((resp) => {
      if (resp) {
        return res.json({ status: "ok", message: resp })
      }
      throw new Error("Ha ocurrido un error: " + resp)
    }).catch(e => {
      res.status(400).json({ status: "fail", error: e })
    })
  } else {
    res.status(400).json({ status: "fail", error: "La clave de creacion de administrador no es valida" })
  }
}

export function loginUser(req, res, next) {
  // const { username: loginuser, password: loginpass } = req.body
  // const result = await Usuario.findOne({ username: loginuser })
  passport.authenticate("local", (err, user,) => {
    if (err) throw err;
    if (!user) res.status(400).json({ message: "Credenciales incorrectas" });
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

export function userLogout(req, res) {
  req.logout()
  res.json({ message: "Se ha cerrado su sesion" })
}

export function userData(req, res) {
  res.json(req.user || null)
}