import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Card, Button, Form, Badge, ListGroup, Alert } from 'react-bootstrap'
import { fetchStations } from '../store/slices/stationsSlice'
import LoadingSpinner from '../components/Common/LoadingSpinner'

const StationsMap = () => {
  const dispatch = useDispatch()
  const { stations, loading, error } = useSelector(state => state.stations)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedType, setSelectedType] = useState('')

  useEffect(() => {
    dispatch(fetchStations())
  }, [dispatch])

  const cities = [...new Set(stations.map(station => station.city))]
  const types = [...new Set(stations.map(station => station.type))]

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         station.city.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = selectedCity === '' || station.city === selectedCity
    const matchesType = selectedType === '' || station.type === selectedType
    
    return matchesSearch && matchesCity && matchesType
  })

  const getStatusVariant = (status) => {
    switch (status) {
      case 'available':
        return 'success'
      case 'occupied':
        return 'warning'
      case 'maintenance':
        return 'danger'
      default:
        return 'secondary'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Disponible'
      case 'occupied':
        return 'Occupé'
      case 'maintenance':
        return 'Maintenance'
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
          Erreur lors du chargement des stations: {error}
        </Alert>
      </Container>
    )
  }

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4">Carte des bornes de recharge</h1>
              <p className="lead">
                Trouvez facilement les bornes de recharge près de chez vous
              </p>
            </div>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="mb-4">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Rechercher par nom, adresse ou ville..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Form.Select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="">Toutes les villes</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Tous les types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setSearchTerm('')
                setSelectedCity('')
                setSelectedType('')
              }}
            >
              Réinitialiser
            </Button>
          </Col>
        </Row>

        {/* Map Placeholder */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body className="p-0">
                <div 
                  className="bg-light d-flex align-items-center justify-content-center text-muted"
                  style={{ height: '400px' }}
                >
                  <div className="text-center">
                    <i className="bi bi-map fs-1 mb-3"></i>
                    <h5>Carte interactive</h5>
                    <p>La carte interactive sera bientôt disponible</p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Stations List */}
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3>Stations disponibles</h3>
              <Badge bg="primary" pill>
                {filteredStations.length} station{filteredStations.length > 1 ? 's' : ''}
              </Badge>
            </div>
          </Col>
        </Row>

        {filteredStations.length === 0 ? (
          <Row>
            <Col className="text-center py-5">
              <i className="bi bi-exclamation-circle fs-1 text-muted mb-3"></i>
              <h4>Aucune station trouvée</h4>
              <p className="text-muted">
                Essayez de modifier vos critères de recherche
              </p>
            </Col>
          </Row>
        ) : (
          <Row>
            {filteredStations.map(station => (
              <Col key={station.id} md={6} lg={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h5>{station.name}</h5>
                      <Badge bg={getStatusVariant(station.status)}>
                        {getStatusText(station.status)}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <small className="text-muted">
                        <i className="bi bi-geo-alt me-1"></i>
                        {station.address}, {station.city}
                      </small>
                    </div>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Type:</span>
                        <Badge bg="secondary">{station.type}</Badge>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Puissance:</span>
                        <span>{station.power}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span>Prix:</span>
                        <span>{station.price}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h6>Connecteurs disponibles:</h6>
                      <div className="d-flex flex-wrap gap-1">
                        {station.connectors.map((connector, index) => (
                          <Badge key={index} bg="outline-primary" className="text-dark">
                            {connector}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h6>Horaires:</h6>
                      <small className="text-muted">
                        {station.hours || '24h/24 - 7j/7'}
                      </small>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        disabled={station.status !== 'available'}
                      >
                        <i className="bi bi-navigation me-2"></i>
                        Itinéraire
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                      >
                        <i className="bi bi-info-circle me-2"></i>
                        Plus d'infos
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Legend */}
        <Row className="mt-5">
          <Col>
            <Card>
              <Card.Header>
                <h5>Légende</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h6>Statut des bornes:</h6>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>Disponible</span>
                        <Badge bg="success">Disponible</Badge>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>Occupé</span>
                        <Badge bg="warning">Occupé</Badge>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>En maintenance</span>
                        <Badge bg="danger">Maintenance</Badge>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={6}>
                    <h6>Types de bornes:</h6>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Normale:</strong> 3-7 kW (charge lente)
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Accélérée:</strong> 11-22 kW (charge semi-rapide)
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Rapide:</strong> 50+ kW (charge rapide)
                      </ListGroup.Item>
                    </ListGroup>
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

export default StationsMap
