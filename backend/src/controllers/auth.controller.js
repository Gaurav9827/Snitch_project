import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import {
    createAccessToken
    , createRefreshToken,
    readRefreshToken
} from "../utils/auth.utils.js";



/***
 * @description Register an user nd save the data from req.body
 * @params req express.request
 * @params req.body
 * 
 */

export const register = async (req, res) => {

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

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    })


    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    })

    res.status(201).json({
        message: "User registerd suceffully",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            },
            accessToken
        }
    })

}


export const login = async (req, res) => {
    const { email, password } = req.body


    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const accessToken = createAccessToken({
        userId: user._id,
        role: user.role
    })

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })

    await userModel.findOneAndUpdate({
        email
    }, {
        refreshToken
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: "true"
    })

    res.status(200).json({
        message: "User loggedin Succesfully",
        data: {
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            },
            accessToken
        }
    })
}


export const refresh = async (req, res) => {

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(401).json({
            message: "RefershToken is required"
        })
    }

    try {

        const decoded = readRefreshToken(refreshToken)

        const { userId, role } = decoded

        const user = await userModel.findById(userId)

        if (refreshToken != user.refreshToken) {
            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: null,

            })
            return res.status(401).json({
                message: "RefershToken missmatched"
            })
        }

        const accessToken = createAccessToken({
            userId, role
        })
        const newRefershToken = createRefreshToken({
            userId, role
        })

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: newRefershToken
        })

        res.cookie("refreshToken", newRefershToken, {
            httpOnly: true
        })

        res.status(200).json({
            message: "Token rotaed succesfully",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                },
                accessToken
            }
        })


    } catch (error) {
        return res.status(401).json({
            message: "Invalid refershToken"
        })

    }

}


export const getMe = async (req, res) => {


    const { userId, role } = req.user
    const user = await userModel.findById(userId)

    res.status(200).json({
        message: "User data fetch succefully ",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            }
        }
    })

}