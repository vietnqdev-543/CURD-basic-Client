  import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

  const initialState = {
    carts: [

    ]
  }

  // export const orderSlice = createSlice({
  //   name: 'order',
  //   initialState,
  //   reducers: {
  //     doCreateCartProduct: (state, action) => {
  //       const { quantity, _id, detail } = action.payload; 
  
  //       let carts = state.carts;
  //       const existingItemIndex = carts.findIndex(newItem => newItem._id === _id);
  
  //       if (existingItemIndex > -1) {
  //         carts[existingItemIndex].quantity += quantity; 
  //         if( carts[existingItemIndex] > carts[existingItemIndex].detail.quantity){
  //           carts[existingItemIndex] = carts[existingItemIndex].detail.quantity
  //         }
  //       } else {
  //         carts.push({ quantity, _id, detail });
  //       }
  
  //       state.carts = carts;
  //     },
  //   },
  // });
  export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      doCreateCartProduct: (state, action) => {
        const { quantity, _id, detail } = action.payload;
  
        let carts = state.carts;
        const existingItemIndex = carts.findIndex(newItem => newItem._id === _id);
  
        if (existingItemIndex > -1) {
          let updatedQuantity = carts[existingItemIndex].quantity + quantity;
          if (updatedQuantity > detail.quantity) { // Check against product quantity
            carts[existingItemIndex].quantity = detail.quantity;
            message.error(`Số lượng sản phẩm đã vượt quá số lượng còn lại. Đã cập nhật số lượng tối đa`);
          } else {
            carts[existingItemIndex].quantity = updatedQuantity;
          }
        } else {
          if (quantity <= detail.quantity) {
            carts.push({ quantity, _id, detail });
          } else {    
            carts.push({ quantity: detail.quantity, _id, detail });
            message.error(`Số lượng sản phẩm đã vượt quá số lượng còn lại. Đã cập nhật số lượng tối đa`);
          }
        }
  
        state.carts = carts;
      },
    },
  });
  

  // Export the action creator correctly
  export const { doCreateCartProduct } = orderSlice.actions;

  export default orderSlice.reducer;
