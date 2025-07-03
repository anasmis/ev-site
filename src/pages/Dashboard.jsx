import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Nav, Tab, Table, Button, Badge, Form, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchOrders } from '../store/slices/ordersSlice'
import { fetchWishlist } from '../store/slices/wishlistSlice'
import { updateProfile } from '../store/slices/authSlice'
import { toast } from 'react-toastify'

const Dashboard = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { orders, loading: ordersLoading } = useSelector(state => state.orders)
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  
  const [activeTab, setActiveTab] = useState('orders')
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  })

  useEffect(() => {
    dispatch(fetchOrders())
    dispatch(fetchWishlist())
  }, [dispatch])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      await dispatch(updateProfile(profileForm)).unwrap()
      toast.success('Profil mis à jour avec succès !')
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil')
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case 'delivered':
        return 'success'
      case 'processing':
        return 'warning'
      case 'cancelled':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered':
        return 'Livré'
      case 'processing':
        return 'En cours'
      case 'cancelled':
        return 'Annulé'
      case 'pending':
        return 'En attente'
      default:
        return status
    }
  }

  return (
    <div className="dashboard-page py-5">
      <Container>
        <Row>
          <Col>
            <h1 className="mb-4">Tableau de bord</h1>
            <p className="text-muted mb-4">
              Bienvenue {user?.name}, gérez vos commandes et votre profil.
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={3} className="mb-4">
            <Card>
              <Card.Body>
                <div className="text-center mb-3">
                  <div className="bg-primary rounded-circle mx-auto mb-2" style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className="bi bi-person-fill text-white h4 mb-0"></i>
                  </div>
                  <h6 className="mb-0">{user?.name}</h6>
                  <small className="text-muted">{user?.email}</small>
                </div>
                
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="orders"
                      active={activeTab === 'orders'}
                      onClick={() => setActiveTab('orders')}
                    >
                      <i className="bi bi-box-seam me-2"></i>
                      Mes commandes
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="wishlist"
                      active={activeTab === 'wishlist'}
                      onClick={() => setActiveTab('wishlist')}
                    >
                      <i className="bi bi-heart me-2"></i>
                      Liste de souhaits
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="profile"
                      active={activeTab === 'profile'}
                      onClick={() => setActiveTab('profile')}
                    >
                      <i className="bi bi-person me-2"></i>
                      Mon profil
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Tab.Content>
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Mes commandes</h5>
                  </Card.Header>
                  <Card.Body>
                    {ordersLoading ? (
                      <div className="text-center py-4">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Chargement...</span>
                        </div>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="bi bi-box-seam display-4 text-muted"></i>
                        <h4 className="mt-3">Aucune commande</h4>
                        <p className="text-muted">Vous n'avez encore passé aucune commande.</p>
                      </div>
                    ) : (
                      <Table responsive>
                        <thead>
                          <tr>
                            <th>Commande</th>
                            <th>Date</th>
                            <th>Statut</th>
                            <th>Total</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id}>
                              <td>
                                <strong>#{order.id}</strong>
                                <br />
                                <small className="text-muted">
                                  {order.items.length} article{order.items.length > 1 ? 's' : ''}
                                </small>
                              </td>
                              <td>
                                {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                              </td>
                              <td>
                                <Badge bg={getStatusVariant(order.status)}>
                                  {getStatusText(order.status)}
                                </Badge>
                              </td>
                              <td>
                                <strong>{order.total} MAD</strong>
                              </td>
                              <td>
                                <Button variant="outline-primary" size="sm">
                                  <i className="bi bi-eye me-1"></i>
                                  Voir
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </Card.Body>
                </Card>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Liste de souhaits</h5>
                  </Card.Header>
                  <Card.Body>
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="bi bi-heart display-4 text-muted"></i>
                        <h4 className="mt-3">Liste vide</h4>
                        <p className="text-muted">Ajoutez des produits à votre liste de souhaits.</p>
                      </div>
                    ) : (
                      <Row>
                        {wishlistItems.map(item => (
                          <Col md={6} lg={4} key={item.id} className="mb-3">
                            <Card className="h-100">
                              <Card.Img
                                variant="top"
                                src={item.image}
                                alt={item.name}
                                style={{ height: '150px', objectFit: 'cover' }}
                              />
                              <Card.Body className="d-flex flex-column">
                                <Card.Title className="h6">{item.name}</Card.Title>
                                <Card.Text className="text-muted small">
                                  {item.price} MAD
                                </Card.Text>
                                <div className="mt-auto">
                                  <Button variant="primary" size="sm" className="me-2">
                                    <i className="bi bi-cart-plus me-1"></i>
                                    Ajouter
                                  </Button>
                                  <Button variant="outline-danger" size="sm">
                                    <i className="bi bi-trash"></i>
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    )}
                  </Card.Body>
                </Card>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Mon profil</h5>
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleProfileUpdate}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Nom complet</Form.Label>
                            <Form.Control
                              type="text"
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                              placeholder="Votre nom"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              value={profileForm.email}
                              onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                              placeholder="votre@email.com"
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Téléphone</Form.Label>
                            <Form.Control
                              type="tel"
                              value={profileForm.phone}
                              onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                              placeholder="+212 6 00 00 00 00"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Adresse</Form.Label>
                            <Form.Control
                              type="text"
                              value={profileForm.address}
                              onChange={(e) => setProfileForm({...profileForm, address: e.target.value})}
                              placeholder="Votre adresse"
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Button type="submit" variant="primary">
                        <i className="bi bi-check-circle me-2"></i>
                        Mettre à jour le profil
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
