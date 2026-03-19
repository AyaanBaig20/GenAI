import { useAuth } from "../hooks/useAuth"
import { Navigate } from "react-router-dom"
export default function Protected({children}){
    let {user,loading} = useAuth()
    if(loading){
        return <><h1>loading</h1></>
    }
    if(!user){
        return <Navigate to={"/login"}/>
    }
    return children
}