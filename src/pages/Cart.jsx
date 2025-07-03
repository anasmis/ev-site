import React from 'react'
import { Container, Row, Col, Card, Button, Table, Form, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateQuantity, removeFromCart, clearCart } from '../store/slices/cartSlice'
import { toast } from 'react-toastify'

const Cart = () => {
  const dispatch = useDispatch()
  const { items, total, totalItems } = useSelector(state => state.cart)

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id))
      toast.info('Produit retiré du panier')
    } else {
      dispatch(updateQuantity({ id, quantity }))
    }
  }

  const handleRemoveItem = (id, name) => {
    dispatch(removeFromCart(id))
    toast.info(`${name} retiré du panier`)
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    toast.info('Panier vidé')
  }

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Row>
          <Col>
            <div className="text-center">
              <i className="bi bi-cart-x display-4 text-muted"></i>
              <h2 className="mt-3">Votre panier est vide</h2>
              <p className="text-muted">
                Découvrez nos produits et ajoutez-les à votre panier !
              </p>
              <Link to="/boutique" className="btn btn-primary">
                Voir la boutique
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <div className="cart-page py-5">
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Panier ({totalItems} article{totalItems > 1 ? 's' : ''})</h1>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={handleClearCart}
              >
                <i className="bi bi-trash me-1"></i>
                Vider le panier
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>Prix unitaire</th>
                      <th>Quantité</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="me-3"
                              style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            />
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                              <small className="text-muted">{item.category}</small>
                            </div>
                          </div>
                        </td>
                        <td>{item.price} MAD</td>
                        <td>
                          <div className="d-flex align-items-center" style={{ maxWidth: '120px' }}>
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <i className="bi bi-dash"></i>
                            </Button>
                            <Form.Control
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 0)}
                              className="mx-2 text-center"
                              min="0"
                              style={{ width: '60px' }}
                            />
                            <Button
                              variant="outline-secondary"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <i className="bi bi-plus"></i>
                            </Button>
                          </div>
                        </td>
                        <td>
                          <strong>{(item.price * item.quantity).toFixed(2)} MAD</strong>
                        </td>
                        <td>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Résumé de commande</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-3">
                  <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                  <span>{total.toFixed(2)} MAD</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Frais de livraison</span>
                  <span>Gratuit</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>TVA (20%)</span>
                  <span>{(total * 0.2).toFixed(2)} MAD</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total</strong>
                  <strong>{(total * 1.2).toFixed(2)} MAD</strong>
                </div>
                
                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg">
                    Procéder au paiement
                  </Button>
                  <Link to="/boutique" className="btn btn-outline-secondary">
                    Continuer mes achats
                  </Link>
                </div>
              </Card.Body>
            </Card>

            <Card className="mt-4">
              <Card.Header>
                <h6 className="mb-0">Informations de livraison</h6>
              </Card.Header>
              <Card.Body>
                <Alert variant="info" className="mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  Livraison gratuite pour toute commande supérieure à 500 MAD
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cart
