import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./style.scss"
import "react-toastify/ReactToastify.css"
import {ToastContainer} from "react-toastify"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
        <App />
    <ToastContainer />
  </StrictMode>,
)
