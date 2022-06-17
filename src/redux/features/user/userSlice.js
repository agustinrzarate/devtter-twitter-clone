import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.data = action.payload.data;
      state.error = action.payload.error;
    },
    logoutUser: (state) => {
        state.data = null;
        state.error = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer