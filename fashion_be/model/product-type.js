import pkg from 'mongoose';
const { Schema, model } = pkg;

const typeSchema = new Schema({
    productType: {
        type: String,
        required: true
    }
})

export default model("product_Type", typeSchema)