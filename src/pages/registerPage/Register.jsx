import { Button, Checkbox, Form, Input, message } from 'antd'; 
import "./style.scss"
import { callCreateUser } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const navigate = useNavigate()
  const onFinish = async(values) => {
    const {email , name , confirmPassword , password , phone} = values
    if(password !== confirmPassword){
      return message.error('Mật khẩu không khớp')
    }
    const res = await callCreateUser(values)
    if(res && res?.data){
      console.log(res)
      message.success('Tạo tài khoản thành công ')
      navigate('/login')
    }else{
      message.error('Đăng ký thất bại')
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
    <h1>Đăng ký</h1>
    <Form.Item
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input className='input' placeholder='Email'/>
    </Form.Item>
    <Form.Item
      name="name"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input className='input' placeholder='Username'/>
    </Form.Item>

    <Form.Item
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password className='input' placeholder='Password' />
    </Form.Item>

    <Form.Item
      name="confirmPassword"
      rules={[
        {
          required: true,
          message: 'Please input your confirm password!',
        },
      ]}
    >
      <Input.Password className='input' placeholder='Confirm password' />
    </Form.Item>
    <Form.Item
      name="phone"
      rules={[
        {
          required: true,
          message: 'Please input your phone !',
        },
      ]}
    >
      <Input className='input' placeholder='Phone'/>
    </Form.Item>


    <Form.Item
      wrapperCol={{
        offset: 0,
        span: 24,
      }}
    >
      <Button style={{background:'darkred'}} className='input' type="primary" htmlType="submit">
        Đăng ký
      </Button>
    </Form.Item>
    <hr />
   <div style={{textAlign:'center' , paddingTop:'10px'}}>
      <span>Bạn đã có tài khoản ?<a style={{color:'darkred'}} href="./login"> Đăng nhập</a></span>
   </div>
  </Form>
    </div>
  )
}

export default RegisterPage