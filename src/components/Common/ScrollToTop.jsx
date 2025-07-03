import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {isVisible && (
        <Button
          variant="primary"
          className="position-fixed bottom-0 end-0 m-3 rounded-circle"
          style={{ zIndex: 1000, width: '50px', height: '50px' }}
          onClick={scrollToTop}
          aria-label="Retour en haut"
        >
          <i className="bi bi-arrow-up"></i>
        </Button>
      )}
    </>
  )
}

export default ScrollToTop
