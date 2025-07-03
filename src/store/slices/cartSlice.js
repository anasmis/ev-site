import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('evCart')
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return []
  }
}

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('evCart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

const initialState = {
  items: loadCartFromStorage(),
  total: 0,
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  isOpen: false,
  loading: false,
  error: null,
  couponCode: '',
  appliedCoupon: null,
  shippingMethod: 'standard',
  shippingMethods: [
    { id: 'standard', name: 'Livraison Standard', price: 50, days: '5-7 jours' },
    { id: 'express', name: 'Livraison Express', price: 100, days: '2-3 jours' },
    { id: 'pickup', name: 'Retrait en magasin', price: 0, days: 'Immédiat' }
  ]
}

const calculateTotals = (items, shipping = 0, discount = 0) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.2 // 20% TVA
  const total = subtotal + tax + shipping - discount
  return { subtotal, tax, total }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        existingItem.quantity += 1
        toast.success(`Quantité de ${product.name} mise à jour dans le panier`)
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          brand: product.brand,
          quantity: 1,
          maxQuantity: product.stock || 10
        })
        toast.success(`${product.name} ajouté au panier`)
      }
      
      const totals = calculateTotals(state.items, state.shipping, state.discount)
      state.subtotal = totals.subtotal
      state.tax = totals.tax
      state.total = totals.total
      
      saveCartToStorage(state.items)
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.id === productId)
      
      if (item) {
        state.items = state.items.filter(item => item.id !== productId)
        toast.info(`${item.name} retiré du panier`)
        
        const totals = calculateTotals(state.items, state.shipping, state.discount)
        state.subtotal = totals.subtotal
        state.tax = totals.tax
        state.total = totals.total
        
        saveCartToStorage(state.items)
      }
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item && quantity > 0 && quantity <= item.maxQuantity) {
        item.quantity = quantity
        
        const totals = calculateTotals(state.items, state.shipping, state.discount)
        state.subtotal = totals.subtotal
        state.tax = totals.tax
        state.total = totals.total
        
        saveCartToStorage(state.items)
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.tax = 0
      state.total = 0
      state.discount = 0
      state.appliedCoupon = null
      state.couponCode = ''
      
      saveCartToStorage([])
      toast.info('Panier vidé')
    },
    
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    
    setCartOpen: (state, action) => {
      state.isOpen = action.payload
    },
    
    applyCoupon: (state, action) => {
      const { code, discount } = action.payload
      state.couponCode = code
      state.appliedCoupon = { code, discount }
      state.discount = discount
      
      const totals = calculateTotals(state.items, state.shipping, state.discount)
      state.subtotal = totals.subtotal
      state.tax = totals.tax
      state.total = totals.total
      
      toast.success(`Code promo ${code} appliqué`)
    },
    
    removeCoupon: (state) => {
      state.couponCode = ''
      state.appliedCoupon = null
      state.discount = 0
      
      const totals = calculateTotals(state.items, state.shipping, state.discount)
      state.subtotal = totals.subtotal
      state.tax = totals.tax
      state.total = totals.total
      
      toast.info('Code promo retiré')
    },
    
    setShippingMethod: (state, action) => {
      const method = state.shippingMethods.find(m => m.id === action.payload)
      if (method) {
        state.shippingMethod = method.id
        state.shipping = method.price
        
        const totals = calculateTotals(state.items, state.shipping, state.discount)
        state.subtotal = totals.subtotal
        state.tax = totals.tax
        state.total = totals.total
      }
    },
    
    initializeCart: (state) => {
      const totals = calculateTotals(state.items, state.shipping, state.discount)
      state.subtotal = totals.subtotal
      state.tax = totals.tax
      state.total = totals.total
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  setCartOpen,
  applyCoupon,
  removeCoupon,
  setShippingMethod,
  initializeCart
} = cartSlice.actions

export default cartSlice.reducer
