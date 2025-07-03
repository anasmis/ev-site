import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, setFilters, clearFilters } from '../store/slices/productsSlice'
import { addToCart } from '../store/slices/cartSlice'
import { addToWishlist } from '../store/slices/wishlistSlice'
import { toast } from 'react-toastify'

const Boutique = () => {
  const dispatch = useDispatch()
  const { products, loading, error, filters } = useSelector(state => state.products)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [filterCategory, setFilterCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 100000])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }))
    toast.success(`${product.name} ajouté au panier !`)
  }

  const handleAddToWishlist = (product) => {
    dispatch(addToWishlist(product))
    toast.success(`${product.name} ajouté à la liste de souhaits !`)
  }

  const handleFilterReset = () => {
    setSearchTerm('')
    setSortBy('name')
    setFilterCategory('all')
    setPriceRange([0, 100000])
    dispatch(clearFilters())
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Erreur</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    )
  }

  return (
    <div className="boutique-page py-5">
      <Container>
        <Row>
          <Col lg={3} className="mb-4">
            <div className="filters-sidebar">
              <h5>Filtres</h5>
              
              {/* Search */}
              <Form.Group className="mb-3">
                <Form.Label>Rechercher</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nom du produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>

              {/* Category Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Catégorie</Form.Label>
                <Form.Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">Toutes les catégories</option>
                  <option value="cables">Câbles de recharge</option>
                  <option value="stations">Stations de recharge</option>
                  <option value="accessories">Accessoires</option>
                  <option value="adapters">Adaptateurs</option>
                </Form.Select>
              </Form.Group>

              {/* Sort */}
              <Form.Group className="mb-3">
                <Form.Label>Trier par</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Nom</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                </Form.Select>
              </Form.Group>

              {/* Price Range */}
              <Form.Group className="mb-3">
                <Form.Label>Prix (MAD)</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  />
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 100000])}
                  />
                </div>
              </Form.Group>

              <Button variant="outline-secondary" onClick={handleFilterReset}>
                Réinitialiser les filtres
              </Button>
            </div>
          </Col>

          <Col lg={9}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1>Boutique</h1>
              <span className="text-muted">
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
              </span>
            </div>

            <Row>
              {sortedProducts.map(product => (
                <Col key={product.id} md={6} lg={4} className="mb-4">
                  <Card className="h-100 product-card">
                    <Card.Img
                      variant="top"
                      src={product.image}
                      alt={product.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text className="text-muted small">
                        {product.description}
                      </Card.Text>
                      <div className="mt-auto">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="h5 text-primary mb-0">
                            {product.price} MAD
                          </span>
                          <small className="text-muted">
                            {product.category}
                          </small>
                        </div>
                        <div className="d-flex gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                          >
                            <i className="bi bi-cart-plus me-1"></i>
                            Ajouter
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleAddToWishlist(product)}
                          >
                            <i className="bi bi-heart"></i>
                          </Button>
                        </div>
                        {!product.inStock && (
                          <small className="text-danger">Rupture de stock</small>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {sortedProducts.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-search display-4 text-muted"></i>
                <h4 className="mt-3">Aucun produit trouvé</h4>
                <p className="text-muted">
                  Essayez de modifier vos critères de recherche ou de filtres.
                </p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Boutique
