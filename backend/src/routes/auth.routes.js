import { Router } from "express"
import { registerValidator } from "../validators/auth.validators.js"
import { register } from "../controllers/auth.constroller.js"

const router = Router()

/**
 * @post /api/auth/register
 * @params req.express 
 * @param req.body ={email,password ,name}
 * @response 201 uaser cead
 */

router.post("/register",registerValidator)

export default router