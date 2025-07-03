import React, { useEffect } from 'react'
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/slices/productsSlice'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const Home = () => {
  const dispatch = useDispatch()
  const { items: products, loading } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(fetchProducts({ limit: 6, featured: true }))
  }, [dispatch])

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3)

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Bornes de Recharge Électriques
              </h1>
              <p className="lead mb-4">
                Solutions complètes pour véhicules électriques au Maroc. 
                Installation, vente et maintenance de bornes de recharge de qualité.
              </p>
              <div className="d-flex gap-3">
                <Button 
                  as={Link} 
                  to="/boutique" 
                  variant="light" 
                  size="lg"
                  className="px-4"
                >
                  Découvrir nos produits
                </Button>
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="outline-light" 
                  size="lg"
                  className="px-4"
                >
                  Demander un devis
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="/src/assets/images/businesswoman-using-tablet-analysis.jpg" 
                alt="Bornes de recharge électriques" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features-section py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="mb-4">Pourquoi Choisir EV Recharge ?</h2>
              <p className="text-muted">
                Nous proposons les meilleures solutions de recharge pour véhicules électriques
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-lightning-charge" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <h5>Recharge Rapide</h5>
                <p className="text-muted">
                  Bornes haute performance jusqu'à 22kW pour une recharge optimale
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="feature-icon bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-shield-check" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <h5>Installation Sécurisée</h5>
                <p className="text-muted">
                  Installation professionnelle par des techniciens certifiés
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="text-center">
                <div className="feature-icon bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className="bi bi-headset" style={{ fontSize: '1.5rem' }}></i>
                </div>
                <h5>Support 24/7</h5>
                <p className="text-muted">
                  Assistance technique et support client disponible 24h/24
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="featured-products py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="mb-4">Produits Phares</h2>
              <p className="text-muted">
                Découvrez nos bornes de recharge les plus populaires
              </p>
            </Col>
          </Row>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row>
              {featuredProducts.map(product => (
                <Col lg={4} md={6} key={product.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img 
                      variant="top" 
                      src={product.image} 
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="text-muted flex-grow-1">
                        {product.description}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <span className="h5 text-primary">{product.price.toLocaleString()} MAD</span>
                          {product.originalPrice && (
                            <small className="text-muted text-decoration-line-through ms-2">
                              {product.originalPrice.toLocaleString()} MAD
                            </small>
                          )}
                        </div>
                        <Button 
                          as={Link} 
                          to={`/produit/${product.id}`} 
                          variant="primary" 
                          size="sm"
                        >
                          Voir détails
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          <Row className="text-center mt-4">
            <Col>
              <Button 
                as={Link} 
                to="/boutique" 
                variant="primary" 
                size="lg"
              >
                Voir tous les produits
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-primary text-white py-5">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="mb-4">Prêt à Passer à l'Électrique ?</h2>
              <p className="lead mb-4">
                Contactez-nous pour une consultation gratuite et un devis personnalisé
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="light" 
                  size="lg"
                >
                  Nous Contacter
                </Button>
                <Button 
                  as={Link} 
                  to="/carte-bornes" 
                  variant="outline-light" 
                  size="lg"
                >
                  Trouver une Borne
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home
