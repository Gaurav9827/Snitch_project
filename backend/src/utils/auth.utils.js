import config from "../config/config.js";
import jwt, { JsonWebTokenError } from "jsonwebtoken"

export function createAccessToken({ userId, role }) {
    const accessToken = jwt.sign({
        userId, role
    }, config.ACCESS_TOKEN_SECRET, { expiresIn: "15Min" })
    return accessToken
}



export function readAccessToken(accessToken){
    return jwt.verify(accessToken,config.ACCESS_TOKEN_SECRET)

}

export function createRefreshToken({ userId, role }) {
    const refershToken = jwt.sign({
        userId, role
    }, config.REFERSH_TOKEN_SECRET, { expiresIn: "7Days" })

    return refershToken
}

export function readRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, config.REFERSH_TOKEN_SECRET)

}