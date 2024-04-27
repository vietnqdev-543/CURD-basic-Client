import axios from "axios";
export const callCreateOrder = (values) => {
    return axios.post('http://localhost:3003/order/createOrder' , values)
}
export const callfetchAllOrder = () => {
    return axios.get('http://localhost:3003/order/fetchAllOrder' )
}
export const callGetOrderByID = (_id) => {
    return axios.get(`http://localhost:3003/order/getOrderById/${_id}`  )
}
