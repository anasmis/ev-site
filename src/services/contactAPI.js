import api from './api'

// Mock FAQ data
const mockFAQ = [
  {
    id: 1,
    question: 'Comment installer une borne de recharge chez soi ?',
    answer: 'L\'installation d\'une borne de recharge nécessite l\'intervention d\'un électricien qualifié. Nous proposons un service d\'installation complet avec étude technique préalable.',
    category: 'installation'
  },
  {
    id: 2,
    question: 'Quelle puissance choisir pour ma borne ?',
    answer: 'La puissance dépend de votre véhicule et de vos besoins. Pour un usage résidentiel, 7.4kW est généralement suffisant. Pour un usage commercial, 22kW ou plus peut être nécessaire.',
    category: 'products'
  },
  {
    id: 3,
    question: 'Combien coûte l\'installation d\'une borne ?',
    answer: 'Le coût varie selon la complexité de l\'installation. Comptez entre 500 et 1500 MAD pour une installation standard. Demandez un devis gratuit.',
    category: 'billing'
  }
]

// Mock send contact message
export const sendContactMessage = async (messageData) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Simple validation
  if (!messageData.name || !messageData.email || !messageData.message) {
    throw new Error('Tous les champs obligatoires doivent être remplis')
  }
  
  return {
    data: {
      message: 'Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
    }
  }
}

// Mock subscribe to newsletter
export const subscribeToNewsletter = async (email) => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  if (!email) {
    throw new Error('Email requis')
  }
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw new Error('Format d\'email invalide')
  }
  
  return {
    data: {
      message: 'Inscription à la newsletter réussie'
    }
  }
}

// Mock request callback
export const requestCallback = async (callbackData) => {
  await new Promise(resolve => setTimeout(resolve, 600))
  
  if (!callbackData.name || !callbackData.phone) {
    throw new Error('Nom et téléphone requis')
  }
  
  return {
    data: {
      message: 'Demande de rappel enregistrée. Nous vous contacterons bientôt.'
    }
  }
}

// Mock request quote
export const requestQuote = async (quoteData) => {
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  if (!quoteData.name || !quoteData.email || !quoteData.projectType) {
    throw new Error('Informations de base requises')
  }
  
  return {
    data: {
      message: 'Demande de devis envoyée. Nous vous contacterons pour discuter de votre projet.'
    }
  }
}

// Mock get FAQ
export const getFAQ = async (category = null) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  
  let filteredFAQ = mockFAQ
  
  if (category) {
    filteredFAQ = mockFAQ.filter(item => item.category === category)
  }
  
  return {
    data: {
      items: filteredFAQ
    }
  }
}
