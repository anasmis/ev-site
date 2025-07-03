import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Theme
  theme: 'light',
  
  // Modals
  modals: {
    login: false,
    register: false,
    forgotPassword: false,
    productQuickView: false,
    productComparison: false,
    addressForm: false,
    orderTracking: false,
    supportChat: false,
    newsletterPopup: false,
    cookieConsent: false,
    mobileMenu: false,
    searchOverlay: false,
    cartSidebar: false,
    wishlistSidebar: false,
    filterSidebar: false
  },
  
  // Loading states
  loading: {
    global: false,
    page: false,
    component: {}
  },
  
  // Notifications
  notifications: [],
  
  // Search
  search: {
    query: '',
    suggestions: [],
    recentSearches: [],
    isActive: false,
    showSuggestions: false
  },
  
  // Layout
  layout: {
    sidebarCollapsed: false,
    headerFixed: true,
    footerVisible: true,
    breadcrumbVisible: true,
    backToTopVisible: false
  },
  
  // Mobile
  mobile: {
    isMenuOpen: false,
    isSearchOpen: false,
    orientation: 'portrait',
    breakpoint: 'sm'
  },
  
  // Filters
  filters: {
    isOpen: false,
    activeCount: 0,
    collapsed: {
      category: false,
      price: false,
      brand: false,
      rating: false,
      features: false
    }
  },
  
  // Pagination
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  },
  
  // Sorting
  sorting: {
    field: 'name',
    order: 'asc',
    options: [
      { value: 'name-asc', label: 'Nom A-Z' },
      { value: 'name-desc', label: 'Nom Z-A' },
      { value: 'price-asc', label: 'Prix croissant' },
      { value: 'price-desc', label: 'Prix décroissant' },
      { value: 'rating-desc', label: 'Mieux notés' },
      { value: 'date-desc', label: 'Plus récents' }
    ]
  },
  
  // View modes
  viewMode: 'grid', // grid, list, table
  
  // Alerts
  alerts: [],
  
  // Toasts
  toasts: [],
  
  // Preferences
  preferences: {
    currency: 'MAD',
    language: 'fr',
    itemsPerPage: 12,
    autoplayCarousel: true,
    showPricesWithTax: true,
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: false,
    cookiesAccepted: false,
    firstVisit: true
  },
  
  // Online status
  isOnline: true,
  
  // Error states
  errors: {
    network: null,
    auth: null,
    validation: {},
    global: null
  },
  
  // Form states
  forms: {
    touched: {},
    errors: {},
    submitting: {},
    submitted: {}
  },
  
  // Scroll position
  scrollPosition: 0,
  
  // Page metadata
  pageMetadata: {
    title: '',
    description: '',
    keywords: [],
    canonical: '',
    ogImage: ''
  },
  
  // Performance
  performance: {
    pageLoadTime: 0,
    apiResponseTimes: {},
    imageLoadTimes: {}
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Theme
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
    
    setTheme: (state, action) => {
      state.theme = action.payload
      localStorage.setItem('theme', state.theme)
    },
    
    // Modals
    openModal: (state, action) => {
      const modalName = action.payload
      state.modals[modalName] = true
    },
    
    closeModal: (state, action) => {
      const modalName = action.payload
      state.modals[modalName] = false
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(key => {
        state.modals[key] = false
      })
    },
    
    // Loading
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload
    },
    
    setPageLoading: (state, action) => {
      state.loading.page = action.payload
    },
    
    setComponentLoading: (state, action) => {
      const { component, loading } = action.payload
      state.loading.component[component] = loading
    },
    
    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload
      }
      state.notifications.unshift(notification)
      
      // Keep only last 20 notifications
      if (state.notifications.length > 20) {
        state.notifications = state.notifications.slice(0, 20)
      }
    },
    
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    
    clearNotifications: (state) => {
      state.notifications = []
    },
    
    // Search
    setSearchQuery: (state, action) => {
      state.search.query = action.payload
    },
    
    setSearchSuggestions: (state, action) => {
      state.search.suggestions = action.payload
    },
    
    addRecentSearch: (state, action) => {
      const query = action.payload
      if (query && !state.search.recentSearches.includes(query)) {
        state.search.recentSearches.unshift(query)
        if (state.search.recentSearches.length > 10) {
          state.search.recentSearches.pop()
        }
      }
    },
    
    clearRecentSearches: (state) => {
      state.search.recentSearches = []
    },
    
    setSearchActive: (state, action) => {
      state.search.isActive = action.payload
    },
    
    showSearchSuggestions: (state) => {
      state.search.showSuggestions = true
    },
    
    hideSearchSuggestions: (state) => {
      state.search.showSuggestions = false
    },
    
    // Layout
    toggleSidebar: (state) => {
      state.layout.sidebarCollapsed = !state.layout.sidebarCollapsed
    },
    
    setSidebarCollapsed: (state, action) => {
      state.layout.sidebarCollapsed = action.payload
    },
    
    setHeaderFixed: (state, action) => {
      state.layout.headerFixed = action.payload
    },
    
    setBackToTopVisible: (state, action) => {
      state.layout.backToTopVisible = action.payload
    },
    
    // Mobile
    toggleMobileMenu: (state) => {
      state.mobile.isMenuOpen = !state.mobile.isMenuOpen
    },
    
    setMobileMenuOpen: (state, action) => {
      state.mobile.isMenuOpen = action.payload
    },
    
    setMobileSearchOpen: (state, action) => {
      state.mobile.isSearchOpen = action.payload
    },
    
    setMobileOrientation: (state, action) => {
      state.mobile.orientation = action.payload
    },
    
    setMobileBreakpoint: (state, action) => {
      state.mobile.breakpoint = action.payload
    },
    
    // Filters
    toggleFilters: (state) => {
      state.filters.isOpen = !state.filters.isOpen
    },
    
    setFiltersOpen: (state, action) => {
      state.filters.isOpen = action.payload
    },
    
    setActiveFilterCount: (state, action) => {
      state.filters.activeCount = action.payload
    },
    
    toggleFilterCollapsed: (state, action) => {
      const filterName = action.payload
      state.filters.collapsed[filterName] = !state.filters.collapsed[filterName]
    },
    
    // View mode
    setViewMode: (state, action) => {
      state.viewMode = action.payload
      localStorage.setItem('viewMode', action.payload)
    },
    
    // Alerts
    addAlert: (state, action) => {
      const alert = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        ...action.payload
      }
      state.alerts.push(alert)
    },
    
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(a => a.id !== action.payload)
    },
    
    clearAlerts: (state) => {
      state.alerts = []
    },
    
    // Preferences
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload }
      localStorage.setItem('preferences', JSON.stringify(state.preferences))
    },
    
    resetPreferences: (state) => {
      state.preferences = initialState.preferences
      localStorage.removeItem('preferences')
    },
    
    // Online status
    setOnlineStatus: (state, action) => {
      state.isOnline = action.payload
    },
    
    // Errors
    setError: (state, action) => {
      const { type, error } = action.payload
      state.errors[type] = error
    },
    
    clearError: (state, action) => {
      const type = action.payload
      state.errors[type] = null
    },
    
    clearAllErrors: (state) => {
      state.errors = initialState.errors
    },
    
    // Forms
    setFormTouched: (state, action) => {
      const { form, field } = action.payload
      if (!state.forms.touched[form]) {
        state.forms.touched[form] = {}
      }
      state.forms.touched[form][field] = true
    },
    
    setFormError: (state, action) => {
      const { form, field, error } = action.payload
      if (!state.forms.errors[form]) {
        state.forms.errors[form] = {}
      }
      state.forms.errors[form][field] = error
    },
    
    clearFormErrors: (state, action) => {
      const form = action.payload
      if (state.forms.errors[form]) {
        state.forms.errors[form] = {}
      }
    },
    
    setFormSubmitting: (state, action) => {
      const { form, submitting } = action.payload
      state.forms.submitting[form] = submitting
    },
    
    setFormSubmitted: (state, action) => {
      const { form, submitted } = action.payload
      state.forms.submitted[form] = submitted
    },
    
    // Scroll position
    setScrollPosition: (state, action) => {
      state.scrollPosition = action.payload
    },
    
    // Page metadata
    setPageMetadata: (state, action) => {
      state.pageMetadata = { ...state.pageMetadata, ...action.payload }
    },
    
    // Performance
    setPageLoadTime: (state, action) => {
      state.performance.pageLoadTime = action.payload
    },
    
    setApiResponseTime: (state, action) => {
      const { endpoint, time } = action.payload
      state.performance.apiResponseTimes[endpoint] = time
    },
    
    // Initialize UI state from localStorage
    initializeUI: (state) => {
      try {
        const savedTheme = localStorage.getItem('theme')
        const savedViewMode = localStorage.getItem('viewMode')
        const savedPreferences = localStorage.getItem('preferences')
        
        if (savedTheme) {
          state.theme = savedTheme
        }
        
        if (savedViewMode) {
          state.viewMode = savedViewMode
        }
        
        if (savedPreferences) {
          state.preferences = { ...state.preferences, ...JSON.parse(savedPreferences) }
        }
      } catch (error) {
        console.error('Error initializing UI state:', error)
      }
    }
  }
})

export const {
  toggleTheme,
  setTheme,
  openModal,
  closeModal,
  closeAllModals,
  setGlobalLoading,
  setPageLoading,
  setComponentLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  setSearchQuery,
  setSearchSuggestions,
  addRecentSearch,
  clearRecentSearches,
  setSearchActive,
  showSearchSuggestions,
  hideSearchSuggestions,
  toggleSidebar,
  setSidebarCollapsed,
  setHeaderFixed,
  setBackToTopVisible,
  toggleMobileMenu,
  setMobileMenuOpen,
  setMobileSearchOpen,
  setMobileOrientation,
  setMobileBreakpoint,
  toggleFilters,
  setFiltersOpen,
  setActiveFilterCount,
  toggleFilterCollapsed,
  setViewMode,
  addAlert,
  removeAlert,
  clearAlerts,
  updatePreferences,
  resetPreferences,
  setOnlineStatus,
  setError,
  clearError,
  clearAllErrors,
  setFormTouched,
  setFormError,
  clearFormErrors,
  setFormSubmitting,
  setFormSubmitted,
  setScrollPosition,
  setPageMetadata,
  setPageLoadTime,
  setApiResponseTime,
  initializeUI
} = uiSlice.actions

export default uiSlice.reducer
