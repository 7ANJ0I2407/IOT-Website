import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './Components/Dashboard.jsx'
import UploadFirmwarePage from './Components/UploadFirmwarePage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadFirmwarePage />} />
      </Routes>
    </Router>
  )
}

export default App
