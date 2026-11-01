import app from "./app/app.js";
import { connectDB } from "./config/db.config.js";


await connectDB()

app.listen(3000,()=>{
    console.log("Server on running  at port 3000")
})