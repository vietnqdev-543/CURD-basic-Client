import { createSlice } from '@reduxjs/toolkit'
import { Avatar } from 'antd'

const initialState = {
    isLoading: true,
    isLogin : false , 
    user : {
      id : '' ,
        isAdmin : '',
        email : '' ,
        name : '',
        password : '' , 
        phone : '',
        image : '',
        Avatar : '' ,
        createdAt : '' ,
    } ,
}

export const accountSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    doLoginAction: (state , action) => {
       state.isLoading = false 
       state.isLogin = true 
       state.user= action.payload
    },
    doUpdateInfo : (state, action) =>{
      state.user = action.payload
    } ,
    doChangePassword : (state, action) => {
      state.user = action.payload
    },
    doLogoutAction : (state , action) => {
      state.isLoading = true
      state.isLogin = false
      localStorage.removeItem('access_token')
      state.user = ({
        isAdmin : '' ,
        email : '' ,
        name : '',
        password : '' , 
        phone : '',
        image : '',
        id : '' ,
        avatar : '',
        createdAt : '' ,
      })
    }

  },
})

// Action creators are generated for each case reducer function
export const { doLoginAction , doLogoutAction , doChangePassword,doUpdateInfo} = accountSlice.actions

export default accountSlice.reducer