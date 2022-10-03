import User from '../model/user'
import userValidationSchema from '../validation/validationSchema'
import * as status from '../constants/status-code';
import BaseController from './baseController';

const baseController = new BaseController()

class UserController {

    login = async (req, res, next) => {
        try {
            let { name, email, role } = req.body

            let options = { abortEarly: false }
            await userValidationSchema.validateAsync({ name, email }, options)
            let user=await User.findOne({ email: email })

            if (user)
                return res.status(status.SUCCESS).json({ message: "user login successfully",user })

            const roleId = await baseController.getRoleId(role)
            user = new User({
                name,
                email,
                roleId
            })
            console.log("USER : ", user);
            await user.save()
            return res.status(status.SUCCESS).json({ message: "user registerd and login successfully",user })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    getUser = async (req, res, next) => {
        try {
            let users = await User.find()

            if (users === null) {
                console.log("Entering");
                throw "No user found"
            }

            return res.status(status.SUCCESS).json({ users })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    viewProfile = async (req, res, next) => {
        try {
            let user
            const id = req.params.id;

            if (id.length !== 24)
                throw "Invalid Object ID"
            user = await User.findById(id)
            if (!user)
                throw "User not found"
            return res.status(status.SUCCESS).json({ user })
        }
        catch (err) {
            return res.status(status.NOT_FOUND).json({ error: err })
        }
    }

    updateProfile = async (req, res) => {
        //console.log(req.body,"id",req.params.id)
        try {
            let userId = req.params.id
            const { name, email, phone, address } = req.body

            if (userId.length !== 24)
                throw "Invalid Object Id"

            if (!await User.findById(userId))
                throw "Unable update this profile"
            let options = { abortEarly: false }
            await userValidationSchema.validateAsync({ name, email,phone }, options)
            let user = await User.findByIdAndUpdate(userId, {
                // name,
                name, 
                email,
                phone,
                address
            })
            await user.save()
            user = await User.findById(userId)
            return res.status(status.SUCCESS).json({ message: "User updated successfully",user })
        }
        catch (err) {
            if (err.isJoi === true)
                console.log("ERROR : " + err);
            console.log(err.message)
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

    deletprofile = async (req, res, next) => {
        try {
            let user
            let id = req.params.id

            if (id.length !== 24)
                throw "Invalid Object ID"

            user = await User.findByIdAndDelete(id)

            if (user === null)
                throw "Id not found couldn't delete the user"

            return res.status(status.SUCCESS).json({ message: "Successfully Deleted" })
        }
        catch (err) {
            return res.status(status.INTERNAL_SERVER_ERROR).json({ error: err })
        }
    }

}

export default UserController;