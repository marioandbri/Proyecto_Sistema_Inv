import { Router } from "express";
import { deleteUser, loginUser, registerAdmin, registerUser, updatePassword, updateUser, userData, userLogout, usersList } from "../controllers/uac.controller";
const router = Router()


router.post('/uac/registro/admin', registerAdmin)
router.post('/uac/registro', registerUser)
router.post('/uac/login', loginUser)
router.get('/uac/user', userData)
router.get('/uac/logout', userLogout)
router.put('/uac/mgmt/:id', updateUser)
router.get('/uac/mgmt', usersList)
router.delete('/uac/mgmt/:id', deleteUser)
router.put('/uac/mgmt/pass/:id', updatePassword)

module.exports = router