import { Button, Checkbox, Form, Input, message } from 'antd'; 
import "./style.scss"
import {callCreateUser, callLoginUser} from '../../services/api'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {doLoginAction } from '../../redux/account/acccountSlice';
import { useEffect } from 'react';


const LoginPage = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const onFinish = async(values) => {
    console.log(values)
    const {email , password } = values
    const response = await callLoginUser(values)
    console.log(response)
   if(response?.data) {
    dispath(doLoginAction(response.data.users))
    localStorage.setItem('access_token' ,response.data.access_token)
    message.success(response.data.message)
    navigate('/')
   }else{
    console.log(error)
    message.error(error)
    
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
    <h1>Login</h1>
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input className='input' placeholder='Email' />
    </Form.Item>
    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input  your password!',
        },
      ]}
    >
      <Input.Password className='input' placeholder='Password'/>
    </Form.Item>




    <Form.Item
      wrapperCol={{
  
        span: 24,
      }}
    >
      <Button style={{width:'100%'}} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </div>
  )
}

export default LoginPage