import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap'
import { removeFromWishlist, clearWishlist } from '../store/slices/wishlistSlice'
import { addToCart } from '../store/slices/cartSlice'

const Wishlist = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  const { items: cartItems } = useSelector(state => state.cart)

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId))
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }))
  }

  const handleClearWishlist = () => {
    dispatch(clearWishlist())
  }

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId)
  }

  if (wishlistItems.length === 0) {
    return (
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <div className="py-5">
              <i className="bi bi-heart fs-1 text-muted mb-4"></i>
              <h2>Votre liste de favoris est vide</h2>
              <p className="text-muted mb-4">
                Découvrez nos produits et ajoutez vos favoris ici
              </p>
              <Button 
                variant="primary" 
                onClick={() => navigate('/boutique')}
                size="lg"
              >
                Découvrir nos produits
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="display-5">Mes favoris</h1>
              <div>
                <span className="text-muted me-3">
                  {wishlistItems.length} article{wishlistItems.length > 1 ? 's' : ''}
                </span>
                {wishlistItems.length > 0 && (
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleClearWishlist}
                  >
                    Vider la liste
                  </Button>
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          {wishlistItems.map(product => (
            <Col key={product.id} lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={product.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="position-absolute top-0 end-0 m-2"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </Button>
                </div>
                
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {product.description}
                  </Card.Text>
                  
                  <div className="mb-3">
                    <h5 className="text-primary mb-0">
                      {product.price.toLocaleString()} MAD
                    </h5>
                    {product.oldPrice && (
                      <small className="text-muted text-decoration-line-through">
                        {product.oldPrice.toLocaleString()} MAD
                      </small>
                    )}
                  </div>
                  
                  <div className="d-grid gap-2">
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock || isInCart(product.id)}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      {!product.inStock 
                        ? 'Rupture de stock' 
                        : isInCart(product.id) 
                          ? 'Déjà dans le panier' 
                          : 'Ajouter au panier'
                      }
                    </Button>
                    
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate(`/produit/${product.id}`)}
                    >
                      Voir les détails
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {wishlistItems.length > 0 && (
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="success"
                size="lg"
                onClick={() => navigate('/panier')}
                className="me-3"
              >
                <i className="bi bi-cart-check me-2"></i>
                Voir le panier
              </Button>
              <Button
                variant="outline-primary"
                size="lg"
                onClick={() => navigate('/boutique')}
              >
                Continuer les achats
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  )
}

export default Wishlist
