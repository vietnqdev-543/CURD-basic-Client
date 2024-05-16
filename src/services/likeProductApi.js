import axios from "axios";
export const callAddLikeProduct = (values) => {
    return axios.post('http://localhost:3003/likeProduct/addLikeProduct', values)
}
export const callFetchAllLikeProduct = () => {
    return axios.get('http://localhost:3003/likeProduct/fetchAllLikeProduct')
}
