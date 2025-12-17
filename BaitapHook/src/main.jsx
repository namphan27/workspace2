import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FetchApi from './component/FetchApi.jsx'
import Sidebar from './component/Sidebar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <FetchApi /> */}
    <Sidebar/>
  </StrictMode>,
)
