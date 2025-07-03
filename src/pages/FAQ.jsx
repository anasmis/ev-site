import React, { useState } from 'react'
import { Container, Row, Col, Accordion, Card, Button, Form, InputGroup } from 'react-bootstrap'

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const faqData = [
    {
      id: 1,
      category: 'Véhicules électriques',
      question: 'Quelle est l\'autonomie moyenne des véhicules électriques ?',
      answer: 'L\'autonomie varie selon le modèle, mais la plupart de nos véhicules offrent entre 200 et 500 km d\'autonomie avec une charge complète. Les nouveaux modèles atteignent même 600 km ou plus.'
    },
    {
      id: 2,
      category: 'Bornes de recharge',
      question: 'Où puis-je trouver des bornes de recharge ?',
      answer: 'Vous pouvez utiliser notre carte interactive des bornes de recharge pour localiser les stations près de chez vous. Nous avons un réseau en expansion constante à travers le Maroc.'
    },
    {
      id: 3,
      category: 'Achat et financement',
      question: 'Quelles sont les options de financement disponibles ?',
      answer: 'Nous proposons plusieurs options : achat comptant, crédit automobile, leasing, et location avec option d\'achat. Contactez notre équipe commerciale pour plus d\'informations.'
    },
    {
      id: 4,
      category: 'Maintenance',
      question: 'La maintenance des véhicules électriques est-elle plus coûteuse ?',
      answer: 'Non, au contraire ! Les véhicules électriques nécessitent moins de maintenance que les véhicules thermiques. Pas de vidange, moins de pièces d\'usure, et des coûts d\'entretien généralement réduits.'
    },
    {
      id: 5,
      category: 'Recharge',
      question: 'Combien de temps faut-il pour recharger une voiture électrique ?',
      answer: 'Cela dépend du type de borne et de la batterie. Sur une borne rapide, comptez 30-60 minutes pour 80% de charge. Sur une prise domestique, entre 6-12 heures pour une charge complète.'
    },
    {
      id: 6,
      category: 'Garantie',
      question: 'Quelle est la garantie sur les batteries ?',
      answer: 'Nos véhicules sont garantis 8 ans ou 160 000 km pour la batterie. Cette garantie couvre 70% de la capacité minimum de la batterie.'
    },
    {
      id: 7,
      category: 'Installation',
      question: 'Peut-on installer une borne de recharge à domicile ?',
      answer: 'Oui, nous proposons l\'installation de bornes de recharge domestiques. Notre équipe technique peut étudier votre installation et vous proposer la solution la plus adaptée.'
    },
    {
      id: 8,
      category: 'Écologie',
      question: 'Les véhicules électriques sont-ils vraiment écologiques ?',
      answer: 'Oui, les véhicules électriques produisent zéro émission locale et leur bilan carbone global est significativement meilleur que les véhicules thermiques, surtout avec l\'électricité renouvelable.'
    }
  ]

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = [...new Set(faqData.map(item => item.category))]

  return (
    <div className="py-5">
      <Container>
        <Row>
          <Col>
            <div className="text-center mb-5">
              <h1 className="display-4 mb-4">Foire aux questions</h1>
              <p className="lead">
                Trouvez rapidement les réponses à vos questions les plus fréquentes
              </p>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            <div className="mb-4">
              <InputGroup size="lg">
                <Form.Control
                  type="text"
                  placeholder="Rechercher dans les questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-primary">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </div>

            <div className="mb-4">
              <div className="d-flex flex-wrap gap-2">
                <Button
                  variant={searchTerm === '' ? 'primary' : 'outline-primary'}
                  size="sm"
                  onClick={() => setSearchTerm('')}
                >
                  Toutes les catégories
                </Button>
                {categories.map(category => (
                  <Button
                    key={category}
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setSearchTerm(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <Accordion defaultActiveKey="0" className="mb-5">
              {filteredFAQ.map((item, index) => (
                <Accordion.Item key={item.id} eventKey={index.toString()}>
                  <Accordion.Header>
                    <div>
                      <div className="fw-bold">{item.question}</div>
                      <small className="text-muted">{item.category}</small>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <p className="mb-0">{item.answer}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>

            {filteredFAQ.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-question-circle fs-1 text-muted mb-3"></i>
                <h4>Aucune question trouvée</h4>
                <p className="text-muted mb-4">
                  Essayez avec d\'autres mots-clés ou parcourez toutes les catégories
                </p>
                <Button variant="primary" onClick={() => setSearchTerm('')}>
                  Voir toutes les questions
                </Button>
              </div>
            )}
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="text-center bg-light">
              <Card.Body className="py-5">
                <h4>Vous ne trouvez pas la réponse à votre question ?</h4>
                <p className="text-muted mb-4">
                  Notre équipe est là pour vous aider. N\'hésitez pas à nous contacter.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="primary" href="/contact">
                    Nous contacter
                  </Button>
                  <Button variant="outline-primary" href="tel:+212522000000">
                    <i className="bi bi-telephone me-2"></i>
                    Appeler
                  </Button>
                  <Button variant="outline-primary" href="mailto:support@evborne.ma">
                    <i className="bi bi-envelope me-2"></i>
                    Email
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

export default FAQ
