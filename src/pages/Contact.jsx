import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { submitContactForm } from '../store/slices/contactSlice'

const Contact = () => {
  const dispatch = useDispatch()
  const { loading, successMessage, errorMessage } = useSelector(state => state.contact)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(submitContactForm(formData))
  }

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col lg={8} className="mx-auto">
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4">Contactez-nous</h1>
              <p className="lead">
                Vous avez des questions ? N'hésitez pas à nous contacter.
              </p>
            </div>

            {successMessage && (
              <Alert variant="success" className="mb-4">
                {successMessage}
              </Alert>
            )}

            {errorMessage && (
              <Alert variant="danger" className="mb-4">
                {errorMessage}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nom complet</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
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
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Sujet</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Envoi en cours...' : 'Envoyer le message'}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col md={4} className="text-center mb-4">
            <div className="p-4 bg-light rounded">
              <i className="bi bi-geo-alt fs-1 text-primary mb-3"></i>
              <h5>Adresse</h5>
              <p>123 Rue de l'Électricité<br />Casablanca, Maroc</p>
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="p-4 bg-light rounded">
              <i className="bi bi-telephone fs-1 text-primary mb-3"></i>
              <h5>Téléphone</h5>
              <p>+212 522 000 000</p>
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="p-4 bg-light rounded">
              <i className="bi bi-envelope fs-1 text-primary mb-3"></i>
              <h5>Email</h5>
              <p>contact@evborne.ma</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact
