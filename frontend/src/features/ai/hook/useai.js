import { useContext } from "react"
import {generateReport,getReport} from "../services/api.services"
import {AiContext} from "../ai.context"


export const useAi=()=>{
    const context = useContext(AiContext)
    const {loading,setLoading,report,setReport}  = context

    const newReport = async ({resume,jobdescription,selfdescription}) => {
            setLoading(true)
            try {
                let response = await generateReport({resume,jobdescription,selfdescription})
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
    }
    const getallreport = async()=>{
        setLoading(true)
        try {
            let response = await getReport()
            setReport(response.report)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    return {loading,report,newReport,getallreport}
}