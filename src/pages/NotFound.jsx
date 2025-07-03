import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="not-found-page min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="text-center">
          <Col>
            <div className="display-1 text-primary mb-4">404</div>
            <h1 className="mb-4">Page Non Trouvée</h1>
            <p className="text-muted mb-4">
              La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            <Button as={Link} to="/" variant="primary" size="lg">
              Retour à l'accueil
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NotFound
