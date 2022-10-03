import pkg from 'mongoose'
import size from './size';
import product from './product';

const { Schema, model } = pkg;

const stockSchema = new Schema({
    sizeId: {
        type: pkg.Types.ObjectId,
        ref: 'Size',
        required: true
    },
    availableStock: {
        type: Number,
        required: false
    }

})

export default model("Stock", stockSchema)