import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import userAccountSlice from './features/userAccount/userAccountSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    userAccount: userAccountSlice,
  },
})
