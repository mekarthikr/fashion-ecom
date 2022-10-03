import pkg from 'mongoose';

const { Schema, model } = pkg;

const configurableProduct = new Schema({
    productPrice: {
        type: String,
        required: true,
    },
    stockId: {
        type: pkg.Types.ObjectId,
        required: true
    },
    skuId: {
        type: String,
        required: false
    }
})

export default model("configurable_product", configurableProduct)