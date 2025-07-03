import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Form, Button, Card, Alert, ListGroup } from 'react-bootstrap'
import { createOrder } from '../store/slices/ordersSlice'
import { clearCart } from '../store/slices/cartSlice'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { items: cartItems, total } = useSelector(state => state.cart)
  const { user } = useSelector(state => state.auth)
  const { loading, error } = useSelector(state => state.orders)
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'card'
  })
  
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState('success')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (cartItems.length === 0) {
      setAlertMessage('Votre panier est vide')
      setAlertVariant('warning')
      setShowAlert(true)
      return
    }

    try {
      const orderData = {
        items: cartItems,
        total,
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode
        },
        paymentMethod: formData.paymentMethod,
        status: 'pending'
      }

      const result = await dispatch(createOrder(orderData))
      
      if (result.meta.requestStatus === 'fulfilled') {
        dispatch(clearCart())
        setAlertMessage('Commande créée avec succès!')
        setAlertVariant('success')
        setShowAlert(true)
        
        // Redirect to order confirmation after 2 seconds
        setTimeout(() => {
          navigate('/commandes')
        }, 2000)
      }
    } catch (error) {
      setAlertMessage('Erreur lors de la création de la commande')
      setAlertVariant('danger')
      setShowAlert(true)
    }
  }

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <h2>Votre panier est vide</h2>
            <p>Ajoutez des produits à votre panier pour continuer</p>
            <Button onClick={() => navigate('/boutique')}>
              Retourner à la boutique
            </Button>
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
            <h1 className="display-5 mb-4">Finaliser la commande</h1>
          </Col>
        </Row>

        {showAlert && (
          <Alert variant={alertVariant} className="mb-4">
            {alertMessage}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col lg={8}>
              <Card className="mb-4">
                <Card.Header>
                  <h5>Informations de livraison</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Prénom</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Téléphone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Code postal</Form.Label>
                        <Form.Control
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header>
                  <h5>Mode de paiement</h5>
                </Card.Header>
                <Card.Body>
                  <Form.Group>
                    <Form.Check
                      type="radio"
                      id="card"
                      name="paymentMethod"
                      value="card"
                      label="Carte bancaire"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      label="Paiement à la livraison"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={handleChange}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      id="transfer"
                      name="paymentMethod"
                      value="transfer"
                      label="Virement bancaire"
                      checked={formData.paymentMethod === 'transfer'}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card>
                <Card.Header>
                  <h5>Récapitulatif de commande</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {cartItems.map(item => (
                      <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{item.name}</h6>
                          <small className="text-muted">Quantité: {item.quantity}</small>
                        </div>
                        <span className="fw-bold">
                          {(item.price * item.quantity).toLocaleString()} MAD
                        </span>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between">
                    <span>Sous-total:</span>
                    <span>{total.toLocaleString()} MAD</span>
                  </div>
                  
                  <div className="d-flex justify-content-between">
                    <span>Livraison:</span>
                    <span>Gratuite</span>
                  </div>
                  
                  <hr />
                  
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong className="text-primary">{total.toLocaleString()} MAD</strong>
                  </div>
                </Card.Body>
              </Card>

              <div className="d-grid gap-2 mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Traitement...' : 'Confirmer la commande'}
                </Button>
                
                <Button
                  variant="outline-secondary"
                  onClick={() => navigate('/panier')}
                >
                  Retour au panier
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default Checkout
