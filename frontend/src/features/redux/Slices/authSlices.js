import { createSlice } from '@reduxjs/toolkit'

export const authSlices = createSlice({
  name: 'auth',
  initialState:{
    user:[],
    loading:false
  },
  reducers: {
    setUser:(state,actions)=>{
        state.user=actions.payload
    },
    setLoading:(state,actions)=>{
        state.loading=actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLoading,setUser } = authSlices.actions

export default authSlices.reducer