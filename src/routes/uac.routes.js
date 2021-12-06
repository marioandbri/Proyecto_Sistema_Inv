import { Router } from "express";
import { loginUser, registerUser, userData, userLogout } from "../controllers/uac.controller";
const router = Router()


router.post('/uac/registro', registerUser)
router.post('/uac/login', loginUser)
router.get('/uac/user', userData)
router.get('/uac/logout', userLogout)

module.exports = router