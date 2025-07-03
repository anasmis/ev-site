import api from './api'

// Mock wishlist data would be stored here
const mockWishlist = []

// Mock get wishlist
export const getWishlist = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return {
    data: {
      items: mockWishlist
    }
  }
}

// Mock add to wishlist
export const addToWishlist = async (productId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const existingItem = mockWishlist.find(item => item.productId === productId)
  
  if (existingItem) {
    throw new Error('Produit déjà dans la liste de souhaits')
  }
  
  const newItem = {
    id: Date.now(),
    productId,
    addedAt: new Date().toISOString()
  }
  
  mockWishlist.push(newItem)
  
  return {
    data: {
      item: newItem,
      message: 'Produit ajouté à la liste de souhaits'
    }
  }
}

// Mock remove from wishlist
export const removeFromWishlist = async (productId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const index = mockWishlist.findIndex(item => item.productId === productId)
  
  if (index === -1) {
    throw new Error('Produit non trouvé dans la liste de souhaits')
  }
  
  mockWishlist.splice(index, 1)
  
  return {
    data: {
      message: 'Produit retiré de la liste de souhaits'
    }
  }
}

// Mock clear wishlist
export const clearWishlist = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  mockWishlist.length = 0
  
  return {
    data: {
      message: 'Liste de souhaits vidée'
    }
  }
}
