import mongoose from "mongoose";

let blacklistSchema = new mongoose.Schema({
    blacklistToken:{
        type:String,
        required:true,
    }
},{
    timestamps:true
})

let blacklistModel = mongoose.model("blacklist",blacklistSchema)
export default blacklistModel