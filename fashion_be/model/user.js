import pkg from 'mongoose';

const { Schema, model } = pkg;

const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    roleId: {
        type: pkg.Types.ObjectId,
        ref: 'Role',
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    }
})

export default model("User", userSchema)