import pkg from 'mongoose'

const { Schema, model } = pkg;

const sizeSchema = new Schema({

    size: {
        type: String,
        required: true
    }
})

export default model("Size", sizeSchema)