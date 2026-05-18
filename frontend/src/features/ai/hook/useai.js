import {generateReport,getReport,generateResume,} from "../services/api.services";
import { setLoading, setReport } from "../../redux/Slices/aiSlices";
import { useDispatch } from "react-redux";

export const useAi = () => {
  const dispatch = useDispatch();

  //  Generate new report
  const newReport = async ({ resume, jobdescription, selfdescription }) => {
    dispatch(setLoading(true));
    try {
      const response = await generateReport({
        resume,
        jobdescription,
        selfdescription,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:"Failed to generate report",
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

  //  Get all reports
  const getallreport = async () => {
    dispatch(setLoading(true));
    try {
      const response = await getReport();

      dispatch(setReport(response?.report || []));

      return {
        success: true,
      };
    } catch (error) {
      dispatch(setReport([]));

      return {
        success: false,
        message: "Failed to fetch reports",
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

  //  Generate Resume (PDF download)
  const newResume = async (interviewid) => {
    dispatch(setLoading(true));

    try {
      const response = await generateResume({ interviewid });

      // Create PDF blob
      const blob = new Blob([response], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "Resume.pdf";

      document.body.appendChild(link);
      link.click();

      // Cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

      // Refresh reports
      await getallreport();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Failed to generate resume",
      };
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    newReport,
    getallreport,
    newResume,
  };
};