import api from './api'

// Mock data for development
const mockProducts = [
  {
    id: 1,
    name: 'Easee One',
    brand: 'Easee',
    price: 7500,
    originalPrice: 8000,
    category: 'residential',
    image: '/src/assets/images/easee.png',
    images: [
      '/src/assets/images/easee.png',
      '/src/assets/images/easee-2.png',
      '/src/assets/images/easee-3.png'
    ],
    description: 'Borne de recharge intelligente pour usage résidentiel avec connectivité WiFi et application mobile.',
    features: [
      'Puissance jusqu\'à 7.4 kW',
      'Connectivité WiFi',
      'Application mobile',
      'Design compact',
      'Installation facile',
      'Garantie 3 ans'
    ],
    specifications: {
      power: '7.4 kW',
      voltage: '230V',
      current: '32A',
      connector: 'Type 2',
      protection: 'IP54',
      temperature: '-25°C à +50°C',
      dimensions: '195 x 275 x 106 mm',
      weight: '1.5 kg'
    },
    inStock: true,
    stock: 15,
    rating: 4.8,
    reviews: 124,
    discount: 6,
    isNew: false,
    isFeatured: true,
    tags: ['intelligent', 'wifi', 'compact']
  },
  {
    id: 2,
    name: 'Zaptec Go',
    brand: 'Zaptec',
    price: 6800,
    originalPrice: 7200,
    category: 'residential',
    image: '/src/assets/images/zaptec.png',
    images: [
      '/src/assets/images/zaptec.png',
      '/src/assets/images/zaptec-2.png'
    ],
    description: 'Borne de recharge moderne avec écran tactile et fonctionnalités avancées.',
    features: [
      'Puissance jusqu\'à 7.4 kW',
      'Écran tactile LED',
      'Connectivité 4G/WiFi',
      'Application mobile',
      'Charge intelligente',
      'Garantie 2 ans'
    ],
    specifications: {
      power: '7.4 kW',
      voltage: '230V',
      current: '32A',
      connector: 'Type 2',
      protection: 'IP54',
      temperature: '-30°C à +60°C',
      dimensions: '240 x 360 x 120 mm',
      weight: '2.8 kg'
    },
    inStock: true,
    stock: 8,
    rating: 4.6,
    reviews: 89,
    discount: 6,
    isNew: true,
    isFeatured: false,
    tags: ['écran tactile', '4G', 'moderne']
  },
  {
    id: 3,
    name: 'EO Mini Pro 3',
    brand: 'EO Charging',
    price: 5900,
    originalPrice: 6300,
    category: 'residential',
    image: '/src/assets/images/eo.webp',
    images: [
      '/src/assets/images/eo.webp',
      '/src/assets/images/eo-2.webp'
    ],
    description: 'Borne de recharge compacte et économique pour installation résidentielle.',
    features: [
      'Puissance jusqu\'à 7.4 kW',
      'Design compact',
      'Installation murale',
      'Câble intégré',
      'LED de statut',
      'Garantie 2 ans'
    ],
    specifications: {
      power: '7.4 kW',
      voltage: '230V',
      current: '32A',
      connector: 'Type 2',
      protection: 'IP54',
      temperature: '-25°C à +50°C',
      dimensions: '180 x 250 x 95 mm',
      weight: '1.2 kg'
    },
    inStock: true,
    stock: 22,
    rating: 4.4,
    reviews: 156,
    discount: 6,
    isNew: false,
    isFeatured: true,
    tags: ['compact', 'économique', 'câble intégré']
  },
  {
    id: 4,
    name: 'ABB Terra AC',
    brand: 'ABB',
    price: 12500,
    originalPrice: 13000,
    category: 'commercial',
    image: '/src/assets/images/abb-terra.png',
    images: [
      '/src/assets/images/abb-terra.png'
    ],
    description: 'Borne de recharge commerciale haute performance avec gestion de flotte.',
    features: [
      'Puissance jusqu\'à 22 kW',
      'Double connecteur',
      'Gestion de flotte',
      'Authentification RFID',
      'Écran LCD',
      'Garantie 3 ans'
    ],
    specifications: {
      power: '22 kW',
      voltage: '400V',
      current: '32A',
      connector: 'Type 2 x2',
      protection: 'IP54',
      temperature: '-30°C à +60°C',
      dimensions: '300 x 450 x 150 mm',
      weight: '8.5 kg'
    },
    inStock: true,
    stock: 5,
    rating: 4.9,
    reviews: 67,
    discount: 4,
    isNew: false,
    isFeatured: true,
    tags: ['commercial', 'haute performance', 'double connecteur']
  },
  {
    id: 5,
    name: 'Schneider EVlink',
    brand: 'Schneider Electric',
    price: 4800,
    originalPrice: 5200,
    category: 'residential',
    image: '/src/assets/images/schneider.png',
    images: [
      '/src/assets/images/schneider.png'
    ],
    description: 'Borne de recharge fiable et robuste de Schneider Electric.',
    features: [
      'Puissance jusqu\'à 7.4 kW',
      'Robuste et fiable',
      'Protection IP55',
      'Câble Type 2',
      'Installation facile',
      'Garantie 3 ans'
    ],
    specifications: {
      power: '7.4 kW',
      voltage: '230V',
      current: '32A',
      connector: 'Type 2',
      protection: 'IP55',
      temperature: '-25°C à +60°C',
      dimensions: '220 x 320 x 110 mm',
      weight: '2.1 kg'
    },
    inStock: true,
    stock: 12,
    rating: 4.7,
    reviews: 98,
    discount: 8,
    isNew: false,
    isFeatured: false,
    tags: ['fiable', 'robuste', 'schneider']
  },
  {
    id: 6,
    name: 'Portable Type 2',
    brand: 'EV Portable',
    price: 890,
    originalPrice: 950,
    category: 'portable',
    image: '/src/assets/images/portable.png',
    images: [
      '/src/assets/images/portable.png'
    ],
    description: 'Chargeur portable pour véhicules électriques, parfait pour les déplacements.',
    features: [
      'Puissance jusqu\'à 3.7 kW',
      'Portable et léger',
      'Prise domestique',
      'Câble Type 2',
      'LCD de statut',
      'Garantie 1 an'
    ],
    specifications: {
      power: '3.7 kW',
      voltage: '230V',
      current: '16A',
      connector: 'Type 2',
      protection: 'IP65',
      temperature: '-20°C à +50°C',
      dimensions: '150 x 200 x 60 mm',
      weight: '0.8 kg'
    },
    inStock: true,
    stock: 35,
    rating: 4.2,
    reviews: 203,
    discount: 6,
    isNew: false,
    isFeatured: false,
    tags: ['portable', 'léger', 'déplacement']
  }
]

// Mock API calls
export const getProducts = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let filteredProducts = [...mockProducts]
  
  // Apply filters
  if (params.category) {
    filteredProducts = filteredProducts.filter(p => p.category === params.category)
  }
  
  if (params.brand) {
    filteredProducts = filteredProducts.filter(p => p.brand === params.brand)
  }
  
  if (params.minPrice || params.maxPrice) {
    filteredProducts = filteredProducts.filter(p => {
      const price = p.price
      return (!params.minPrice || price >= params.minPrice) &&
             (!params.maxPrice || price <= params.maxPrice)
    })
  }
  
  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm)
    )
  }
  
  // Apply sorting
  if (params.sortBy) {
    filteredProducts.sort((a, b) => {
      const order = params.sortOrder === 'desc' ? -1 : 1
      
      switch (params.sortBy) {
        case 'price':
          return (a.price - b.price) * order
        case 'rating':
          return (a.rating - b.rating) * order
        case 'name':
          return a.name.localeCompare(b.name) * order
        default:
          return 0
      }
    })
  }
  
  // Pagination
  const page = params.page || 1
  const limit = params.limit || 12
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedProducts = filteredProducts.slice(start, end)
  
  return {
    data: {
      products: paginatedProducts,
      pagination: {
        page,
        limit,
        total: filteredProducts.length,
        pages: Math.ceil(filteredProducts.length / limit)
      },
      brands: [...new Set(mockProducts.map(p => p.brand))],
      categories: [
        { id: 'residential', name: 'Chargeurs Résidentiels', count: mockProducts.filter(p => p.category === 'residential').length },
        { id: 'commercial', name: 'Commerciaux', count: mockProducts.filter(p => p.category === 'commercial').length },
        { id: 'portable', name: 'Portables', count: mockProducts.filter(p => p.category === 'portable').length }
      ]
    }
  }
}

export const getProductById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const product = mockProducts.find(p => p.id === parseInt(id))
  if (!product) {
    throw new Error('Produit non trouvé')
  }
  
  return {
    data: {
      ...product,
      relatedProducts: mockProducts.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)
    }
  }
}

export const searchProducts = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const searchTerm = query.toLowerCase()
  const results = mockProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    p.brand.toLowerCase().includes(searchTerm) ||
    p.description.toLowerCase().includes(searchTerm) ||
    p.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
  
  return {
    data: {
      products: results,
      query,
      count: results.length
    }
  }
}

export const getFeaturedProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const featured = mockProducts.filter(p => p.isFeatured)
  
  return {
    data: {
      products: featured
    }
  }
}

export const getNewProducts = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const newProducts = mockProducts.filter(p => p.isNew)
  
  return {
    data: {
      products: newProducts
    }
  }
}

export const getBestsellers = async () => {
  await new Promise(resolve => setTimeout(resolve, 200))
  
  const bestsellers = mockProducts.sort((a, b) => b.reviews - a.reviews).slice(0, 6)
  
  return {
    data: {
      products: bestsellers
    }
  }
}

export const getProductsByCategory = async (category) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const products = mockProducts.filter(p => p.category === category)
  
  return {
    data: {
      products,
      category
    }
  }
}

export const getProductSuggestions = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const searchTerm = query.toLowerCase()
  const suggestions = mockProducts
    .filter(p => p.name.toLowerCase().includes(searchTerm))
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.image
    }))
  
  return {
    data: {
      suggestions
    }
  }
}
