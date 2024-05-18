import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    aveliable: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true },

});

categorySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
export const CategoryModel = mongoose.model('Category', categorySchema);