import { useState } from "react";
import "./AiHome.css";
import { useEffect } from "react";
import { useAi } from "../hook/useai"


// 🔥 Card Component
const Card = ({ item,newResume }) => {
  const [techOpen, setTechOpen] = useState(false);
  const [behavOpen, setBehavOpen] = useState(false);
  const [roadmapOpen, setRoadmapOpen] = useState(false);

  return (
    <div className="card">

      {/* Score */}
      <div className="score-row top">
        <p className="score-label">Match Score : {item?.matchScore}%</p>
        {item.resumeCreated ? 
        (<button>Created</button>)
         :(
           <button onClick={()=>{newResume(item._id)}}>Generate Resume</button>
        )}
      </div>

      {/* Skills Gap */}
      <div className="gap-box">
        <p className="gap-title">Skills Gap</p>
        <div className="gap-badges">
          {item?.skillsGap?.map((s, i) => (
            <span key={i} className={`badge ${s.severity}`}>
              <span className="badge-dot" />
              {s.skills}
            </span>
          ))}
        </div>
      </div>

      {/* Technical Questions */}
      <div className="section">
        <button
          className="section-header"
          onClick={() => setTechOpen(!techOpen)}
        >
          <span>Technical Questions</span>
          <span className={`section-chevron ${techOpen ? "open" : ""}`}>⌄</span>
        </button>

        {techOpen && (
          <div className="section-body">
            <ol className="question-list">
              {item?.technicalQuestions?.map((q, i) => (
                <li key={i}>{q.question}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Behavioural Questions */}
      <div className="section">
        <button
          className="section-header"
          onClick={() => setBehavOpen(!behavOpen)}
        >
          <span>Behavioural Questions</span>
          <span className={`section-chevron ${behavOpen ? "open" : ""}`}>⌄</span>
        </button>

        {behavOpen && (
          <div className="section-body">
            <ol className="question-list">
              {item?.behavioralQuestions?.map((q, i) => (
                <li key={i}>{q.question}</li>
              ))}
            </ol>
          </div>
        )}
      </div>

      {/* Roadmap */}
      <div className="section">
        <button
          className="section-header"
          onClick={() => setRoadmapOpen(!roadmapOpen)}
        >
          <span>Roadmap</span>
          <span className={`section-chevron ${roadmapOpen ? "open" : ""}`}>⌄</span>
        </button>

        {roadmapOpen && (
          <div className="section-body">
            <div className="roadmap-box">
              {item?.preparationPlan?.map((plan) => (
                <div key={plan.day} className="roadmap-row">
                  <span
                    className="day-label"
                    style={{
                      background: `${plan.color}22`,
                      color: plan.color,
                    }}
                  >
                    Day {plan.day}
                  </span>

                  <ul className="roadmap-tasks">
                    {plan.task.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// 🔥 Main Component
export default function AiHome() {
  let {report,getallreport,newResume,loading} = useAi()
  useEffect(()=>{
    let call= async () => {
     await getallreport();
    }
    call()
  },[])
  return (
  <div>
    {loading ? (
      <h1>Loading</h1>
    ) : (
      <div className="main-page">
        {report.length === 0 ? (
          <p>No reports available</p>
        ) : (
          report.map((item, index) => (
            <Card key={index} item={item} newResume={newResume}/>
          ))
        )}
      </div>
    )}
  </div>
);
}