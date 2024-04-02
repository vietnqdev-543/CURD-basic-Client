
import axios from 'axios'
 export const callFetchAllProduct = () => {
    return axios.get('http://localhost:3003/product/fetchAllProduct')
 }
 export const callCreateProduct = (values) => {
    return axios.post('http://localhost:3003/product/createProduct', values)
 }

 export const callFetchUser = () => {
  return axios.get('http://localhost:3003/user/authenticatedToken')
 }
export const callCreateUser = (values) => {
  return axios.post('http://localhost:3003/user/createUser' , values)
}
export const callLoginUser = (values) => {
  return axios.post('http://localhost:3003/user/loginUser' , values)
}
export const callLogoutUser = () => {
  return axios.post('http://localhost:3003/user/logoutUser')
}