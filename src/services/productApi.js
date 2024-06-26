import axios from 'axios'
 export const callCreateProduct = (values) => {
    return axios.post('http://localhost:3003/product/createProduct', values)
 }

 export const callUpdateProduct = (values) => {
   return axios.post('http://localhost:3003/product/updateProduct',values)
 }

 export const callDeleteProduct =(_id) => {
   return axios.post(`http://localhost:3003/product/deleteProduct/${_id}`)
 }
 export const callFetchAllProduct = () => {
  return axios.get('http://localhost:3003/product/fetchAllProduct')
}

export const callFetchProductById = (id)  => {
  return axios.get(`http://localhost:3003/product/fetchProductById/${id}`)
}

export const callHandleUploadFile = (values)=> {
  return axios.post('http://localhost:3003/product/uploadFile' , values)
}

export const callCreateComments = (values) => {
  return axios.post('http://localhost:3003/product/createComment', values)
}
export const callFetchCommentById = (_id) => {
  return axios.get(`http://localhost:3003/product/getCommentById/${_id}`)
}