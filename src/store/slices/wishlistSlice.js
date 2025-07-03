import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as wishlistAPI from '../../services/wishlistAPI'
import { toast } from 'react-toastify'

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.getWishlist()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement de la liste de souhaits')
    }
  }
)

export const addToWishlistAPI = createAsyncThunk(
  'wishlist/addToWishlistAPI',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.addToWishlist(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de l\'ajout à la liste de souhaits')
    }
  }
)

export const removeFromWishlistAPI = createAsyncThunk(
  'wishlist/removeFromWishlistAPI',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.removeFromWishlist(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la suppression de la liste de souhaits')
    }
  }
)

export const clearWishlistAPI = createAsyncThunk(
  'wishlist/clearWishlistAPI',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.clearWishlist()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du vidage de la liste de souhaits')
    }
  }
)

const loadWishlistFromStorage = () => {
  try {
    const wishlist = localStorage.getItem('evWishlist')
    return wishlist ? JSON.parse(wishlist) : []
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error)
    return []
  }
}

const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem('evWishlist', JSON.stringify(wishlist))
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error)
  }
}

const initialState = {
  items: loadWishlistFromStorage(),
  loading: false,
  error: null,
  isOpen: false,
  syncLoading: false,
  lastSyncTime: null
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (!existingItem) {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          brand: product.brand,
          addedAt: new Date().toISOString(),
          inStock: product.inStock || true
        })
        
        saveWishlistToStorage(state.items)
        toast.success(`${product.name} ajouté à la liste de souhaits`)
      } else {
        toast.info(`${product.name} est déjà dans votre liste de souhaits`)
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.id === productId)
      
      if (item) {
        state.items = state.items.filter(item => item.id !== productId)
        saveWishlistToStorage(state.items)
        toast.info(`${item.name} retiré de la liste de souhaits`)
      }
    },
    
    clearWishlist: (state) => {
      state.items = []
      saveWishlistToStorage([])
      toast.info('Liste de souhaits vidée')
    },
    
    toggleWishlist: (state) => {
      state.isOpen = !state.isOpen
    },
    
    setWishlistOpen: (state, action) => {
      state.isOpen = action.payload
    },
    
    updateWishlistItem: (state, action) => {
      const { id, updates } = action.payload
      const item = state.items.find(item => item.id === id)
      
      if (item) {
        Object.assign(item, updates)
        saveWishlistToStorage(state.items)
      }
    },
    
    toggleWishlistItem: (state, action) => {
      const productId = action.payload
      const existingItem = state.items.find(item => item.id === productId)
      
      if (existingItem) {
        // Remove from wishlist
        state.items = state.items.filter(item => item.id !== productId)
        saveWishlistToStorage(state.items)
        return { type: 'removed', productId }
      } else {
        // This should be called with full product data
        return { type: 'add_required', productId }
      }
    },
    
    clearError: (state) => {
      state.error = null
    },
    
    sortWishlist: (state, action) => {
      const { sortBy, sortOrder } = action.payload
      
      state.items.sort((a, b) => {
        let aValue = a[sortBy]
        let bValue = b[sortBy]
        
        if (sortBy === 'price') {
          aValue = parseFloat(aValue)
          bValue = parseFloat(bValue)
        } else if (sortBy === 'addedAt') {
          aValue = new Date(aValue)
          bValue = new Date(bValue)
        }
        
        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1
        } else {
          return aValue < bValue ? 1 : -1
        }
      })
      
      saveWishlistToStorage(state.items)
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.syncLoading = true
        state.error = null
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.syncLoading = false
        state.items = action.payload.items
        state.lastSyncTime = new Date().toISOString()
        saveWishlistToStorage(state.items)
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.syncLoading = false
        state.error = action.payload
      })
      
      // Add to Wishlist API
      .addCase(addToWishlistAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToWishlistAPI.fulfilled, (state, action) => {
        state.loading = false
        // Item should already be in local state from the optimistic update
        toast.success('Ajouté à la liste de souhaits')
      })
      .addCase(addToWishlistAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Remove from Wishlist API
      .addCase(removeFromWishlistAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
        state.loading = false
        // Item should already be removed from local state
        toast.info('Retiré de la liste de souhaits')
      })
      .addCase(removeFromWishlistAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Clear Wishlist API
      .addCase(clearWishlistAPI.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearWishlistAPI.fulfilled, (state) => {
        state.loading = false
        state.items = []
        saveWishlistToStorage([])
        toast.info('Liste de souhaits vidée')
      })
      .addCase(clearWishlistAPI.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  }
})

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
  setWishlistOpen,
  updateWishlistItem,
  toggleWishlistItem,
  clearError,
  sortWishlist
} = wishlistSlice.actions

export default wishlistSlice.reducer
