import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: {
      
    }
}


export const orderSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    createCartProduct : (state, action)=>{
       state.cart = action.payload()
    }
  },
})

// Action creators are generated for each case reducer function
export const { createCartProduct } = orderSlice.actions

export default orderSlice.reducer