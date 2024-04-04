import React, { useEffect } from 'react'
import { Button, Checkbox, Form, Input, message , Alert , Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { callLogoutUser, callUpdateUser } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
const UpdateInfo = ({setIsModalOpen}) => {
  const navigate = useNavigate()
  const dispath = useDispatch

  const id = useSelector(state => state.account.user._id)
  const email = useSelector(state => state.account.user.email)
  const name = useSelector(state => state.account.user.name)
  const phone = useSelector(state => state.account.user.phone)
  const handleLogout = async() => {
    const res = await callLogoutUser()
    console.log(res)
    dispath(callLogoutUser())
  }

  const alert = () => {
    <Alert
    message="Thông báo"
    description="Bạn vừa cập nhật thông tin , vui lòng đăng nhập lại"
    type="info"
    action={
      <Space direction="vertical">
        <Button   size="small" type="primary">
          Accept
        </Button>
      </Space>
    }
    closable
  />
  }

  const onFinish = async(values) => {
    const {id , email , name , phone} = values
    console.log('Success:',values );
    const res = await callUpdateUser(values)
    console.log(res)
    message.success('Cập nhật thông tin thành công')
    setIsModalOpen(false)
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
      rules={[
        {
          required: true,
          message: 'Please input your UserName!',
        },
      ]}
    >
      <Input placeholder={name}/>
    </Form.Item>

    <Form.Item
      label="Phone"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input your phone!',
        },
      ]}
    >
      <Input placeholder={phone}/>
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