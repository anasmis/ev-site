import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as authAPI from '../../services/authAPI'
import { toast } from 'react-toastify'

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(credentials)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de connexion')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.register(userData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur d\'inscription')
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authAPI.updateProfile(userData)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de mise à jour')
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authAPI.changePassword(passwordData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de changement de mot de passe')
    }
  }
)

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await authAPI.requestPasswordReset(email)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de demande de réinitialisation')
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await authAPI.resetPassword(resetData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur de réinitialisation')
    }
  }
)

const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token')
    return user && token ? JSON.parse(user) : null
  } catch (error) {
    return null
  }
}

const initialState = {
  user: loadUserFromStorage(),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  resetPasswordLoading: false,
  resetPasswordSent: false,
  profile: {
    loading: false,
    error: null
  },
  passwordChange: {
    loading: false,
    error: null,
    success: false
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      toast.info('Vous avez été déconnecté')
    },
    
    clearError: (state) => {
      state.error = null
      state.profile.error = null
      state.passwordChange.error = null
    },
    
    clearResetPasswordState: (state) => {
      state.resetPasswordLoading = false
      state.resetPasswordSent = false
      state.error = null
    },
    
    clearPasswordChangeState: (state) => {
      state.passwordChange.loading = false
      state.passwordChange.error = null
      state.passwordChange.success = false
    },
    
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        localStorage.setItem('user', JSON.stringify(state.user))
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
        toast.success('Connexion réussie')
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
        toast.error(action.payload)
      })
      
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
        toast.success('Inscription réussie')
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
        toast.error(action.payload)
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.profile.loading = true
        state.profile.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile.loading = false
        state.user = action.payload.user
        state.profile.error = null
        toast.success('Profil mis à jour')
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profile.loading = false
        state.profile.error = action.payload
        toast.error(action.payload)
      })
      
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.passwordChange.loading = true
        state.passwordChange.error = null
        state.passwordChange.success = false
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.passwordChange.loading = false
        state.passwordChange.error = null
        state.passwordChange.success = true
        toast.success('Mot de passe changé avec succès')
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.passwordChange.loading = false
        state.passwordChange.error = action.payload
        state.passwordChange.success = false
        toast.error(action.payload)
      })
      
      // Request Password Reset
      .addCase(requestPasswordReset.pending, (state) => {
        state.resetPasswordLoading = true
        state.error = null
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.resetPasswordLoading = false
        state.resetPasswordSent = true
        state.error = null
        toast.success('Email de réinitialisation envoyé')
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.resetPasswordLoading = false
        state.error = action.payload
        toast.error(action.payload)
      })
      
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false
        state.error = null
        toast.success('Mot de passe réinitialisé avec succès')
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  }
})

export const {
  logout,
  clearError,
  clearResetPasswordState,
  clearPasswordChangeState,
  updateUserProfile
} = authSlice.actions

export default authSlice.reducer
