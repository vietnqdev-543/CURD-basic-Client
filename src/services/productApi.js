import axios from 'axios'
export const callFetchAllProduct = () => {
    return axios.get('http://localhost:3003/product/fetchAllProduct')
 }

 export const callCreateProduct = (values) => {
    return axios.post('http://localhost:3003/product/createProduct', values)
 }

 export const callUpdateProduct = (values) => {
   return axios.post('http://localhost:3003/product/updateProduct',values)
 }