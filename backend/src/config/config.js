import dotenv from "dotenv"
dotenv.config()


const config = {
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFERSH_TOKEN_SECRET: process.env.REFERSH_TOKEN_SECRET,
    IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY
}


export default config