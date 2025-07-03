import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Badge, Card, Form, Alert } from 'react-bootstrap'
import { fetchProductById } from '../store/slices/productsSlice'
import { addToCart } from '../store/slices/cartSlice'
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { selectedProduct, loading, error } = useSelector(state => state.products)
  const { items: cartItems } = useSelector(state => state.cart)
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  
  const [quantity, setQuantity] = useState(1)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('success')

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  const isInWishlist = wishlistItems.some(item => item.id === parseInt(id))
  const isInCart = cartItems.some(item => item.id === parseInt(id))

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addToCart({ ...selectedProduct, quantity }))
      setAlertMessage('Produit ajouté au panier avec succès!')
      setAlertVariant('success')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const handleWishlistToggle = () => {
    if (selectedProduct) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(selectedProduct.id))
        setAlertMessage('Produit retiré des favoris')
        setAlertVariant('info')
      } else {
        dispatch(addToWishlist(selectedProduct))
        setAlertMessage('Produit ajouté aux favoris')
        setAlertVariant('success')
      }
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const handleGoToCart = () => {
    navigate('/panier')
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Erreur lors du chargement du produit: {error}
        </Alert>
      </Container>
    )
  }

  if (!selectedProduct) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Produit non trouvé
        </Alert>
      </Container>
    )
  }

  return (
    <div className="py-5">
      <Container>
        {showAlert && (
          <Alert variant={alertVariant} className="mb-4">
            {alertMessage}
          </Alert>
        )}
        
        <Row>
          <Col md={6}>
            <div className="product-image-container">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="img-fluid rounded shadow"
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </div>
          </Col>
          
          <Col md={6}>
            <div className="product-info">
              <h1 className="display-5 mb-3">{selectedProduct.name}</h1>
              
              <div className="mb-3">
                <Badge 
                  bg={selectedProduct.category === 'Électrique' ? 'primary' : 'secondary'}
                  className="me-2"
                >
                  {selectedProduct.category}
                </Badge>
                <Badge bg={selectedProduct.inStock ? 'success' : 'danger'}>
                  {selectedProduct.inStock ? 'En stock' : 'Rupture de stock'}
                </Badge>
              </div>

              <div className="price-section mb-4">
                <h3 className="text-primary mb-0">
                  {selectedProduct.price.toLocaleString()} MAD
                </h3>
                {selectedProduct.oldPrice && (
                  <span className="text-muted text-decoration-line-through">
                    {selectedProduct.oldPrice.toLocaleString()} MAD
                  </span>
                )}
              </div>

              <p className="lead mb-4">{selectedProduct.description}</p>

              <div className="specifications mb-4">
                <h5>Spécifications</h5>
                <ul className="list-unstyled">
                  <li><strong>Autonomie:</strong> {selectedProduct.range || 'N/A'}</li>
                  <li><strong>Vitesse max:</strong> {selectedProduct.maxSpeed || 'N/A'}</li>
                  <li><strong>Temps de charge:</strong> {selectedProduct.chargingTime || 'N/A'}</li>
                  <li><strong>Puissance:</strong> {selectedProduct.power || 'N/A'}</li>
                </ul>
              </div>

              <Card className="mb-4">
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Quantité</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        style={{ width: '100px' }}
                      />
                    </Form.Group>
                  </Form>
                  
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleAddToCart}
                      disabled={!selectedProduct.inStock}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      {isInCart ? 'Ajouté au panier' : 'Ajouter au panier'}
                    </Button>
                    
                    <Button
                      variant="outline-primary"
                      onClick={handleWishlistToggle}
                    >
                      <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                      {isInWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    </Button>
                    
                    {isInCart && (
                      <Button
                        variant="success"
                        onClick={handleGoToCart}
                      >
                        <i className="bi bi-cart-check me-2"></i>
                        Voir le panier
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
        
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Body>
                <h4>Description détaillée</h4>
                <p>{selectedProduct.longDescription || selectedProduct.description}</p>
                
                <h5 className="mt-4">Caractéristiques techniques</h5>
                <Row>
                  <Col md={6}>
                    <ul className="list-unstyled">
                      <li><strong>Type:</strong> {selectedProduct.type || 'Véhicule électrique'}</li>
                      <li><strong>Marque:</strong> {selectedProduct.brand || 'EVBorne'}</li>
                      <li><strong>Modèle:</strong> {selectedProduct.model || selectedProduct.name}</li>
                      <li><strong>Année:</strong> {selectedProduct.year || '2024'}</li>
                    </ul>
                  </Col>
                  <Col md={6}>
                    <ul className="list-unstyled">
                      <li><strong>Couleur:</strong> {selectedProduct.color || 'Disponible en plusieurs couleurs'}</li>
                      <li><strong>Garantie:</strong> {selectedProduct.warranty || '2 ans'}</li>
                      <li><strong>Service:</strong> {selectedProduct.service || 'Support technique inclus'}</li>
                    </ul>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProductDetail
