import { createSlice } from '@reduxjs/toolkit'

// const storedAuth = JSON.parse(localStorage.getItem("auth")) || null;

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: null,
    user: null,
  },
  reducers: {
  
    login: (state, action) => {
        state.isLoggedIn=true
      state.user = action.payload //storing full user object
    },
    logout:(state)=>{
        state.isLoggedIn = false;
        state.user = null;
    },
    updateAddress: (state, action) => {
      if (state.user) {
        state.user.address = action.payload;
      }
    }


  }
})

// Action creators are generated for each case reducer function
export const { login,logout,updateAddress } = authSlice.actions


// Selector function 
export const isAdmin = (state) => {
  
  const isAdmin = state.auth.user?.name.trim().toLowerCase()==='admin'?true:false;
  return isAdmin;
};

export default authSlice.reducer