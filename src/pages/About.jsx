import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

const About = () => {
  return (
    <div className="py-5">
      <Container>
        {/* Hero Section */}
        <Row className="mb-5">
          <Col>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4">À propos d'EVBorne</h1>
              <p className="lead">
                Votre partenaire de confiance pour la transition vers la mobilité électrique au Maroc
              </p>
            </div>
          </Col>
        </Row>

        {/* Mission Section */}
        <Row className="mb-5">
          <Col lg={6}>
            <img 
              src="/images/businesswoman-using-tablet-analysis.jpg" 
              alt="Notre mission" 
              className="img-fluid rounded shadow"
            />
          </Col>
          <Col lg={6} className="d-flex align-items-center">
            <div>
              <h2>Notre Mission</h2>
              <p className="mb-4">
                Chez EVBorne, nous nous engageons à accélérer l'adoption des véhicules électriques au Maroc 
                en proposant les meilleures solutions de mobilité électrique, des véhicules de qualité aux 
                infrastructures de recharge innovantes.
              </p>
              <p className="mb-4">
                Notre objectif est de rendre la mobilité électrique accessible à tous, tout en contribuant 
                à un environnement plus propre et à un avenir plus durable pour le Maroc.
              </p>
              <Button variant="primary" href="/contact">
                Contactez-nous
              </Button>
            </div>
          </Col>
        </Row>

        {/* Values Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-5">Nos Valeurs</h2>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 shadow-sm">
              <Card.Body className="py-5">
                <div className="mb-4">
                  <i className="bi bi-leaf fs-1 text-success"></i>
                </div>
                <h5>Durabilité</h5>
                <p className="text-muted">
                  Nous privilégions des solutions respectueuses de l'environnement 
                  pour construire un avenir plus vert.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 shadow-sm">
              <Card.Body className="py-5">
                <div className="mb-4">
                  <i className="bi bi-lightning-charge fs-1 text-warning"></i>
                </div>
                <h5>Innovation</h5>
                <p className="text-muted">
                  Nous investissons dans les technologies les plus avancées 
                  pour offrir des solutions de pointe.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 shadow-sm">
              <Card.Body className="py-5">
                <div className="mb-4">
                  <i className="bi bi-people fs-1 text-primary"></i>
                </div>
                <h5>Service Client</h5>
                <p className="text-muted">
                  Nous nous engageons à fournir un service client exceptionnel 
                  et un accompagnement personnalisé.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stats Section */}
        <Row className="mb-5">
          <Col>
            <Card className="bg-primary text-white">
              <Card.Body className="py-5">
                <h2 className="text-center mb-5">EVBorne en chiffres</h2>
                <Row className="text-center">
                  <Col md={3} className="mb-4">
                    <h3 className="display-4">500+</h3>
                    <p>Véhicules vendus</p>
                  </Col>
                  <Col md={3} className="mb-4">
                    <h3 className="display-4">50+</h3>
                    <p>Bornes installées</p>
                  </Col>
                  <Col md={3} className="mb-4">
                    <h3 className="display-4">95%</h3>
                    <p>Clients satisfaits</p>
                  </Col>
                  <Col md={3} className="mb-4">
                    <h3 className="display-4">24/7</h3>
                    <p>Support client</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Services Section */}
        <Row className="mb-5">
          <Col>
            <h2 className="text-center mb-5">Nos Services</h2>
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-car-front fs-3 text-primary me-3"></i>
                  <h5>Vente de véhicules électriques</h5>
                </div>
                <p className="text-muted">
                  Large gamme de véhicules électriques pour tous les besoins : 
                  citadines, SUV, utilitaires, et véhicules de luxe.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-plug fs-3 text-primary me-3"></i>
                  <h5>Installation de bornes de recharge</h5>
                </div>
                <p className="text-muted">
                  Installation professionnelle de bornes de recharge à domicile 
                  et en entreprise avec maintenance incluse.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-tools fs-3 text-primary me-3"></i>
                  <h5>Maintenance et réparation</h5>
                </div>
                <p className="text-muted">
                  Service après-vente complet avec des techniciens certifiés 
                  et des pièces de rechange d'origine.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-credit-card fs-3 text-primary me-3"></i>
                  <h5>Solutions de financement</h5>
                </div>
                <p className="text-muted">
                  Options de financement flexibles adaptées à votre budget : 
                  crédit, leasing, et location longue durée.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA Section */}
        <Row>
          <Col>
            <Card className="text-center bg-light">
              <Card.Body className="py-5">
                <h3>Rejoignez la révolution électrique</h3>
                <p className="text-muted mb-4">
                  Découvrez notre gamme complète de véhicules électriques et trouvez 
                  celui qui correspond à vos besoins.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="primary" size="lg" href="/boutique">
                    Voir nos véhicules
                  </Button>
                  <Button variant="outline-primary" size="lg" href="/carte-bornes">
                    Carte des bornes
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default About
