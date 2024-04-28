import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { callFetchAllUser } from '../../../services/userApi'
import { callFetchAllProduct } from '../../../services/productApi'
import { Statistic, Table } from 'antd';
import { MdOutlineAccountCircle } from "react-icons/md";
import { FiBox } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
const formatter = (value) => <CountUp end={value} separator="," />;
import './style.scss'
import { callFetchAllCategory } from '../../../services/categoryApi';
import { TbCategory } from "react-icons/tb";
import { callfetchAllOrder } from '../../../services/orderApi';

const AdminDashboard = () => {
  const [allUser, setAllUser] = useState([])
  const [allProduct, setAllProduct] = useState([])
  const [allCategory, setAllCategory] = useState([])
  const [allOrder, setAllOrder] = useState([])
  useEffect(() => {
    getAllUser(), getAllProduct(), getAllCategory() , getAllOrder()
  }, [])
  const getAllUser = async () => {
    const res = await callFetchAllUser()
    console.log(res.data)
    setAllUser(res.data)
  }
  const getAllProduct = async () => {
    const res = await callFetchAllProduct()
    console.log(res.data)
    setAllProduct(res.data)
  }
  const getAllCategory = async () => {
    const res = await callFetchAllCategory()
    setAllCategory(res.data.data)
  }
  const getAllOrder = async() =>{
    const res = await callfetchAllOrder()
    console.log('check order :', res.data)
    setAllOrder(res.data.data)
  }
  const userName = useSelector(state => state.account.user.name)
  const allArr = [
    { name: 'Accounts', quantity: allUser.length, icon: <MdOutlineAccountCircle />, route: './user' },
    { name: 'Products', quantity: allProduct.length, icon: <FiBox />, route: './product' },
    { name: 'Category', quantity: allCategory.length, icon: <TbCategory />, route: './category' },
    { name: 'Orders', quantity: allOrder.length, icon: <AiOutlineShoppingCart />, route: './order' },
  ];
  return (
    <div>
      <div style={{ paddingBottom: '20px', lineHeight: '30px' }}>
        <h1>DASHBOARD</h1>
        <h3 style={{ color: 'grey' }}>
          Welcome <span style={{ color: 'black' , textTransform:'uppercase' }}>{userName}</span> , everything looks great
        </h3>
      </div>
      <div className="dashboard-app">
        {allArr.map((item, index) => {
          return (
            <div className="item">
              <div className='top' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Statistic className='number' value={item.quantity} formatter={formatter} />
                  <div className="name">Total {item.name}</div>
                </div>
                <div className='icon'>
                  <span>{item.icon}</span>
                </div>
              </div>
              <div className="bottom" style={{ color: 'blue', bottom: 0 }} onClick={() => { navigate(item.route) }}>
                View all {item.name}
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default AdminDashboard