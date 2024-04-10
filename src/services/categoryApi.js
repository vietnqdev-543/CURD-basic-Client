import axios from 'axios'
export const callCreateCategory = (values) => {
    return axios.post('http://localhost:3003/category/createCategory', values)
}
export const callFetchAllCategory  = () => {
    return axios.get('http://localhost:3003/category/fetchAllCategory')
}
