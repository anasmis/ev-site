import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as productsAPI from '../../services/productsAPI'

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}) => {
    const response = await productsAPI.getProducts(params)
    return response.data
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await productsAPI.getProductById(id)
    return response.data
  }
)

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (query) => {
    const response = await productsAPI.searchProducts(query)
    return response.data
  }
)

const initialState = {
  items: [],
  currentProduct: null,
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  filters: {
    category: '',
    priceRange: [0, 10000],
    brand: '',
    powerRange: [0, 22],
    features: [],
    sortBy: 'name',
    sortOrder: 'asc'
  },
  categories: [
    { id: 'residential', name: 'Chargeurs Résidentiels', count: 0 },
    { id: 'commercial', name: 'Commerciaux', count: 0 },
    { id: 'portable', name: 'Portables', count: 0 }
  ],
  brands: [],
  comparison: [],
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  }
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    addToComparison: (state, action) => {
      const product = action.payload
      if (state.comparison.length < 3 && !state.comparison.find(p => p.id === product.id)) {
        state.comparison.push(product)
      }
    },
    removeFromComparison: (state, action) => {
      state.comparison = state.comparison.filter(p => p.id !== action.payload)
    },
    clearComparison: (state) => {
      state.comparison = []
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    clearSearchResults: (state) => {
      state.searchResults = []
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload.products
        state.pagination = action.payload.pagination
        state.brands = action.payload.brands
        state.categories = action.payload.categories
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.currentProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.searchLoading = true
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload.products
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.error.message
      })
  }
})

export const {
  setFilters,
  clearFilters,
  addToComparison,
  removeFromComparison,
  clearComparison,
  setPagination,
  setCurrentProduct,
  clearSearchResults
} = productsSlice.actions

export default productsSlice.reducer
