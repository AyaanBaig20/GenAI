import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Signup from "./features/auth/pages/Signup"
import { AuthProvider } from "./features/auth/auth.context"
import Protected from "./features/auth/components/Protected"
import Dashboard from "./features/ai/pages/Dashboard"
import AiHome from "./features/ai/pages/AiHome"
import {AiProvider} from "./features/ai/ai.context"

// 
import Hero from "./features/auth/pages/Hero"
import FinalHome from "./features/auth/pages/FinalHome"

function App() {
  return (
    <>
    <AuthProvider>
      <AiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FinalHome/>}/>
          <Route path="/Hero" element={<Protected><Hero/></Protected>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/AllReport" element={<AiHome/>}/>
          <Route path="/form" element={<Protected><Dashboard/></Protected>} />
        </Routes>
      </BrowserRouter>
      </AiProvider>
      </AuthProvider>
    </>
  )
}

export default App
