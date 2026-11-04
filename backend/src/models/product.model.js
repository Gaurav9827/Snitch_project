import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100
    },
    discription: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 500
    },
    images: {
        type: [{
            type: String,
        }],
        validate: {
            validator: images => images.length <= 5,
            message: "A product cant have at most 5 images"
        }
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["INR", "USD"],
            default: "INR"
        }
    },
    sizes: [{
        size: {
            type: String,
            enum: ["XS", "s", "M", "L", "XL", "XXL"],
            required: true

        },
        stock: {
            type: Number,
            min: 0,
            default: 0
        }
    }],

    seller: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }, 
    published: {
        type: Boolean,
        default: false
    }
})


const productModel = mongoose.model("Products", productSchema)

export default productModel