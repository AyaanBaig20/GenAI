import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./style.scss"
import "react-toastify/ReactToastify.css"
import {ToastContainer} from "react-toastify"
import { store } from "./features/redux/store.js"
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <Provider store={store}>
         <App />
       </Provider>
    <ToastContainer />
  </StrictMode>,
)
