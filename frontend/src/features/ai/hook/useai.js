import { useContext } from "react"
import {generateReport,getReport,generateResume} from "../services/api.services"
import {AiContext} from "../ai.context"


export const useAi=()=>{
    const context = useContext(AiContext)
    const {loading,setLoading,report,setReport}  = context

    // hook to generate new report
    const newReport = async ({resume,jobdescription,selfdescription}) => {
            setLoading(true)
            try {
                let response = await generateReport({resume,jobdescription,selfdescription})
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
    }

    // hook to get all report
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

    // hook to generate resume
const newResume = async (interviewid) => {
  setLoading(true);

  try {
    const response = await generateResume({interviewid});

    // Create blob URL
    const url = window.URL.createObjectURL(
      new Blob([response], { type: "application/pdf" })
    );

    // Create link
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Resume.pdf");

    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.remove();
    window.URL.revokeObjectURL(url);

     await getallreport();

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
    return {loading,report,newReport,getallreport,newResume}
}