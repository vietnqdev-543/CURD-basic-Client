import  { useEffect, useState } from 'react'
import './style.scss'
import { callGetOrderByID } from '../../../services/orderApi'
import { useSelector } from 'react-redux';
import {Divider, Button, Row} from 'antd'
const OrderManager = () => {
  const [listOrder , setListOrder]= useState([])
  const _id = useSelector(state => state.account.user._id)
  useEffect(()=>{
    handleGetOrderById()
  },[])
  const handleGetOrderById = async() => {
    const res = await callGetOrderByID(_id)
    setListOrder(res.data.data)
    console.log('check res :',res.data.data)
  }
  return (
    <div className='orderManager-container'>
      {listOrder.map((item , index)=>{
        return(
          <div className='cart-item' key={index}>
            <div>
              {item.status === 'confirm' ? <div style={{color:'grey', fontSize:'20px',marginTop:'10px'}}>Đã xác nhận</div> : <div>Đã huỷ</div>}
            </div>
             <Divider />
             <div>
                {item.detailProduct.map((item , index)=>{
                  return(
                    <div className='product-detail' key={index}>
                        <div className="content">
                          <div className='image'>
                            <img src={item.image} alt="" />
                          </div>
                          <div style={{width:'100%',display:'flex' , justifyContent:'space-between', lineHeight:'1.7rem'}}>
                            <div>
                              <div style={{fontSize:'20px'}}>{item.nameProduct}</div>
                              <div>Số lượng : {item.quantity}</div>
                            </div>
                            <div>{(item.quantity*item.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                          </div>
                        </div>
                        <Divider />
                    </div>
                  )
                })}
             </div>
            {/* <Divider /> */}
            <Row style={{display:'flex', justifyContent:'space-between' , alignItems:'center', gap:'10px' , padding:'10px 10px 20px 0'}}>
              <div style={{fontSize:'20px'}}> <span style={{color:'grey'}}>Tổng tiền :</span> {item.totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
              <div style={{display:'flex',alignItems:'center' , gap:'10px'}}>
                <Button >Xem chi tiết</Button>
                <Button type='primary'>Huỷ đơn hàng</Button>
              </div>
            </Row>
            
          </div>
        )
      })}
    </div>
  )
}

export default OrderManager

