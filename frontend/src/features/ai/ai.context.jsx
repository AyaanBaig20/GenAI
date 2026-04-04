import { createContext,useState } from "react";

export const AiContext = createContext()

export const AiProvider = ({children})=>{
    let [loading,setLoading] = useState(false)
    let [report ,setReport]=useState([])
    return (
        <AiContext.Provider value={{loading,setLoading,report,setReport}}>
            {children}
        </AiContext.Provider>
    )
}