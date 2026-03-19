import axios from "axios"

// Signup Service Api
export async function Signup({username,email,password}) {
    try {
         let res =await axios.post("http://localhost:3000/auth/api/signup",{username,email,password},{withCredentials:true})
         return res.data
    } catch (error) {
        console.log(error)
    }
}

// Login Service Api
export async function Login({email,password}) {
    try {
        let res = await axios.post("http://localhost:3000/auth/api/login",{email,password},{withCredentials:true})
         return res.data
    } catch (error) {
        console.log(error);
    }
}

// Logout Service Api
export async function Logout() {
    try {
        let res = await axios.post("http://localhost:3000/auth/api/logout",{withCredentials:true})
         return res.data
    } catch (error) {
        console.log(error);
        
    }
}

// Get Me Service Api
export async function Getme() {
    try {
        let res =await axios.get("http://localhost:3000/auth/api/get/me",{withCredentials:true})
        return res.data
    } catch (error) {
        console.log(error)
    }
}