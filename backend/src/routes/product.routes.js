import { Router } from "express"
import { authenticate } from "../middleware/auth.middleware.js"
import { createProducts, listAllProduct } from "../controllers/products.controller.js"

import { createProductValidator } from "../validators/products.validators.js"
import multer from "multer"




const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        files: 5,
        fileSize: 1 * 1024 * 1024
    }
})

const router = Router()

/**
 * @method  post 
 * @routes /api/products/
 * @descriptions creates the products and save its data intp the db ,images will be store on imagekit.
 * 
 * 
 */


router.post("/", authenticate, (req, res, next) => {
    if (req.user.role !== "seller") {

        return res.status(403).json({
            message: "user is not authorize to create products "
        })
    }
    next()
},
    upload.array("images"),

    (req, res, next) => {

        req.body.price = JSON.parse(req.body.price)
        req.body.sizes = JSON.parse(req.body.sizes)

        next()
    },
    createProductValidator,

    createProducts)


router.get("/",authenticate,listAllProduct)

export default router