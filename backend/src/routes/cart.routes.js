import { Router } from "express"
import { addToCartValidator } from "../validators/cart.validators.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { addtoCart, getCart } from "../controllers/cart.controller.js"


const router = Router()


router.post("/", authenticate, addToCartValidator, addtoCart)


router.get("/",authenticate,getCart)



export default router