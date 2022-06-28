import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: null,
  error: null,
}

export const userAccountSlice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setUserAccount: (state, action) => {
      state.data = action.payload.data
      state.error = action.payload.error
    },
    logoutUserAccount: (state) => {
      state.data = null
      state.error = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserAccount, logoutUserAccount } = userAccountSlice.actions

export default userAccountSlice.reducer
