import api from './api'

// Mock user data
const mockUser = {
  id: 1,
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+212 6 12 34 56 78',
  address: {
    street: '123 Avenue Mohammed V',
    city: 'Casablanca',
    zipCode: '20000',
    country: 'Maroc'
  },
  avatar: null,
  emailVerified: true,
  phoneVerified: false,
  preferences: {
    language: 'fr',
    currency: 'MAD',
    emailNotifications: true,
    smsNotifications: false
  },
  createdAt: '2024-01-15T10:30:00Z',
  lastLogin: '2024-07-03T08:15:00Z'
}

// Mock login
export const login = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const { email, password } = credentials
  
  // Simple mock validation
  if (email === 'user@example.com' && password === 'password') {
    return {
      data: {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now()
      }
    }
  }
  
  throw new Error('Identifiants invalides')
}

// Mock register
export const register = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 1200))
  
  const { email, password, firstName, lastName, phone } = userData
  
  // Simple validation
  if (!email || !password || !firstName || !lastName) {
    throw new Error('Tous les champs sont obligatoires')
  }
  
  if (password.length < 6) {
    throw new Error('Le mot de passe doit contenir au moins 6 caractères')
  }
  
  const newUser = {
    ...mockUser,
    id: Date.now(),
    email,
    firstName,
    lastName,
    phone: phone || '',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
  
  return {
    data: {
      user: newUser,
      token: 'mock-jwt-token-' + Date.now()
    }
  }
}

// Mock update profile
export const updateProfile = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const updatedUser = {
    ...mockUser,
    ...userData,
    id: mockUser.id, // Keep original ID
    email: mockUser.email, // Keep original email
    updatedAt: new Date().toISOString()
  }
  
  return {
    data: {
      user: updatedUser
    }
  }
}

// Mock change password
export const changePassword = async (passwordData) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const { currentPassword, newPassword } = passwordData
  
  // Simple validation
  if (currentPassword !== 'password') {
    throw new Error('Mot de passe actuel incorrect')
  }
  
  if (newPassword.length < 6) {
    throw new Error('Le nouveau mot de passe doit contenir au moins 6 caractères')
  }
  
  return {
    data: {
      message: 'Mot de passe changé avec succès'
    }
  }
}

// Mock request password reset
export const requestPasswordReset = async (email) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (!email) {
    throw new Error('Email requis')
  }
  
  return {
    data: {
      message: 'Email de réinitialisation envoyé'
    }
  }
}

// Mock reset password
export const resetPassword = async (resetData) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const { token, newPassword } = resetData
  
  if (!token || !newPassword) {
    throw new Error('Token et nouveau mot de passe requis')
  }
  
  if (newPassword.length < 6) {
    throw new Error('Le mot de passe doit contenir au moins 6 caractères')
  }
  
  return {
    data: {
      message: 'Mot de passe réinitialisé avec succès'
    }
  }
}

// Mock verify email
export const verifyEmail = async (token) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (!token) {
    throw new Error('Token requis')
  }
  
  return {
    data: {
      message: 'Email vérifié avec succès'
    }
  }
}

// Mock verify phone
export const verifyPhone = async (code) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  if (!code) {
    throw new Error('Code requis')
  }
  
  if (code !== '123456') {
    throw new Error('Code incorrect')
  }
  
  return {
    data: {
      message: 'Téléphone vérifié avec succès'
    }
  }
}

// Mock get user profile
export const getUserProfile = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return {
    data: {
      user: mockUser
    }
  }
}

// Mock upload avatar
export const uploadAvatar = async (file) => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Simulate file upload
  const avatarUrl = URL.createObjectURL(file)
  
  return {
    data: {
      avatarUrl,
      message: 'Avatar mis à jour avec succès'
    }
  }
}

// Mock delete account
export const deleteAccount = async (password) => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  if (password !== 'password') {
    throw new Error('Mot de passe incorrect')
  }
  
  return {
    data: {
      message: 'Compte supprimé avec succès'
    }
  }
}

// Mock get user orders
export const getUserOrders = async (params = {}) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock orders data would be returned here
  return {
    data: {
      orders: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        pages: 0
      }
    }
  }
}

// Mock get user addresses
export const getUserAddresses = async () => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return {
    data: {
      addresses: [
        {
          id: 1,
          type: 'home',
          name: 'Domicile',
          street: '123 Avenue Mohammed V',
          city: 'Casablanca',
          zipCode: '20000',
          country: 'Maroc',
          isDefault: true
        },
        {
          id: 2,
          type: 'work',
          name: 'Bureau',
          street: '456 Boulevard Hassan II',
          city: 'Rabat',
          zipCode: '10000',
          country: 'Maroc',
          isDefault: false
        }
      ]
    }
  }
}

// Mock add address
export const addAddress = async (addressData) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newAddress = {
    id: Date.now(),
    ...addressData,
    createdAt: new Date().toISOString()
  }
  
  return {
    data: {
      address: newAddress
    }
  }
}

// Mock update address
export const updateAddress = async (addressId, addressData) => {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const updatedAddress = {
    id: addressId,
    ...addressData,
    updatedAt: new Date().toISOString()
  }
  
  return {
    data: {
      address: updatedAddress
    }
  }
}

// Mock delete address
export const deleteAddress = async (addressId) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  return {
    data: {
      message: 'Adresse supprimée avec succès'
    }
  }
}
