import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge, Alert, Table } from 'react-bootstrap'
import { fetchOrders } from '../store/slices/ordersSlice'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const Orders = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { orders, loading, error } = useSelector(state => state.orders)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders())
    }
  }, [dispatch, user])

  const getStatusVariant = (status) => {
    switch (status) {
      case 'pending':
        return 'warning'
      case 'confirmed':
        return 'info'
      case 'shipped':
        return 'primary'
      case 'delivered':
        return 'success'
      case 'cancelled':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'En attente'
      case 'confirmed':
        return 'Confirmée'
      case 'shipped':
        return 'Expédiée'
      case 'delivered':
        return 'Livrée'
      case 'cancelled':
        return 'Annulée'
      default:
        return status
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          Erreur lors du chargement des commandes: {error}
        </Alert>
      </Container>
    )
  }

  if (!orders || orders.length === 0) {
    return (
      <Container className="py-5">
        <Row>
          <Col className="text-center">
            <div className="py-5">
              <i className="bi bi-bag fs-1 text-muted mb-4"></i>
              <h2>Aucune commande trouvée</h2>
              <p className="text-muted mb-4">
                Vous n'avez pas encore passé de commande
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
              <h1 className="display-5">Mes commandes</h1>
              <Badge bg="primary" pill>
                {orders.length} commande{orders.length > 1 ? 's' : ''}
              </Badge>
            </div>
          </Col>
        </Row>

        <Row>
          {orders.map(order => (
            <Col key={order.id} className="mb-4">
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">Commande #{order.id}</h5>
                    <small className="text-muted">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </small>
                  </div>
                  <div>
                    <Badge bg={getStatusVariant(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </Card.Header>
                
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <h6>Articles commandés:</h6>
                      <div className="table-responsive">
                        <Table size="sm" className="mb-0">
                          <thead>
                            <tr>
                              <th>Produit</th>
                              <th>Quantité</th>
                              <th>Prix unitaire</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map(item => (
                              <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price.toLocaleString()} MAD</td>
                                <td>{(item.price * item.quantity).toLocaleString()} MAD</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Col>
                    
                    <Col md={4}>
                      <div className="border-start ps-3">
                        <h6>Adresse de livraison:</h6>
                        <p className="mb-2 small">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                          {order.shippingAddress.address}<br />
                          {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                        </p>
                        
                        <h6>Mode de paiement:</h6>
                        <p className="mb-2 small">
                          {order.paymentMethod === 'card' && 'Carte bancaire'}
                          {order.paymentMethod === 'cash' && 'Paiement à la livraison'}
                          {order.paymentMethod === 'transfer' && 'Virement bancaire'}
                        </p>
                        
                        <div className="text-end">
                          <h5 className="text-primary mb-0">
                            Total: {order.total.toLocaleString()} MAD
                          </h5>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
                
                <Card.Footer className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      {order.trackingNumber && (
                        <>Numéro de suivi: {order.trackingNumber}</>
                      )}
                    </small>
                    <div>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => navigate(`/commande/${order.id}`)}
                        className="me-2"
                      >
                        Voir détails
                      </Button>
                      {order.status === 'pending' && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                        >
                          Annuler
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        
        <Row className="mt-4">
          <Col className="text-center">
            <Button
              variant="primary"
              onClick={() => navigate('/boutique')}
              size="lg"
            >
              Continuer les achats
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Orders
