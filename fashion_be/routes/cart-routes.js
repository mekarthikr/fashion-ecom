import { Router } from "express";
import CartController from "../controllers/cartContoller";

const router = Router()
const cart = new CartController()

router.post('/:productId/:userId',cart.addToCart)
router.get('/:id',cart.viewMyCart)
router.put('/:productId/:userId',cart.updateQuantity)
router.delete('/:cartId',cart.removeFromCart)

export default router