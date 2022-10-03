import pkg from 'mongoose';


const { Schema, model } = pkg;

const productSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    category: {
        // type: pkg.Types.ObjectId,
        // ref: 'Category',
        type: String,
        required: true
    },
    variation: {
        type:[],
        required: true
    },
    availableDate: {
        type: Date,
        required: true
    },
    skuId: {
        type: String,
        required: true
    },
    retailerId: {
        type: pkg.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },

})

productSchema.index({productName:"text"})

export default model("Product", productSchema)