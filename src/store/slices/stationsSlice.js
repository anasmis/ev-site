import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as stationsAPI from '../../services/stationsAPI'

// Async thunks
export const fetchStations = createAsyncThunk(
  'stations/fetchStations',
  async (params = {}) => {
    const response = await stationsAPI.getStations(params)
    return response.data
  }
)

export const fetchStationById = createAsyncThunk(
  'stations/fetchStationById',
  async (id) => {
    const response = await stationsAPI.getStationById(id)
    return response.data
  }
)

export const findNearbyStations = createAsyncThunk(
  'stations/findNearbyStations',
  async ({ lat, lng, radius = 10 }) => {
    const response = await stationsAPI.findNearbyStations(lat, lng, radius)
    return response.data
  }
)

export const searchStations = createAsyncThunk(
  'stations/searchStations',
  async (query) => {
    const response = await stationsAPI.searchStations(query)
    return response.data
  }
)

export const reportStationIssue = createAsyncThunk(
  'stations/reportStationIssue',
  async ({ stationId, issueData }) => {
    const response = await stationsAPI.reportStationIssue(stationId, issueData)
    return response.data
  }
)

export const rateStation = createAsyncThunk(
  'stations/rateStation',
  async ({ stationId, rating, comment }) => {
    const response = await stationsAPI.rateStation(stationId, rating, comment)
    return response.data
  }
)

const initialState = {
  stations: [],
  currentStation: null,
  nearbyStations: [],
  searchResults: [],
  loading: false,
  error: null,
  searchLoading: false,
  nearbyLoading: false,
  userLocation: null,
  selectedStation: null,
  filters: {
    connectorType: '',
    power: '',
    availability: '',
    network: '',
    amenities: [],
    maxDistance: 50,
    priceRange: [0, 100],
    sortBy: 'distance',
    sortOrder: 'asc'
  },
  mapSettings: {
    zoom: 10,
    center: { lat: 33.5731, lng: -7.5898 }, // Casablanca, Morocco
    showUserLocation: true,
    clusterStations: true
  },
  connectorTypes: [
    { id: 'type1', name: 'Type 1 (AC)', icon: '🔌' },
    { id: 'type2', name: 'Type 2 (AC)', icon: '🔌' },
    { id: 'ccs', name: 'CCS (DC)', icon: '⚡' },
    { id: 'chademo', name: 'CHAdeMO (DC)', icon: '⚡' },
    { id: 'tesla', name: 'Tesla Supercharger', icon: '🚗' }
  ],
  powerLevels: [
    { id: 'level1', name: '3.7 kW', min: 0, max: 3.7 },
    { id: 'level2', name: '7.4 kW', min: 3.7, max: 7.4 },
    { id: 'level3', name: '22 kW', min: 7.4, max: 22 },
    { id: 'fast', name: '50 kW+', min: 50, max: 350 }
  ],
  networks: [
    { id: 'evborne', name: 'EVBorne', color: '#007bff' },
    { id: 'tesla', name: 'Tesla', color: '#dc3545' },
    { id: 'ionity', name: 'Ionity', color: '#28a745' },
    { id: 'chargepoint', name: 'ChargePoint', color: '#ffc107' }
  ],
  amenities: [
    { id: 'wifi', name: 'Wi-Fi', icon: '📶' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'parking', name: 'Parking', icon: '🅿️' },
    { id: 'toilets', name: 'Toilettes', icon: '🚽' },
    { id: '24h', name: '24h/24', icon: '🕐' }
  ],
  statistics: {
    totalStations: 0,
    availableStations: 0,
    averageRating: 0,
    totalReviews: 0
  }
}

const stationsSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
    
    setUserLocation: (state, action) => {
      state.userLocation = action.payload
      if (action.payload) {
        state.mapSettings.center = {
          lat: action.payload.lat,
          lng: action.payload.lng
        }
      }
    },
    
    setSelectedStation: (state, action) => {
      state.selectedStation = action.payload
    },
    
    updateMapSettings: (state, action) => {
      state.mapSettings = { ...state.mapSettings, ...action.payload }
    },
    
    setCurrentStation: (state, action) => {
      state.currentStation = action.payload
    },
    
    clearSearchResults: (state) => {
      state.searchResults = []
    },
    
    clearNearbyStations: (state) => {
      state.nearbyStations = []
    },
    
    updateStationStatus: (state, action) => {
      const { stationId, status } = action.payload
      
      // Update in stations array
      const stationIndex = state.stations.findIndex(s => s.id === stationId)
      if (stationIndex !== -1) {
        state.stations[stationIndex].status = status
        state.stations[stationIndex].lastUpdated = new Date().toISOString()
      }
      
      // Update in nearby stations
      const nearbyIndex = state.nearbyStations.findIndex(s => s.id === stationId)
      if (nearbyIndex !== -1) {
        state.nearbyStations[nearbyIndex].status = status
        state.nearbyStations[nearbyIndex].lastUpdated = new Date().toISOString()
      }
      
      // Update current station if it matches
      if (state.currentStation && state.currentStation.id === stationId) {
        state.currentStation.status = status
        state.currentStation.lastUpdated = new Date().toISOString()
      }
    },
    
    addStationReview: (state, action) => {
      const { stationId, review } = action.payload
      
      // Update station in stations array
      const stationIndex = state.stations.findIndex(s => s.id === stationId)
      if (stationIndex !== -1) {
        if (!state.stations[stationIndex].reviews) {
          state.stations[stationIndex].reviews = []
        }
        state.stations[stationIndex].reviews.unshift(review)
        // Recalculate average rating
        const reviews = state.stations[stationIndex].reviews
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        state.stations[stationIndex].averageRating = avgRating
      }
      
      // Update current station if it matches
      if (state.currentStation && state.currentStation.id === stationId) {
        if (!state.currentStation.reviews) {
          state.currentStation.reviews = []
        }
        state.currentStation.reviews.unshift(review)
        const reviews = state.currentStation.reviews
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        state.currentStation.averageRating = avgRating
      }
    },
    
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Stations
      .addCase(fetchStations.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.loading = false
        state.stations = action.payload.stations
        state.statistics = action.payload.statistics
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      
      // Fetch Station by ID
      .addCase(fetchStationById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchStationById.fulfilled, (state, action) => {
        state.loading = false
        state.currentStation = action.payload.station
      })
      .addCase(fetchStationById.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      
      // Find Nearby Stations
      .addCase(findNearbyStations.pending, (state) => {
        state.nearbyLoading = true
        state.error = null
      })
      .addCase(findNearbyStations.fulfilled, (state, action) => {
        state.nearbyLoading = false
        state.nearbyStations = action.payload.stations
      })
      .addCase(findNearbyStations.rejected, (state, action) => {
        state.nearbyLoading = false
        state.error = action.error.message
      })
      
      // Search Stations
      .addCase(searchStations.pending, (state) => {
        state.searchLoading = true
        state.error = null
      })
      .addCase(searchStations.fulfilled, (state, action) => {
        state.searchLoading = false
        state.searchResults = action.payload.stations
      })
      .addCase(searchStations.rejected, (state, action) => {
        state.searchLoading = false
        state.error = action.error.message
      })
      
      // Report Station Issue
      .addCase(reportStationIssue.fulfilled, (state, action) => {
        // Update station status or add issue report
        const { stationId, issue } = action.payload
        const stationIndex = state.stations.findIndex(s => s.id === stationId)
        if (stationIndex !== -1) {
          if (!state.stations[stationIndex].issues) {
            state.stations[stationIndex].issues = []
          }
          state.stations[stationIndex].issues.push(issue)
        }
      })
      
      // Rate Station
      .addCase(rateStation.fulfilled, (state, action) => {
        const { stationId, rating } = action.payload
        const stationIndex = state.stations.findIndex(s => s.id === stationId)
        if (stationIndex !== -1) {
          if (!state.stations[stationIndex].ratings) {
            state.stations[stationIndex].ratings = []
          }
          state.stations[stationIndex].ratings.push(rating)
          
          // Recalculate average rating
          const ratings = state.stations[stationIndex].ratings
          const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          state.stations[stationIndex].averageRating = avgRating
        }
      })
  }
})

export const {
  setFilters,
  clearFilters,
  setUserLocation,
  setSelectedStation,
  updateMapSettings,
  setCurrentStation,
  clearSearchResults,
  clearNearbyStations,
  updateStationStatus,
  addStationReview,
  clearError
} = stationsSlice.actions

export default stationsSlice.reducer
