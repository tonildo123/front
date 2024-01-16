import { configureStore } from '@reduxjs/toolkit'
import ClientsSlice from './ClientsSlice'

export const store = configureStore({
  reducer: {
    clients: ClientsSlice,        
  },
})