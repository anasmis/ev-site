import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Button, Badge, Alert, Table, Timeline } from 'react-bootstrap'
import { fetchOrderById } from '../store/slices/ordersSlice'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const OrderDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { selectedOrder, loading, error } = useSelector(state => state.orders)

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id))
    }
  }, [dispatch, id])

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
          Erreur lors du chargement de la commande: {error}
        </Alert>
      </Container>
    )
  }

  if (!selectedOrder) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          Commande non trouvée
        </Alert>
      </Container>
    )
  }

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h1 className="display-6">Commande #{selectedOrder.id}</h1>
                <p className="text-muted mb-0">
                  Passée le {new Date(selectedOrder.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <Badge bg={getStatusVariant(selectedOrder.status)} className="fs-6">
                  {getStatusText(selectedOrder.status)}
                </Badge>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="mb-4">
              <Card.Header>
                <h5>Articles commandés</h5>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>Produit</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map(item => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              />
                              <div>
                                <h6 className="mb-1">{item.name}</h6>
                                <small className="text-muted">{item.description}</small>
                              </div>
                            </div>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.price.toLocaleString()} MAD</td>
                          <td><strong>{(item.price * item.quantity).toLocaleString()} MAD</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Suivi de commande</h5>
              </Card.Header>
              <Card.Body>
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-marker bg-success"></div>
                    <div className="timeline-content">
                      <h6>Commande passée</h6>
                      <p className="text-muted mb-0">
                        {new Date(selectedOrder.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>
                  
                  {selectedOrder.status !== 'pending' && (
                    <div className="timeline-item">
                      <div className="timeline-marker bg-info"></div>
                      <div className="timeline-content">
                        <h6>Commande confirmée</h6>
                        <p className="text-muted mb-0">
                          {new Date(selectedOrder.confirmedAt || selectedOrder.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {['shipped', 'delivered'].includes(selectedOrder.status) && (
                    <div className="timeline-item">
                      <div className="timeline-marker bg-primary"></div>
                      <div className="timeline-content">
                        <h6>Commande expédiée</h6>
                        <p className="text-muted mb-0">
                          {selectedOrder.trackingNumber && `Numéro de suivi: ${selectedOrder.trackingNumber}`}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {selectedOrder.status === 'delivered' && (
                    <div className="timeline-item">
                      <div className="timeline-marker bg-success"></div>
                      <div className="timeline-content">
                        <h6>Commande livrée</h6>
                        <p className="text-muted mb-0">
                          {new Date(selectedOrder.deliveredAt || selectedOrder.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header>
                <h5>Récapitulatif</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Sous-total:</span>
                  <span>{selectedOrder.subtotal?.toLocaleString() || selectedOrder.total.toLocaleString()} MAD</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Livraison:</span>
                  <span>{selectedOrder.shippingCost || 'Gratuite'}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Taxes:</span>
                  <span>{selectedOrder.taxes || '0'} MAD</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong className="text-primary">{selectedOrder.total.toLocaleString()} MAD</strong>
                </div>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Adresse de livraison</h5>
              </Card.Header>
              <Card.Body>
                <address>
                  <strong>
                    {selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}
                  </strong><br />
                  {selectedOrder.shippingAddress.address}<br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}<br />
                  {selectedOrder.shippingAddress.phone && (
                    <>Tél: {selectedOrder.shippingAddress.phone}</>
                  )}
                </address>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h5>Mode de paiement</h5>
              </Card.Header>
              <Card.Body>
                <p className="mb-0">
                  {selectedOrder.paymentMethod === 'card' && 'Carte bancaire'}
                  {selectedOrder.paymentMethod === 'cash' && 'Paiement à la livraison'}
                  {selectedOrder.paymentMethod === 'transfer' && 'Virement bancaire'}
                </p>
              </Card.Body>
            </Card>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                onClick={() => navigate('/commandes')}
              >
                Retour aux commandes
              </Button>
              
              {selectedOrder.status === 'pending' && (
                <Button variant="outline-danger">
                  Annuler la commande
                </Button>
              )}
              
              {selectedOrder.status === 'delivered' && (
                <Button variant="outline-primary">
                  Télécharger la facture
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default OrderDetail
