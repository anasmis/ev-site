import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // Navigate to home page first, then scroll
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.querySelector(sectionId);
    if (element) {
      const navbar = document.querySelector('.navbar');
      const headerHeight = navbar ? navbar.offsetHeight : 0;
      const offsetTop = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsCollapsed(true);
  };

  const handleNavClick = () => {
    setIsCollapsed(true);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi-back"></i>
          <span>Topic</span>
        </Link>

        <div className="d-lg-none ms-auto me-4">
          <button 
            className="navbar-icon bi-person smoothscroll"
            onClick={() => scrollToSection('#top')}
            style={{ border: 'none', background: 'none' }}
          ></button>
        </div>

        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-expanded={!isCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-lg-5 me-lg-auto">
            {location.pathname === '/' ? (
              <>
                <li className="nav-item">
                  <button 
                    className="nav-link click-scroll" 
                    onClick={() => scrollToSection('#section_1')}
                    style={{ border: 'none', background: 'none' }}
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link click-scroll" 
                    onClick={() => scrollToSection('#section_2')}
                    style={{ border: 'none', background: 'none' }}
                  >
                    Browse Topics
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link click-scroll" 
                    onClick={() => scrollToSection('#section_3')}
                    style={{ border: 'none', background: 'none' }}
                  >
                    How it works
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link click-scroll" 
                    onClick={() => scrollToSection('#section_4')}
                    style={{ border: 'none', background: 'none' }}
                  >
                    FAQs
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className="nav-link click-scroll" 
                    onClick={() => scrollToSection('#section_5')}
                    style={{ border: 'none', background: 'none' }}
                  >
                    Contact
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/#section_1" onClick={handleNavClick}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/#section_2" onClick={handleNavClick}>
                    Browse Topics
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/#section_3" onClick={handleNavClick}>
                    How it works
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/#section_4" onClick={handleNavClick}>
                    FAQs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link click-scroll" to="/#section_5" onClick={handleNavClick}>
                    Contact
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="#" 
                id="navbarLightDropdownMenuLink" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Pages
              </a>
              <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="navbarLightDropdownMenuLink">
                <li>
                  <Link 
                    className={`dropdown-item ${location.pathname === '/topics-listing' ? 'active' : ''}`} 
                    to="/topics-listing"
                    onClick={handleNavClick}
                  >
                    Topics Listing
                  </Link>
                </li>
                <li>
                  <Link 
                    className={`dropdown-item ${location.pathname === '/contact' ? 'active' : ''}`} 
                    to="/contact"
                    onClick={handleNavClick}
                  >
                    Contact Form
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="d-none d-lg-block">
            <button 
              className="navbar-icon bi-person smoothscroll"
              onClick={() => scrollToSection('#top')}
              style={{ border: 'none', background: 'none' }}
            ></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;