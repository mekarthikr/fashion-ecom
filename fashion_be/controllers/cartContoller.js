import Cart from '../model/cart'
import BaseController from './baseController'
import * as status from '../constants/status-code'
import User from '../model/user'
import product from '../model/product'

const baseController = new BaseController()

class CartController {
    viewCart = async (req, res, next) => {
        try {
            let cart = await Cart.find().populate({ path: 'productId' });
            if (cart.length <= 0)
                throw "Empty Cart"
            return res.status(status.SUCCESS).json({ cart });
        }
        catch (err) {
            console.log("ERROR : ", err);
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    viewMyCart = async (req, res) => {
        try {
            let userId = req.params.id

            console.log("user : ", await User.find({ userId: userId }))

            let userCart = await Cart.find({ userId: userId }).populate({ path: 'productId' });

            console.log("USER C : ", userCart)

            return res.status(status.SUCCESS).json({ userCart })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err.message })
        }
    }
    addToCart = async (req, res, next) => {
        try {
            let productId = req.params.productId
            let userId = req.params.userId
            console.log("hii", productId);
            console.log('sdsd', userId)
            console.log(await Cart.findOne({ productId: productId, userId: userId }));

            if (await Cart.findOne({ productId: productId, userId: userId })) {
                let cart = await Cart.findOne({ productId: productId, userId: userId })
                await Cart.updateOne({ productId: productId }, { $inc: { quantity: 1 } })
                console.log("if", cart);
                return res.status(status.SUCCESS).json({ message: `Product Added Quantity:(${cart.quantity + 1})` })
            }
            else {
                let cart = new Cart({
                    userId,
                    productId,
                    quantity: 1
                })
                let cartObj = await cart.save()
                return res.status(status.SUCCESS).json({ message: "Product Added Successfully" })
            }
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
    updateQuantity = async (req, res, next) => {
        try {
            const { productId, userId } = req.params

            let cart = await Cart.findOne({
                productId: productId, userId: userId
            })
            let val
            if (!cart.quantity > 1)
                throw "Unable to reduce quantity"

            await Cart.updateOne({ productId: productId, userId: userId }, { $inc: { quantity: -1 } })

            return res.status(status.SUCCESS).json({ message: "Cart Updated Successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }
    removeFromCart = async (req, res) => {
        try {
            let cartId = req.params.cartId;

            if (cartId.length !== 24)
                throw "Invalid Object Id"
            let cart = await Cart.findByIdAndDelete(cartId)
            console.log(cart);
            if (!cart)
                throw "Unable to delete cart"

            return res.status(status.SUCCESS).json({ message: "Cart deleted Successfully" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }


}

export default CartController