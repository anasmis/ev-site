import React from 'react'
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { subscribeToNewsletter } from '../../store/slices/contactSlice'

const Footer = () => {
  const dispatch = useDispatch()

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    if (email) {
      dispatch(subscribeToNewsletter(email))
      e.target.reset()
    }
  }

  return (
    <footer className="footer bg-dark text-light py-5">
      <Container>
        <Row>
          {/* Brand & Description */}
          <Col lg={4} md={6} className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-battery-charging text-primary me-2" style={{ fontSize: '1.5rem' }}></i>
              <h5 className="mb-0 text-white">EV Recharge</h5>
            </div>
            <p className="text-light mb-4">
              Votre partenaire de confiance pour les solutions de recharge électrique au Maroc. 
              Installation, vente et maintenance de bornes de recharge pour véhicules électriques.
            </p>
            <div className="d-flex">
              <a href="#" className="text-light me-3" aria-label="Facebook">
                <i className="bi bi-facebook" style={{ fontSize: '1.2rem' }}></i>
              </a>
              <a href="#" className="text-light me-3" aria-label="Instagram">
                <i className="bi bi-instagram" style={{ fontSize: '1.2rem' }}></i>
              </a>
              <a href="#" className="text-light me-3" aria-label="LinkedIn">
                <i className="bi bi-linkedin" style={{ fontSize: '1.2rem' }}></i>
              </a>
              <a href="#" className="text-light" aria-label="Twitter">
                <i className="bi bi-twitter" style={{ fontSize: '1.2rem' }}></i>
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="text-white mb-3">Liens Rapides</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">Accueil</Link>
              </li>
              <li className="mb-2">
                <Link to="/boutique" className="text-light text-decoration-none">Boutique</Link>
              </li>
              <li className="mb-2">
                <Link to="/carte-bornes" className="text-light text-decoration-none">Carte des Bornes</Link>
              </li>
              <li className="mb-2">
                <Link to="/a-propos" className="text-light text-decoration-none">À Propos</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none">Contact</Link>
              </li>
            </ul>
          </Col>

          {/* Products */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="text-white mb-3">Produits</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/boutique?category=residential" className="text-light text-decoration-none">
                  Chargeurs Résidentiels
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/boutique?category=commercial" className="text-light text-decoration-none">
                  Chargeurs Commerciaux
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/boutique?category=portable" className="text-light text-decoration-none">
                  Chargeurs Portables
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/boutique" className="text-light text-decoration-none">
                  Tous les Produits
                </Link>
              </li>
            </ul>
          </Col>

          {/* Support */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="text-white mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/faq" className="text-light text-decoration-none">FAQ</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none">Support Client</Link>
              </li>
              <li className="mb-2">
                <a href="tel:+212612345678" className="text-light text-decoration-none">
                  +212 6 12 34 56 78
                </a>
              </li>
              <li className="mb-2">
                <a href="mailto:contact@evrecharge.ma" className="text-light text-decoration-none">
                  contact@evrecharge.ma
                </a>
              </li>
            </ul>
          </Col>

          {/* Newsletter */}
          <Col lg={2} md={6} className="mb-4">
            <h6 className="text-white mb-3">Newsletter</h6>
            <p className="text-light mb-3">
              Restez informé des nouveautés et promotions
            </p>
            <Form onSubmit={handleNewsletterSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  required
                />
                <Button variant="primary" type="submit">
                  <i className="bi bi-arrow-right"></i>
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* Bottom Section */}
        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-light mb-0">
              &copy; 2024 EV Recharge. Tous droits réservés.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="d-flex justify-content-md-end">
              <Link to="/mentions-legales" className="text-light text-decoration-none me-3">
                Mentions Légales
              </Link>
              <Link to="/politique-confidentialite" className="text-light text-decoration-none me-3">
                Confidentialité
              </Link>
              <Link to="/cgv" className="text-light text-decoration-none">
                CGV
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
