import React, { useState } from 'react'
import { Navbar, Nav, Container, Button, Badge, Dropdown, Form, InputGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { toggleCart } from '../../store/slices/cartSlice'
import { toggleWishlist } from '../../store/slices/wishlistSlice'
import { setSearchQuery, addRecentSearch } from '../../store/slices/uiSlice'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('')
  
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { items: cartItems } = useSelector(state => state.cart)
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const wishlistItemCount = wishlistItems.length

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchInput.trim()) {
      dispatch(setSearchQuery(searchInput))
      dispatch(addRecentSearch(searchInput))
      navigate(`/boutique?search=${encodeURIComponent(searchInput)}`)
      setSearchInput('')
    }
  }

  const handleCartToggle = () => {
    dispatch(toggleCart())
  }

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist())
  }

  return (
    <header className="header">
      <Navbar bg="white" expand="lg" className="py-3 shadow-sm">
        <Container>
          {/* Brand */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <i className="bi bi-battery-charging text-primary me-2" style={{ fontSize: '1.5rem' }}></i>
            <span className="fw-bold text-primary">EV Recharge</span>
          </Navbar.Brand>

          {/* Mobile Toggle */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Main Navigation */}
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="fw-medium">
                Accueil
              </Nav.Link>
              <Nav.Link as={Link} to="/boutique" className="fw-medium">
                Boutique
              </Nav.Link>
              <Nav.Link as={Link} to="/carte-bornes" className="fw-medium">
                Carte des Bornes
              </Nav.Link>
              <Nav.Link as={Link} to="/a-propos" className="fw-medium">
                À Propos
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" className="fw-medium">
                Contact
              </Nav.Link>
            </Nav>

            {/* Search Bar */}
            <Form className="d-flex me-3" onSubmit={handleSearch}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Rechercher des produits..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="search-input"
                />
                <Button variant="outline-primary" type="submit">
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Form>

            {/* Right Side Icons */}
            <div className="d-flex align-items-center">
              {/* Wishlist */}
              <Button 
                variant="link" 
                className="text-dark position-relative me-2 p-2"
                onClick={handleWishlistToggle}
                title="Liste de souhaits"
              >
                <i className="bi bi-heart" style={{ fontSize: '1.2rem' }}></i>
                {wishlistItemCount > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  >
                    {wishlistItemCount}
                  </Badge>
                )}
              </Button>

              {/* Cart */}
              <Button 
                variant="link" 
                className="text-dark position-relative me-3 p-2"
                onClick={handleCartToggle}
                title="Panier"
              >
                <i className="bi bi-cart3" style={{ fontSize: '1.2rem' }}></i>
                {cartItemCount > 0 && (
                  <Badge 
                    bg="primary" 
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" className="text-dark text-decoration-none p-2">
                    <i className="bi bi-person-circle" style={{ fontSize: '1.2rem' }}></i>
                    <span className="ms-2 d-none d-md-inline">{user?.firstName}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/tableau-de-bord">
                      <i className="bi bi-grid me-2"></i>
                      Tableau de bord
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/profil">
                      <i className="bi bi-person me-2"></i>
                      Mon Profil
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/commandes">
                      <i className="bi bi-box-seam me-2"></i>
                      Mes Commandes
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/favoris">
                      <i className="bi bi-heart me-2"></i>
                      Mes Favoris
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Déconnexion
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className="d-flex align-items-center">
                  <Button 
                    as={Link} 
                    to="/connexion" 
                    variant="outline-primary" 
                    size="sm" 
                    className="me-2"
                  >
                    Connexion
                  </Button>
                  <Button 
                    as={Link} 
                    to="/inscription" 
                    variant="primary" 
                    size="sm"
                  >
                    Inscription
                  </Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
