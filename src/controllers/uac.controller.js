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
    res.status(400).json({ status: "fail", error: e.code == 11000 ? `El registro [${Object.keys(e).map(key => key == "keyValue" ? Object.keys(e[key]) + " : " + Object.values(e[key]) : null).join("")}] ya existe en la base de datos` : e.toString() })

  })
}

export async function registerAdmin(req, res) {
  const { username, email, password, isAdmin } = req.body.signupData
  const { adminKey } = req.body
  console.log(typeof adminKey, typeof ADMIN_KEY)
  if (adminKey === ADMIN_KEY) {

    const { salt, hash } = passwordGenerator(password)
    const registerUser = new Usuario({ username, email, hash, salt, isAdmin })
    await registerUser.save().then((resp) => {
      if (resp) {
        return res.json({ status: "ok", message: resp })
      }
      throw new Error("Ha ocurrido un error: " + resp)
    }).catch(e => {
      res.status(400).json({ status: "fail", error: e.code == 11000 ? `El registro [${Object.keys(e).map(key => key == "keyValue" ? Object.keys(e[key]) + " : " + Object.values(e[key]) : null).join("")}] ya existe en la base de datos` : e.toString() })
    })
  } else {
    res.status(400).json({ status: "fail", error: "La llave de creacion de administrador no es valida" })
  }
}

export function loginUser(req, res, next) {
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
}

export function userLogout(req, res) {
  req.logout()
  res.json({ message: "Se ha cerrado su sesion" })
}

export function userData(req, res) {
  res.json(req.user || null)
}

export async function usersList(req, res) {
  const result = await Usuario.find({}).exec()
  res.json({ status: "ok", users: result })
}

export async function updateUser(req, res) {
  const { email } = req.body
  const id = req.params.id
  const result = await Usuario.updateOne({ _id: id }, { email: email }).exec()
  res.json({ status: "ok", response: result })

}