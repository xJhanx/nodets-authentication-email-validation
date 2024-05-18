import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    aveliable: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    description : {
        type: String
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },
    category : { type: mongoose.Schema.Types.ObjectId, ref: 'Category', require: true },

});

productSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

export const ProductModel = mongoose.model('Product', productSchema);