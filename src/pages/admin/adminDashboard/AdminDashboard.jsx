import React, { useState , useEffect } from 'react'
import { useSelector } from 'react-redux'
import { callFetchAllUser } from '../../../services/userApi'
import { callFetchAllProduct } from '../../../services/productApi'
const AdminDashboard = () => {
  const [allUser , setAllUser ] = useState([])
  const [allProduct , setAllProduct ] = useState([])
  useEffect(()=> {
    getAllUser() , getAllProduct()
  },[])
  const getAllUser = async() => {
    const res = await callFetchAllUser()
    console.log(res.data)
    setAllUser(res.data)
  }
  const getAllProduct = async() => {
    const res =await callFetchAllProduct()
    console.log(res.data)
    setAllProduct(res.data)
    
  }
  const userName = useSelector(state => state.account.user.name)
  return (
    <div>
        <h1>Dashboard</h1>
        <h4>Have a nice day, how is your day today?</h4>
        <h1>All user : {allUser.length}</h1>
        <h1>All product : {allProduct.length}</h1>
        
    </div>
  )
}

export default AdminDashboard