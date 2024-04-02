import { Button, Checkbox, Form, Input, message } from 'antd'; 
import "./style.scss"
import {callCreateUser} from '../../services/api'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const RegisterPage = () => {
  const navigate = useNavigate()
  const onFinish = async(values) => {
    const {email , name , password , phone} = values
    const res = await callCreateUser(values)
    try {
      console.log(res)
      console.log('Success:', values);
      message.success('create user succesfully')
      navigate('/login')
    } catch (error) {
      console.log('error :' , error)
      message.error('error')
    }

  };

  
  return (
    <div className='container'>
        
      <Form
    name="basic"
    className='form'
    labelCol={{
      span: 24,
    }}
    wrapperCol={{
      span:24,
    }}
   
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <h1>Register </h1>
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Username"
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item
      label="Phone"
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input your phone !',
        },
      ]}
    >
      <Input />
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
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

export default RegisterPage