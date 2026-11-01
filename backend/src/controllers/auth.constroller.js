import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import {
    createAccessToken
    , createRefreshToken
} from "../utils/auth.utils.js";



/***
 * @description Register an user nd save the data from req.body
 * @params req express.request
 * @params req.body
 * 
 */

export const register = async () => {

    const { email, name, password, } = req.body

    const isUserAlreadyExits = await userModel.findOne({
        email
    })

    if (isUserAlreadyExits) {
        return res.status(400).json({
            message: "User already exists with this email address",
            errors: [
                {
                    field: "email",
                    message: "User already exists with this email address"
                }
            ]
        })
    }

    const user = await userModel.create({
        email,
        name,
        passwordHash: await bcrypt.hash(password, 12)
    })

    const accessToken  = createAccessToken({
        userId:user._id,
        role:user.role
    })

    
    const refershToken  = createRefreshToken({
        userId:user._id,
        role:user.role
    })

}