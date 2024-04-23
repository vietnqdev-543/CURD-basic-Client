import  { useState } from 'react'
import './style.scss'
import { Checkbox, Col, Divider,  Row, Steps } from 'antd';
const Cart = () => {
    const [quantity , setQuantity] = useState(1)
    const handleIncreaseQuantity = () => {
        setQuantity(pre=> pre + 1)
    }
    const handleReduceQuantity = () => {
       if(quantity>1){
        setQuantity(pre => pre - 1)
       }
    }
    return (
        <div className='cart-container'>
            <Row gutter={20}>
                <Col className='left' span={18}>
                    {/* <Row style={{ margin:0,display:'flex', alignItems:'center' , justifyContent:'space-between' , padding:'20px 40px 0 40px'}}>
                        <Col span={11}>Sản phẩm</Col>
                        <div>Số lượng</div>
                        <div>Giá tiền</div>
                        <div>Tổng tiền</div>
                    </Row>
                    <div style={{padding:'0 5px'}}> 
                        <Divider />
                     </div> */}
                    <div className="item-cart">
                        <Col span={8} style={{display:'flex', alignItems:'center'}}>
                            <Checkbox></Checkbox>
                            <img src='https://image.donghohaitrieu.com/wp-content/uploads/2023/09/EFR-526L-1AVUDF-1.jpg' alt="" className='image' />
                            <div style={{display:'flex',alignItems:'flex-start', flexDirection:'column', padding:'5px', gap:'10px' , cursor:'default'}}>
                                <span className='name'>Casio EFR-526L-1AVUDF</span>
                                <span>Remove</span>
                            </div>
                        </Col>

                      <div style={{display:'flex' , gap:'10px' , justifyContent:'center'}}>
                      <div className="quantity">
                           <button onClick={handleReduceQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={handleIncreaseQuantity}>+</button>     
                        </div>
                        <div>Số lượng còn lại: 10</div>
                      </div>
                        

                      <div style={{display:'flex', gap:'100px'}}>
                        <div className="price">
                                <span>1.100.000 vnđ</span>
                            </div>
                            <div className='totalPrice'>
                                <span>1.100.000 vnđ</span>
                            </div>
                      </div>

                    </div>
                      <Divider />
                   
                </Col>
                <Col className='right' span={6}>
                    <Col className='pay' span={24}>
                        <h2 style={{ padding: '0 20px 30px 20px' }}>Tóm tắt giỏ hàng</h2>
                        <Row style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>

                            <span>Tạm tính</span>
                            <span>100.000 vnđ</span>
                            <Divider />

                        </Row>
                        <Row style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', alignItems:'center' }}>
                            <span>Tổng tính</span>
                            <span style={{ color: 'darkred', fontSize: '20px', fontWeight: 'bold' }}>100.000 vnđ</span>
                            <Divider />
                        </Row>
                        <Row gutter={10} style={{ display: 'flex', justifyContent: 'space-between', padding:'0 20px', alignItems:'center' }}>

                            <Col span={16}>
                                <input placeholder='Mã giảm giá' type="text" style={{ width: '100%', padding: '10px 20px', outline:'none' }} />
                            </Col>
                            <Col span={8}>
                                <button style={{ width: '100%', padding: '12px 20px', background:'darkred' , borderRadius:'5px', color:'white' , border:'1px solid darkred' }}>Áp dụng</button>
                            </Col>

                        </Row>
                      
                        <Row style={{padding:'0 20px'}}>
                            <button style={{width:'100%', padding:'15px 20px' , margin:'30px 0' , backgroundColor:'darkred', color:'white', border:'none', borderRadius:'5px'}}> Thanh toán (1)</button>
                        </Row>

                    </Col>
                </Col>
            </Row>

        </div>
    )
}

export default Cart