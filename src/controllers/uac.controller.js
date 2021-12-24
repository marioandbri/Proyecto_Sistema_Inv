import { passwordGenerator, validatePassword } from "../helpers/paswordUtil";
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
  //console.log(typeof adminKey, typeof ADMIN_KEY)
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
  const { email, accessEmpresas, accessInventarios, accessProductos } = req.body
  const id = req.params.id
  await Usuario.updateOne({ _id: id }, { email, accessEmpresas, accessInventarios, accessProductos }, (err, user)=>{
    if(err){
      return res.status(400).json({status:"error", message:err})
    }
    if(user.n != user.nModified){
      return res.json({status:"warn",message:"No se realizaron modificaciones 😕" })
    }else{
      return res.json({status:"success", message:"Cambios realizados correctamente 👍"})
    }
  }).exec()

}

export async function deleteUser(req,res){
  const id = req.params.id
  const result = await Usuario.deleteOne({_id: id}).exec()
  res.json({status: "ok", response: result})
}

export async function updatePassword(req,res){
  const id = req.params.id
  const {salt: oldSalt, hash: oldHash, isAdmin} = req.user
  const {password, oldPassword} = req.body
  const isValid = isAdmin || validatePassword(oldPassword, oldHash, oldSalt )
  if(isValid){
    const { salt, hash } = passwordGenerator(password)
    // const result = 
    await Usuario.updateOne({_id: id}, {salt, hash}, (err, user)=>{
      if (err) {
        return res.status(400).json({ status: "error", message: err })
      }
      if (user.n != user.nModified) {
        return res.json({ status: "warn", message: "No se realizaron modificaciones 😕" })
      } else {
        return res.json({ status: "success", message: "Cambio de contraseña realizado correctamente 👍" })
      }
    }).exec()
    // //console.log(result)
    // res.json({status: "ok", response: result})
  }else{
    res.status(400).json({status:"error", message:"La contraseña actual no coincide con las credenciales almacenadas ✖"})
  }
    
  
}