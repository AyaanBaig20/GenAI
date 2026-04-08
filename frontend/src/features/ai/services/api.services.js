import axios from "axios"

// generate report
export async function generateReport({resume,jobdescription,selfdescription}) {
      let res =await axios.post("http://localhost:3000/interview/api/test",{resume,jobdescription,selfdescription},{withCredentials:true})
      return res.data
}

//get all report 
export async function getReport() {
    let res = await axios.get("http://localhost:3000/auth/api/get/data",{withCredentials:true})
    return res.data
} 

// generate Resume
export async function generateResume({interviewid}) {
    let res =await axios.post("http://localhost:3000/api/resume/create",{interviewid},{withCredentials:true,responseType:"blob"})
    return res.data
}