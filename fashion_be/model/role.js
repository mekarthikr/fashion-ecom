import pkg from 'mongoose';

const { Schema, model } = pkg;

const roleSchema = new Schema({

    roleType: {
        type: String,
        required: true
    }
})

export default model("Role", roleSchema)