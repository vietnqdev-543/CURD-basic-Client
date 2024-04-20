import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, message , Alert , Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { callChangePassword, callLogoutUser, callUpdateUser } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
import { doChangePassword, doLogoutAction } from '../../redux/account/acccountSlice';
const UpdatePassword = ({setIsModalOpen}) => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const passwordOld = useSelector(state => state.account.user.password)

  const id = useSelector(state => state.account.user._id)

  const handleLogout = async() => {
    const res = await callLogoutUser()
    if(res ){
      message.success('Đã thay đổi mật khẩu , vui lòng đăng nhập lại')
      dispath(doLogoutAction())
      navigate('/login')
    }else{
      console.log('error')
    }

  }

  const onFinish = async({id , newPassword , password}) => {
    const res = await callChangePassword({id , newPassword ,   password})
    if(password !==  passwordOld){
      return message.error('Mật khẩu cũ không chính xác')
    }else if(passwordOld === newPassword){
      return message.error('Mật khẩu mới không được giống với mật khẩu cũ')
    }
    else if(res && res.data) {
      console.log('update password :' , res.data)
      message.success('Thay đổi mật khẩu thành công')
      setIsModalOpen(false)
      setTimeout(()=>{
        handleLogout()
      },[2000])
    } else {
      message.error('Thay đổi mật khẩu thất bại')
      setIsModalOpen(false)
    }
  };
  return (
    <div>
       <Form
    name="basic"
    labelCol={{
      span: 24,
    }}
    wrapperCol={{
      span: 24,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
        <Form.Item
      label="ID"
      name="id"
      initialValue={id}
      hidden={true}  
      rules={[
        {
          required: true,
          message: 'Please input your id!',
        },
      ]}
    >
      <Input  disabled/>
    </Form.Item>

    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Bạn chưa nhập mật khẩu!',
        },
      ]}
    >
      <Input placeholder='Nhập mật khẩu hiện tại của bạn'/>
    </Form.Item>

    <Form.Item
      name="newPassword"
      rules={[
        {
          required: true,
          message: 'Bạn chưa nhập mật khẩu mới!',
        },
      ]}
    >
      <Input placeholder='Nhập mật khẩu mới của bạn'/>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 0,
        span: 24,
      }}
    >
      <Button style={{width:'100%'}} type="primary" htmlType="submit">
        Cập nhật
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default UpdatePassword