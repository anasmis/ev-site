import React from 'react'
import { Routes, Route } from 'react-router-dom'

// Minimal test component
const TestHome = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
      <h1 style={{ color: '#007bff' }}>EV Site is Working!</h1>
      <p>This is a test to verify React is running correctly.</p>
      <div style={{ marginTop: '20px' }}>
        <h3>Navigation Test:</h3>
        <ul>
          <li>Home (current page)</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
    </div>
  )
}

const MinimalApp = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TestHome />} />
        <Route path="*" element={<div style={{ padding: '20px' }}>404 - Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default MinimalApp
