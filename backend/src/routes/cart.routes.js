import { Router } from "express"
import { addToCartValidator } from "../validators/cart.validators.js"
import { authenticate } from "../middleware/auth.middleware.js"
import { addtoCart } from "../controllers/cart.controller.js"


const router = Router()


router.post("/", authenticate, addToCartValidator, addtoCart)





export default router