import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import cartReducer from './slices/cartSlice'
import authReducer from './slices/authSlice'
import ordersReducer from './slices/ordersSlice'
import wishlistReducer from './slices/wishlistSlice'
import stationsReducer from './slices/stationsSlice'
import contactReducer from './slices/contactSlice'
import uiReducer from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
    wishlist: wishlistReducer,
    stations: stationsReducer,
    contact: contactReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})
