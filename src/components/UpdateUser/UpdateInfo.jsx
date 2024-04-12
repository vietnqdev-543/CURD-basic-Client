import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, message , Alert , Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { callLogoutUser, callUpdateUser } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
import { doUpdateInfo } from '../../redux/account/acccountSlice';
const UpdateInfo = ({setIsModalOpen}) => {
  const navigate = useNavigate()
  const dispath = useDispatch()

  const id = useSelector(state => state.account.user._id)
  const email = useSelector(state => state.account.user.email)
  const name = useSelector(state => state.account.user.name)
  const phone = useSelector(state => state.account.user.phone)


  const onFinish = async (values) => {
    const { id, email, name, phone } = values;
    try {
      const res = await callUpdateUser(values);
      if (res && res.data) {
        console.log('data update' ,res.data.user); 
        dispath(doUpdateInfo(res.data.user));
        message.success('Cập nhật thông tin thành công');
        setIsModalOpen(false);
      } else {
        console.log('Có lỗi xảy ra khi cập nhật thông tin');
        message.error('Có lỗi xảy ra khi cập nhật thông tin');
      }
    } catch (error) {
      console.log('Có lỗi xảy ra khi cập nhật thông tin:', error);
      message.error('Có lỗi xảy ra khi cập nhật thông tin');
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
      label="Email"
      name="email"
      initialValue={email}
      rules={[
        {
          // required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input placeholder={email}  disabled/>
    </Form.Item>

    <Form.Item
      label="UserName"
      name="name"
      initialValue={name}
      rules={[
        {
          required: true,
          message: 'Please input your UserName!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Phone"
      name="phone"
    
      initialValue={phone}
      rules={[
        {
          required: true,
          message: 'Please input your phone!',
        },
      ]}
    >
      <Input/>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 20,
        span: 24,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default UpdateInfo