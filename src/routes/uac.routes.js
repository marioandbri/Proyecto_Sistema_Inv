import { Router } from "express";
import { registerUser } from "../controllers/uac.controller";
const router = Router()


router.post('/uac/registro', registerUser)

module.exports = router