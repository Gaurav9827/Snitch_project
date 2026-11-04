import { Router } from "express"
import { loginValidator, registerValidator } from "../validators/auth.validators.js"
import { getMe, login, refresh, register } from "../controllers/auth.controller.js"
  
import { authenticate } from "../middleware/auth.middleware.js"

const router = Router()

/**
 * @post /api/auth/register
 * @params req.express 
 * @param req.body ={email,password ,name}
 * @response 201 uaser cead
 */

router.post("/register", registerValidator, register)



/**
 * @post /api/auth/login
 * @params req.
 * @param req.body ={email,password }
 * @response 200 suceefully 
 */

router.post("/login", loginValidator, login)

/**
 * @post api/.auth/refersh
 */

router.post("/refresh", refresh)

/***
 * @get /api/auth/me
 */

router.get("/me", authenticate,getMe)

export default router