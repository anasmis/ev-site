import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Simple test component
const SimpleHome = () => (
  <div style={{ padding: '20px' }}>
    <h1>EV Site - Home Page</h1>
    <p>Welcome to the EV charging station website!</p>
  </div>
)

const SimpleApp = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SimpleHome />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </div>
  )
}

export default SimpleApp
