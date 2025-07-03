import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as ordersAPI from '../../services/ordersAPI'
import { toast } from 'react-toastify'

// Async thunks
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.createOrder(orderData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la création de la commande')
    }
  }
)

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getUserOrders(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la récupération des commandes')
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.getOrderById(orderId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la récupération de la commande')
    }
  }
)

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.updateOrderStatus(orderId, status)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la mise à jour du statut')
    }
  }
)

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.cancelOrder(orderId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de l\'annulation de la commande')
    }
  }
)

export const trackOrder = createAsyncThunk(
  'orders/trackOrder',
  async (trackingNumber, { rejectWithValue }) => {
    try {
      const response = await ordersAPI.trackOrder(trackingNumber)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du suivi de la commande')
    }
  }
)

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  createOrderLoading: false,
  createOrderError: null,
  trackingInfo: null,
  trackingLoading: false,
  trackingError: null,
  orderStatuses: [
    { id: 'pending', name: 'En attente', color: 'warning' },
    { id: 'confirmed', name: 'Confirmée', color: 'info' },
    { id: 'processing', name: 'En préparation', color: 'primary' },
    { id: 'shipped', name: 'Expédiée', color: 'success' },
    { id: 'delivered', name: 'Livrée', color: 'success' },
    { id: 'cancelled', name: 'Annulée', color: 'danger' },
    { id: 'returned', name: 'Retournée', color: 'secondary' }
  ],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  },
  filters: {
    status: '',
    dateRange: null,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  }
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
    
    clearCreateOrderError: (state) => {
      state.createOrderError = null
    },
    
    clearError: (state) => {
      state.error = null
      state.createOrderError = null
      state.trackingError = null
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    
    clearTrackingInfo: (state) => {
      state.trackingInfo = null
      state.trackingError = null
    },
    
    updateOrderInList: (state, action) => {
      const updatedOrder = action.payload
      const index = state.orders.findIndex(order => order.id === updatedOrder.id)
      if (index !== -1) {
        state.orders[index] = updatedOrder
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.createOrderLoading = true
        state.createOrderError = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrderLoading = false
        state.currentOrder = action.payload.order
        state.createOrderError = null
        // Add new order to the beginning of the orders array
        state.orders.unshift(action.payload.order)
        toast.success('Commande créée avec succès')
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderLoading = false
        state.createOrderError = action.payload
        toast.error(action.payload)
      })
      
      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false
        state.orders = action.payload.orders
        state.pagination = action.payload.pagination
        state.error = null
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Fetch Order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        state.currentOrder = action.payload.order
        state.error = null
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        const updatedOrder = action.payload.order
        
        // Update current order if it's the same
        if (state.currentOrder && state.currentOrder.id === updatedOrder.id) {
          state.currentOrder = updatedOrder
        }
        
        // Update order in the list
        const index = state.orders.findIndex(order => order.id === updatedOrder.id)
        if (index !== -1) {
          state.orders[index] = updatedOrder
        }
        
        state.error = null
        toast.success('Statut de commande mis à jour')
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false
        const cancelledOrder = action.payload.order
        
        // Update current order if it's the same
        if (state.currentOrder && state.currentOrder.id === cancelledOrder.id) {
          state.currentOrder = cancelledOrder
        }
        
        // Update order in the list
        const index = state.orders.findIndex(order => order.id === cancelledOrder.id)
        if (index !== -1) {
          state.orders[index] = cancelledOrder
        }
        
        state.error = null
        toast.success('Commande annulée avec succès')
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Track Order
      .addCase(trackOrder.pending, (state) => {
        state.trackingLoading = true
        state.trackingError = null
      })
      .addCase(trackOrder.fulfilled, (state, action) => {
        state.trackingLoading = false
        state.trackingInfo = action.payload.tracking
        state.trackingError = null
      })
      .addCase(trackOrder.rejected, (state, action) => {
        state.trackingLoading = false
        state.trackingError = action.payload
        toast.error(action.payload)
      })
  }
})

export const {
  clearCurrentOrder,
  clearCreateOrderError,
  clearError,
  setFilters,
  setPagination,
  clearTrackingInfo,
  updateOrderInList
} = ordersSlice.actions

export default ordersSlice.reducer
