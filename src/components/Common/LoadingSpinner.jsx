import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = ({ size = 'lg', text = 'Chargement...', center = true }) => {
  const spinnerClass = center ? 'd-flex justify-content-center align-items-center' : ''
  
  return (
    <div className={`${spinnerClass} p-4`}>
      <div className="text-center">
        <Spinner 
          animation="border" 
          role="status" 
          size={size}
          className="text-primary mb-2"
        />
        {text && (
          <div className="text-muted">{text}</div>
        )}
      </div>
    </div>
  )
}

export default LoadingSpinner
