import pkg from 'mongoose';

const { Schema, model } = pkg;

const cartSchema = new Schema({
    userId: {
        type: pkg.Types.ObjectId,
        ref: 'User',
        required: false
    },
    productId: {
        type: pkg.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    quantity: {
        type: Number,
        required: false
    }

})

export default model("Cart", cartSchema);

