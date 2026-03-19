import "./App.css"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from "./features/auth/pages/Login"
import Signup from "./features/auth/pages/Signup"
import Home from "./features/auth/pages/Home"
import { AuthProvider } from "./features/auth/auth.context"
import Protected from "./features/auth/components/Protected"
function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Protected><h1>dashboard</h1></Protected>} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
