import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeCart } from './store/slices/cartSlice'
import { initializeUI } from './store/slices/uiSlice'

// Layout Components
import Header from './components/Layout/Header'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Common/ScrollToTop'
import LoadingSpinner from './components/Common/LoadingSpinner'

// Pages
import Home from './pages/Home'
import Boutique from './pages/Boutique'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { 
  ProductDetail, 
  Checkout, 
  Profile, 
  Orders, 
  OrderDetail, 
  Wishlist, 
  About, 
  FAQ, 
  StationsMap 
} from './pages/index.jsx'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

// Protected Route Component
import ProtectedRoute from './components/Common/ProtectedRoute'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    // Initialize app state
    dispatch(initializeCart())
    dispatch(initializeUI())
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/carte-bornes" element={<StationsMap />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/tableau-de-bord" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/profil" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/commandes" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/commande/:id" element={
            <ProtectedRoute>
              <OrderDetail />
            </ProtectedRoute>
          } />
          <Route path="/favoris" element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
