import { createSlice } from '@reduxjs/toolkit'

const storedAuth = JSON.parse(localStorage.getItem("auth")) || null;

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!storedAuth,
    user: null
  },
  reducers: {
  
    login: (state, action) => {
        state.isLoggedIn=true
      state.user = action.payload //storing full user object
    },
    logout:(state)=>{
        state.isLoggedIn = false;
        state.user = null;
    }

  }
})

// Action creators are generated for each case reducer function
export const { login,logout } = authSlice.actions

export default authSlice.reducer