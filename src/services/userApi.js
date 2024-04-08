
import axios from 'axios'
export const callCreateUser = (values) => {
  return axios.post('http://localhost:3003/user/createUser' , values)
}
export const callLoginUser = (values) => {
  return axios.post('http://localhost:3003/user/loginUser' , values)
}
export const callLogoutUser = () => {
  return axios.post('http://localhost:3003/user/logoutUser')
}
export const callUpdateUser = (values) => {
  return axios.post('http://localhost:3003/user/updateUser' , values)
}
export const callFetchAllUser = () => {
    return axios.get('http://localhost:3003/user/fetchAllUser')
}
export const callDeleteUser = (_id) => {
  return axios.post(`http://localhost:3003/user/deleteUser/${_id}`)
}