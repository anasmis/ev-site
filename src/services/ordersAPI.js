import api from './api'

// Mock orders data
const mockOrders = [
  {
    id: 'ORD-001',
    userId: 1,
    status: 'delivered',
    total: 7500,
    subtotal: 6250,
    tax: 1250,
    shipping: 0,
    items: [
      {
        id: 1,
        name: 'Easee One',
        price: 7500,
        quantity: 1,
        image: '/src/assets/images/easee.png'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Avenue Mohammed V',
      city: 'Casablanca',
      zipCode: '20000',
      country: 'Maroc',
      phone: '+212 6 12 34 56 78'
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Avenue Mohammed V',
      city: 'Casablanca',
      zipCode: '20000',
      country: 'Maroc',
      phone: '+212 6 12 34 56 78'
    },
    paymentMethod: 'credit_card',
    shippingMethod: 'standard',
    trackingNumber: 'TRK123456789',
    createdAt: '2024-06-15T10:30:00Z',
    updatedAt: '2024-06-20T14:22:00Z',
    deliveredAt: '2024-06-20T14:22:00Z'
  },
  {
    id: 'ORD-002',
    userId: 1,
    status: 'shipped',
    total: 6800,
    subtotal: 5667,
    tax: 1133,
    shipping: 0,
    items: [
      {
        id: 2,
        name: 'Zaptec Go',
        price: 6800,
        quantity: 1,
        image: '/src/assets/images/zaptec.png'
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      street: '123 Avenue Mohammed V',
      city: 'Casablanca',
      zipCode: '20000',
      country: 'Maroc',
      phone: '+212 6 12 34 56 78'
    },
    billingAddress: {
      name: 'John Doe',
      street: '123 Avenue Mohammed V',
      city: 'Casablanca',
      zipCode: '20000',
      country: 'Maroc',
      phone: '+212 6 12 34 56 78'
    },
    paymentMethod: 'credit_card',
    shippingMethod: 'express',
    trackingNumber: 'TRK123456790',
    createdAt: '2024-07-01T09:15:00Z',
    updatedAt: '2024-07-02T16:45:00Z',
    estimatedDelivery: '2024-07-05T12:00:00Z'
  }
]

// Mock create order
export const createOrder = async (orderData) => {
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const newOrder = {
    id: 'ORD-' + String(Date.now()).slice(-6),
    userId: 1,
    status: 'pending',
    ...orderData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return {
    data: {
      order: newOrder,
      message: 'Commande créée avec succès'
    }
  }
}

// Mock get user orders
export const getUserOrders = async (params = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  let filteredOrders = [...mockOrders]
  
  // Apply filters
  if (params.status) {
    filteredOrders = filteredOrders.filter(order => order.status === params.status)
  }
  
  if (params.dateRange) {
    const { start, end } = params.dateRange
    filteredOrders = filteredOrders.filter(order => {
      const orderDate = new Date(order.createdAt)
      return orderDate >= new Date(start) && orderDate <= new Date(end)
    })
  }
  
  // Apply sorting
  if (params.sortBy) {
    filteredOrders.sort((a, b) => {
      const order = params.sortOrder === 'desc' ? -1 : 1
      
      switch (params.sortBy) {
        case 'createdAt':
          return (new Date(a.createdAt) - new Date(b.createdAt)) * order
        case 'total':
          return (a.total - b.total) * order
        case 'status':
          return a.status.localeCompare(b.status) * order
        default:
          return 0
      }
    })
  }
  
  // Pagination
  const page = params.page || 1
  const limit = params.limit || 10
  const start = (page - 1) * limit
  const end = start + limit
  const paginatedOrders = filteredOrders.slice(start, end)
  
  return {
    data: {
      orders: paginatedOrders,
      pagination: {
        page,
        limit,
        total: filteredOrders.length,
        pages: Math.ceil(filteredOrders.length / limit)
      }
    }
  }
}

// Mock get order by ID
export const getOrderById = async (orderId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const order = mockOrders.find(o => o.id === orderId)
  if (!order) {
    throw new Error('Commande non trouvée')
  }
  
  return {
    data: {
      order
    }
  }
}

// Mock update order status
export const updateOrderStatus = async (orderId, status) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const order = mockOrders.find(o => o.id === orderId)
  if (!order) {
    throw new Error('Commande non trouvée')
  }
  
  const updatedOrder = {
    ...order,
    status,
    updatedAt: new Date().toISOString()
  }
  
  return {
    data: {
      order: updatedOrder,
      message: 'Statut de commande mis à jour'
    }
  }
}

// Mock cancel order
export const cancelOrder = async (orderId) => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const order = mockOrders.find(o => o.id === orderId)
  if (!order) {
    throw new Error('Commande non trouvée')
  }
  
  if (['shipped', 'delivered'].includes(order.status)) {
    throw new Error('Impossible d\'annuler une commande expédiée ou livrée')
  }
  
  const cancelledOrder = {
    ...order,
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return {
    data: {
      order: cancelledOrder,
      message: 'Commande annulée avec succès'
    }
  }
}

// Mock track order
export const trackOrder = async (trackingNumber) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const order = mockOrders.find(o => o.trackingNumber === trackingNumber)
  if (!order) {
    throw new Error('Numéro de suivi non trouvé')
  }
  
  // Mock tracking events
  const trackingEvents = [
    {
      status: 'pending',
      message: 'Commande reçue',
      timestamp: order.createdAt,
      location: 'Centre de traitement'
    },
    {
      status: 'confirmed',
      message: 'Commande confirmée',
      timestamp: new Date(new Date(order.createdAt).getTime() + 2 * 60 * 60 * 1000).toISOString(),
      location: 'Centre de traitement'
    },
    {
      status: 'processing',
      message: 'En préparation',
      timestamp: new Date(new Date(order.createdAt).getTime() + 24 * 60 * 60 * 1000).toISOString(),
      location: 'Entrepôt'
    }
  ]
  
  if (order.status === 'shipped' || order.status === 'delivered') {
    trackingEvents.push({
      status: 'shipped',
      message: 'Expédié',
      timestamp: new Date(new Date(order.createdAt).getTime() + 48 * 60 * 60 * 1000).toISOString(),
      location: 'En transit'
    })
  }
  
  if (order.status === 'delivered') {
    trackingEvents.push({
      status: 'delivered',
      message: 'Livré',
      timestamp: order.deliveredAt,
      location: 'Destination'
    })
  }
  
  return {
    data: {
      tracking: {
        trackingNumber,
        orderId: order.id,
        currentStatus: order.status,
        estimatedDelivery: order.estimatedDelivery,
        events: trackingEvents
      }
    }
  }
}

// Mock get order statistics
export const getOrderStatistics = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const stats = {
    totalOrders: mockOrders.length,
    pendingOrders: mockOrders.filter(o => o.status === 'pending').length,
    shippedOrders: mockOrders.filter(o => o.status === 'shipped').length,
    deliveredOrders: mockOrders.filter(o => o.status === 'delivered').length,
    cancelledOrders: mockOrders.filter(o => o.status === 'cancelled').length,
    totalRevenue: mockOrders.reduce((sum, o) => sum + o.total, 0),
    averageOrderValue: mockOrders.reduce((sum, o) => sum + o.total, 0) / mockOrders.length
  }
  
  return {
    data: {
      statistics: stats
    }
  }
}

// Mock request return
export const requestReturn = async (orderId, returnData) => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const order = mockOrders.find(o => o.id === orderId)
  if (!order) {
    throw new Error('Commande non trouvée')
  }
  
  if (order.status !== 'delivered') {
    throw new Error('Seules les commandes livrées peuvent être retournées')
  }
  
  const returnRequest = {
    id: 'RET-' + String(Date.now()).slice(-6),
    orderId,
    status: 'pending',
    reason: returnData.reason,
    comment: returnData.comment,
    items: returnData.items,
    createdAt: new Date().toISOString()
  }
  
  return {
    data: {
      return: returnRequest,
      message: 'Demande de retour créée avec succès'
    }
  }
}

// Mock get invoice
export const getInvoice = async (orderId) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const order = mockOrders.find(o => o.id === orderId)
  if (!order) {
    throw new Error('Commande non trouvée')
  }
  
  const invoice = {
    id: 'INV-' + orderId.slice(-6),
    orderId,
    invoiceNumber: 'INV-2024-' + String(Date.now()).slice(-6),
    issuedAt: order.createdAt,
    dueAt: new Date(new Date(order.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    total: order.total,
    subtotal: order.subtotal,
    tax: order.tax,
    shipping: order.shipping,
    items: order.items,
    billingAddress: order.billingAddress,
    companyInfo: {
      name: 'EV Recharge',
      address: 'Casablanca, Maroc',
      phone: '+212 6 XX XX XX XX',
      email: 'contact@evrecharge.ma',
      website: 'www.evrecharge.ma'
    }
  }
  
  return {
    data: {
      invoice
    }
  }
}
