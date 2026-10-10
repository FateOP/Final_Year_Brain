import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { CaseProvider } from './context/CaseProvider.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CaseProvider>
        <App />
      </CaseProvider>
    </BrowserRouter>
  </StrictMode>
)