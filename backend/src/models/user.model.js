import mongoose from "mongoose"

let userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already taken"],
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        unique:[true,"email already taken"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"email is required"],
        select:false
    }
})

const userModel = mongoose.model("user",userSchema)
export default userModel