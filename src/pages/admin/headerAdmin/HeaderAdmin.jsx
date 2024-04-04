import React from 'react'
import './style.scss'
import { Col, Row, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { UserOutlined ,  DownOutlined, SmileOutlined} from '@ant-design/icons';
import { Avatar, Space , Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import { callLogoutUser } from '../../../services/userApi';
import { doLogoutAction } from '../../../redux/account/acccountSlice';

const HeaderAdmin = () => {
    const username = useSelector(state =>  state.account.user.name)
    const navigate = useNavigate()
    const dispath = useDispatch()
    const handleLogout = async() => {
        const res = await callLogoutUser()
        console.log(res)
       if(res?.data){
        dispath(doLogoutAction())
        message.success('Đăng xuất thành công')
        navigate('/')
       }else{
        message.error(error)
       }
    }
    const items = [
        {
          key: '1',
          label: (
            <div onClick={()=>{navigate('/') , message.success('Quay lại trang chủ')}}>
              Quay lại trang chủ
            </div>
          ),
        },
        {
            key: '2',
            label: (
              <div onClick={()=>{handleLogout()}}>
                Đăng xuất
              </div>
            ),
          },
       
      ];
  return (
    <div>   
        <Row style={{width:'100%' , height:'80px'}}>
            
        <Col className='left' style={{backgroundColor:'#001529', color:'white', fontWeightL:'bold', display:'flex', justifyContent:'center', alignItems:'center' , width:'15%' ,minHeight:'100%' }}>
            <h1>HyperWatch</h1>
        </Col>
        <Col className='right' style={{backgroundColor:'#f6f6f6' , width:'85%', display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
            <div style={{padding:'0 20px' , display:'flex'}}>
                <div style={{padding:'0 5px'}}>
                    <Avatar src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiB_hwnr2qi68_5lIrxK6fE74AlsQemoqOQw&s' icon={<UserOutlined />} />  
                </div>  
                <Dropdown
    menu={{
      items,
    }}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Space>
      <div style={{fontSize:'20px' , textTransform:'uppercase'}}>{username}</div>
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
               

            </div>
        </Col>
        </Row>
    </div>
  )
}

export default HeaderAdmin