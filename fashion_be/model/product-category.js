import pkg from 'mongoose';
const { Schema, model } = pkg;

const categorySchema = new Schema({

    category: {
        type: String,
        required: true,
    }
})

export default model("Category", categorySchema)