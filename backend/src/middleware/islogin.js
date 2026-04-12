import jwt from "jsonwebtoken"
import blacklistModel from "../models/blacklist.model.js";

async function islogin(req,res,next) {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({message:"Not authenticated. Please login."})
        }
        let tokenBlacklisted =await blacklistModel.findOne({blacklistToken:token})
        if(tokenBlacklisted){
             return res.json({message:"Not authenticated."})
        }
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    }catch(e){
        console.log(e);
    }
}
export default {islogin}