import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
export default function Protected({children}){
      const user = useSelector((state) => state.auth.user);
    if(!user){
        return <Navigate to={"/login"}/>
    }
    return children
}