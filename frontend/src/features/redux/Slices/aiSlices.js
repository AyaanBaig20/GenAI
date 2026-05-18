import { createSlice } from '@reduxjs/toolkit'

export const aiSlices = createSlice({
  name: 'ai',
  initialState:{
    report:[],
    loading:false
  },
  reducers: {
    setReport:(state,actions)=>{
        state.report=actions.payload
    },
    setLoading:(state,actions)=>{
        state.loading=actions.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const {setLoading,setReport } = aiSlices.actions

export default aiSlices.reducer