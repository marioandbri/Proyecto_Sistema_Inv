import { passwordGenerator } from "../helpers/paswordUtil";
import Usuario from "../model/Usuario";

export async function registerUser(req, res) {
  const { user, mail, pass } = req.body
  const { salt, hash } = passwordGenerator(pass)
  const registerUser = new Usuario({ fullName: user, mail, hash, salt })
  await registerUser.save().then((resp) => {
    if (resp) {
      return res.json({ status: "ok", message: resp })
    }
    throw new Error("Ha ocurrido un error: " + resp)
  }).catch(e => {
    res.status(400).json({ status: "fail", erros: e })
  })
}