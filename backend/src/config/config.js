import dotenv from "dotenv"
dotenv.config()


const config = {
    MONGO_URI: process.env.MONGO_URI,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFERSH_TOKEN_SECRET: process.env.REFERSH_TOKEN_SECRET
}


export default config