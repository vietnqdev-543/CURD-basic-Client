  import { createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';

  const initialState = {
    userId : '',
    carts: [

    ]
  }
  export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      doCreateCartProduct: (state, action) => {
        const { userId ,quantity, _id, detail } = action.payload;
  
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
            carts.push({ userId,quantity, _id, detail });
          } else {    
            carts.push({ quantity: detail.quantity, _id, detail });
            message.error(`Số lượng sản phẩm đã vượt quá số lượng còn lại. Đã cập nhật số lượng tối đa`);
          }
        }
  
        state.carts = carts;
      },
      doUpdateCartProduct : (state, action) => {
        let carts = state.carts;
        const item = action.payload
        const existingItemIndex = carts.findIndex(newItem => newItem._id === item._id);
        if(existingItemIndex > -1){
          carts[existingItemIndex].quantity =item.quantity

          if(carts[existingItemIndex].quantity > carts[existingItemIndex].detail.quantity){
            carts[existingItemIndex].quantity = carts[existingItemIndex].detail.quantity
            message.info('Số lượng sản phẩm đã đạt tối đa')
          }
        }else{
          carts.push({quantity : item.quantity ,  _id : item._id , detail : item.detail})
        }
      },
      doDeleteCartProduct : (state, action) => {  
        state.carts = state.carts.filter(item => item._id !== action.payload._id)
        message.success('Xoá sản phẩm khỏi giỏ hàng thành công')
      },
      doResetCartProduct: (state , action) => {
        state.carts = []
      }
    },
  });
  

  // Export the action creator correctly
  export const { doCreateCartProduct ,doDeleteCartProduct, doUpdateCartProduct , doResetCartProduct} = orderSlice.actions;

  export default orderSlice.reducer;
