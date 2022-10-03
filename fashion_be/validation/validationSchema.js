import Joi from 'joi'
const userValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .pattern(new RegExp('^[a-zA-Z ]+$'))
        .required(),

    email: Joi.string()
        .email()
        .lowercase()
        .pattern(new RegExp('^([a-zA-Z0-9_\.\-]+)@([a-zA-Z]+)\.([a-zA-Z]{2,5})$'))
        .required(),

    phone: Joi.string()
        .pattern(new RegExp('^[6-9]{1}[0-9]{9}$')),

    address: Joi.string()
})

export default userValidationSchema