import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
        <App />
  </BrowserRouter>,
)
