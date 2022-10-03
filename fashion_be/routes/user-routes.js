import { Router } from "express";
import UserController from "../controllers/userControllers";

const router = Router()
const user = new UserController()

router.get('/', user.getUser)
router.get('/:id', user.viewProfile)
router.post('/login', user.login)
router.put('/:id', user.updateProfile)

export default router