import jwt from "jsonwebtoken"

function islogin(req,res,next) {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({message:"Not authenticated. Please login."})
        }
        let decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    }catch(e){
        console.log(e);
    }
}
export default {islogin}