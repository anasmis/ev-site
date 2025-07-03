import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as contactAPI from '../../services/contactAPI'
import { toast } from 'react-toastify'

// Async thunks
export const sendContactMessage = createAsyncThunk(
  'contact/sendContactMessage',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await contactAPI.sendContactMessage(messageData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de l\'envoi du message')
    }
  }
)

export const subscribeToNewsletter = createAsyncThunk(
  'contact/subscribeToNewsletter',
  async (email, { rejectWithValue }) => {
    try {
      const response = await contactAPI.subscribeToNewsletter(email)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de l\'inscription à la newsletter')
    }
  }
)

export const requestCallback = createAsyncThunk(
  'contact/requestCallback',
  async (callbackData, { rejectWithValue }) => {
    try {
      const response = await contactAPI.requestCallback(callbackData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la demande de rappel')
    }
  }
)

export const requestQuote = createAsyncThunk(
  'contact/requestQuote',
  async (quoteData, { rejectWithValue }) => {
    try {
      const response = await contactAPI.requestQuote(quoteData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors de la demande de devis')
    }
  }
)

export const getFAQ = createAsyncThunk(
  'contact/getFAQ',
  async (category = null) => {
    const response = await contactAPI.getFAQ(category)
    return response.data
  }
)

const initialState = {
  contactForm: {
    loading: false,
    success: false,
    error: null
  },
  newsletter: {
    loading: false,
    success: false,
    error: null,
    isSubscribed: false
  },
  callback: {
    loading: false,
    success: false,
    error: null
  },
  quote: {
    loading: false,
    success: false,
    error: null
  },
  faq: {
    items: [],
    loading: false,
    error: null,
    categories: [
      { id: 'general', name: 'Général', icon: '❓' },
      { id: 'installation', name: 'Installation', icon: '🔧' },
      { id: 'products', name: 'Produits', icon: '🔌' },
      { id: 'maintenance', name: 'Maintenance', icon: '🛠️' },
      { id: 'billing', name: 'Facturation', icon: '💳' },
      { id: 'warranty', name: 'Garantie', icon: '🛡️' }
    ]
  },
  contactInfo: {
    phone: '+212 6 XX XX XX XX',
    email: 'contact@evborne.ma',
    address: 'Casablanca, Maroc',
    hours: {
      weekdays: '09:00 - 18:00',
      weekend: '09:00 - 14:00'
    },
    social: {
      facebook: 'https://facebook.com/evborne',
      instagram: 'https://instagram.com/evborne',
      linkedin: 'https://linkedin.com/company/evborne',
      twitter: 'https://twitter.com/evborne'
    }
  },
  support: {
    chatAvailable: true,
    averageResponseTime: '2 heures',
    supportHours: '24/7',
    languages: ['Français', 'Arabe', 'Anglais']
  },
  forms: {
    contact: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      category: 'general',
      priority: 'normal',
      attachments: []
    },
    callback: {
      name: '',
      phone: '',
      preferredTime: '',
      reason: '',
      urgency: 'normal'
    },
    quote: {
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      description: '',
      location: '',
      requirements: []
    }
  }
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    // Contact Form
    clearContactForm: (state) => {
      state.contactForm.success = false
      state.contactForm.error = null
    },
    
    updateContactForm: (state, action) => {
      state.forms.contact = { ...state.forms.contact, ...action.payload }
    },
    
    resetContactForm: (state) => {
      state.forms.contact = initialState.forms.contact
    },
    
    // Newsletter
    clearNewsletterState: (state) => {
      state.newsletter.success = false
      state.newsletter.error = null
    },
    
    setNewsletterSubscribed: (state, action) => {
      state.newsletter.isSubscribed = action.payload
    },
    
    // Callback
    clearCallbackForm: (state) => {
      state.callback.success = false
      state.callback.error = null
    },
    
    updateCallbackForm: (state, action) => {
      state.forms.callback = { ...state.forms.callback, ...action.payload }
    },
    
    resetCallbackForm: (state) => {
      state.forms.callback = initialState.forms.callback
    },
    
    // Quote
    clearQuoteForm: (state) => {
      state.quote.success = false
      state.quote.error = null
    },
    
    updateQuoteForm: (state, action) => {
      state.forms.quote = { ...state.forms.quote, ...action.payload }
    },
    
    resetQuoteForm: (state) => {
      state.forms.quote = initialState.forms.quote
    },
    
    // FAQ
    toggleFAQItem: (state, action) => {
      const itemId = action.payload
      const item = state.faq.items.find(item => item.id === itemId)
      if (item) {
        item.isOpen = !item.isOpen
      }
    },
    
    searchFAQ: (state, action) => {
      const query = action.payload.toLowerCase()
      state.faq.items = state.faq.items.map(item => ({
        ...item,
        isVisible: item.question.toLowerCase().includes(query) || 
                   item.answer.toLowerCase().includes(query)
      }))
    },
    
    clearFAQSearch: (state) => {
      state.faq.items = state.faq.items.map(item => ({
        ...item,
        isVisible: true
      }))
    },
    
    // General
    clearAllErrors: (state) => {
      state.contactForm.error = null
      state.newsletter.error = null
      state.callback.error = null
      state.quote.error = null
      state.faq.error = null
    },
    
    updateContactInfo: (state, action) => {
      state.contactInfo = { ...state.contactInfo, ...action.payload }
    },
    
    updateSupportInfo: (state, action) => {
      state.support = { ...state.support, ...action.payload }
    }
  },
  extraReducers: (builder) => {
    builder
      // Send Contact Message
      .addCase(sendContactMessage.pending, (state) => {
        state.contactForm.loading = true
        state.contactForm.error = null
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.contactForm.loading = false
        state.contactForm.success = true
        state.contactForm.error = null
        state.forms.contact = initialState.forms.contact
        toast.success('Message envoyé avec succès')
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.contactForm.loading = false
        state.contactForm.error = action.payload
        state.contactForm.success = false
        toast.error(action.payload)
      })
      
      // Subscribe to Newsletter
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.newsletter.loading = true
        state.newsletter.error = null
      })
      .addCase(subscribeToNewsletter.fulfilled, (state, action) => {
        state.newsletter.loading = false
        state.newsletter.success = true
        state.newsletter.error = null
        state.newsletter.isSubscribed = true
        toast.success('Inscription à la newsletter réussie')
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.newsletter.loading = false
        state.newsletter.error = action.payload
        state.newsletter.success = false
        toast.error(action.payload)
      })
      
      // Request Callback
      .addCase(requestCallback.pending, (state) => {
        state.callback.loading = true
        state.callback.error = null
      })
      .addCase(requestCallback.fulfilled, (state, action) => {
        state.callback.loading = false
        state.callback.success = true
        state.callback.error = null
        state.forms.callback = initialState.forms.callback
        toast.success('Demande de rappel envoyée')
      })
      .addCase(requestCallback.rejected, (state, action) => {
        state.callback.loading = false
        state.callback.error = action.payload
        state.callback.success = false
        toast.error(action.payload)
      })
      
      // Request Quote
      .addCase(requestQuote.pending, (state) => {
        state.quote.loading = true
        state.quote.error = null
      })
      .addCase(requestQuote.fulfilled, (state, action) => {
        state.quote.loading = false
        state.quote.success = true
        state.quote.error = null
        state.forms.quote = initialState.forms.quote
        toast.success('Demande de devis envoyée')
      })
      .addCase(requestQuote.rejected, (state, action) => {
        state.quote.loading = false
        state.quote.error = action.payload
        state.quote.success = false
        toast.error(action.payload)
      })
      
      // Get FAQ
      .addCase(getFAQ.pending, (state) => {
        state.faq.loading = true
        state.faq.error = null
      })
      .addCase(getFAQ.fulfilled, (state, action) => {
        state.faq.loading = false
        state.faq.items = action.payload.items.map(item => ({
          ...item,
          isOpen: false,
          isVisible: true
        }))
      })
      .addCase(getFAQ.rejected, (state, action) => {
        state.faq.loading = false
        state.faq.error = action.error.message
      })
  }
})

export const {
  clearContactForm,
  updateContactForm,
  resetContactForm,
  clearNewsletterState,
  setNewsletterSubscribed,
  clearCallbackForm,
  updateCallbackForm,
  resetCallbackForm,
  clearQuoteForm,
  updateQuoteForm,
  resetQuoteForm,
  toggleFAQItem,
  searchFAQ,
  clearFAQSearch,
  clearAllErrors,
  updateContactInfo,
  updateSupportInfo
} = contactSlice.actions

export default contactSlice.reducer
