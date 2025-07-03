import api from './api'

// Mock stations data
const mockStations = [
  {
    id: 1,
    name: 'Station Casablanca Centre',
    address: 'Avenue Mohammed V, Casablanca',
    lat: 33.5731,
    lng: -7.5898,
    connectorTypes: ['type2', 'ccs'],
    power: 22,
    network: 'evborne',
    status: 'available',
    amenities: ['wifi', 'parking', '24h'],
    pricing: {
      kwh: 2.5,
      session: 0
    },
    rating: 4.5,
    reviews: 28
  },
  {
    id: 2,
    name: 'Station Rabat Agdal',
    address: 'Avenue Mehdi Ben Barka, Rabat',
    lat: 33.9716,
    lng: -6.8498,
    connectorTypes: ['type2', 'chademo'],
    power: 50,
    network: 'ionity',
    status: 'occupied',
    amenities: ['restaurant', 'toilets', 'shopping'],
    pricing: {
      kwh: 3.2,
      session: 1
    },
    rating: 4.8,
    reviews: 42
  }
]

// Mock get stations
export const getStations = async (params = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let filteredStations = [...mockStations]
  
  // Apply filters
  if (params.network) {
    filteredStations = filteredStations.filter(s => s.network === params.network)
  }
  
  if (params.connectorType) {
    filteredStations = filteredStations.filter(s => 
      s.connectorTypes.includes(params.connectorType)
    )
  }
  
  if (params.status) {
    filteredStations = filteredStations.filter(s => s.status === params.status)
  }
  
  return {
    data: {
      stations: filteredStations,
      statistics: {
        totalStations: mockStations.length,
        availableStations: mockStations.filter(s => s.status === 'available').length,
        averageRating: mockStations.reduce((sum, s) => sum + s.rating, 0) / mockStations.length,
        totalReviews: mockStations.reduce((sum, s) => sum + s.reviews, 0)
      }
    }
  }
}

// Mock get station by ID
export const getStationById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const station = mockStations.find(s => s.id === parseInt(id))
  if (!station) {
    throw new Error('Station non trouvée')
  }
  
  return {
    data: {
      station
    }
  }
}

// Mock find nearby stations
export const findNearbyStations = async (lat, lng, radius = 10) => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Simple distance calculation (mock)
  const nearbyStations = mockStations.filter(station => {
    const distance = Math.sqrt(
      Math.pow(station.lat - lat, 2) + Math.pow(station.lng - lng, 2)
    ) * 111 // Rough conversion to km
    return distance <= radius
  })
  
  return {
    data: {
      stations: nearbyStations
    }
  }
}

// Mock search stations
export const searchStations = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const searchTerm = query.toLowerCase()
  const results = mockStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm) ||
    station.address.toLowerCase().includes(searchTerm)
  )
  
  return {
    data: {
      stations: results
    }
  }
}

// Mock report station issue
export const reportStationIssue = async (stationId, issueData) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const issue = {
    id: Date.now(),
    stationId,
    ...issueData,
    reportedAt: new Date().toISOString(),
    status: 'pending'
  }
  
  return {
    data: {
      stationId,
      issue,
      message: 'Problème signalé avec succès'
    }
  }
}

// Mock rate station
export const rateStation = async (stationId, rating, comment) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  const ratingData = {
    id: Date.now(),
    stationId,
    rating,
    comment,
    userId: 1,
    createdAt: new Date().toISOString()
  }
  
  return {
    data: {
      stationId,
      rating: ratingData,
      message: 'Évaluation ajoutée avec succès'
    }
  }
}
