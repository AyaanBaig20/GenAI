import { useState } from "react";
import "./Dashboard.css";
import {useAi} from "../hook/useai.js"
import {useNavigate} from "react-router-dom"

const Dashboard = () => {
  let navigate = useNavigate()
  let {loading,newReport} = useAi()
  
  const [formData, setFormData] = useState({
    resume: "",
    jobdescription: "",
    selfdescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitREPORT=async()=>{
        if(loading) return 
    try {
       await newReport({resume:formData.resume,jobdescription:formData.jobdescription,selfdescription:  formData.selfdescription})
    navigate("/AllReport")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="dash-wrap">
        <div className="dash-card">
          <h1 className="dash-title">Resume Intelligence</h1> <br />

          <div className="dash-fields">
            <div>
              <label className="dash-label">Job Description</label>
              <textarea
                name="jobdescription"
                value={formData.jobdescription}
                onChange={handleChange}
                className="dash-textarea"
                rows="4"
                placeholder="Paste the job description here"
              />
            </div>

            <div>
              <label className="dash-label">Resume Text</label>
              <textarea
                name="resume"
                value={formData.resume}
                onChange={handleChange}
                className="dash-textarea"
                rows="4"
                placeholder="Paste your current resume"
              />
            </div>

            <div>
              <label className="dash-label">Self Description</label>
              <textarea
                name="selfdescription"
                value={formData.selfdescription}
                onChange={handleChange}
                className="dash-textarea"
                rows="3"
                placeholder="A few lines about yourself, goals, strengths"
              />
            </div>
          </div>

          <div className="dash-actions">
            <button className="dash-btn dash-btn-outline" onClick={submitREPORT}>
              Generate Report
            </button>
            <button className="dash-btn dash-btn-solid">
              Generate Resume
            </button>
          </div>

          <p className="dash-trials">
            <span>3 trials per account</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;