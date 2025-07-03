import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from 'react-bootstrap'
import { updateProfile } from '../store/slices/authSlice'

const Profile = () => {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector(state => state.auth)
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || ''
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
    
    try {
      await dispatch(updateProfile(formData))
      setAlertMessage('Profil mis à jour avec succès!')
      setAlertVariant('success')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    } catch (error) {
      setAlertMessage('Erreur lors de la mise à jour du profil')
      setAlertVariant('danger')
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="display-5">Mon profil</h1>
              <Badge bg="primary" pill>
                {user?.accountType || 'Membre'}
              </Badge>
            </div>
          </Col>
        </Row>

        {showAlert && (
          <Alert variant={alertVariant} className="mb-4">
            {alertMessage}
          </Alert>
        )}

        <Row>
          <Col lg={8}>
            <Card>
              <Card.Header>
                <h5>Informations personnelles</h5>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
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

                  <Form.Group className="mb-3">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Adresse</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
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
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? 'Mise à jour...' : 'Mettre à jour le profil'}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          
          <Col lg={4}>
            <Card className="mb-4">
              <Card.Header>
                <h5>Informations du compte</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  <strong>Membre depuis:</strong><br />
                  <small className="text-muted">
                    {user?.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      : 'N/A'
                    }
                  </small>
                </div>
                
                <div className="mb-3">
                  <strong>Statut du compte:</strong><br />
                  <Badge bg="success">Actif</Badge>
                </div>
                
                <div className="mb-3">
                  <strong>Type de compte:</strong><br />
                  <Badge bg="primary">{user?.accountType || 'Membre'}</Badge>
                </div>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h5>Sécurité</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary" size="sm">
                    Changer le mot de passe
                  </Button>
                  <Button variant="outline-secondary" size="sm">
                    Paramètres de confidentialité
                  </Button>
                  <Button variant="outline-warning" size="sm">
                    Activer l'authentification à deux facteurs
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

export default Profile
