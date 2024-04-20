import { Button, Checkbox, Form, Input, message } from 'antd';
import "./style.scss"
import { callLoginUser } from '../../services/userApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/account/acccountSlice';


const LoginPage = () => {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const onFinish = async (values) => {
    console.log(values)
    const { email, password } = values
      const response = await callLoginUser(values)
    if (response?.data) {
      dispath(doLoginAction(response.data.users))
      localStorage.setItem('access_token', response.data.access_token)
      message.success('Đăng nhập thành công')

      navigate('/')
    } else {
      console.log(error)
      message.error('Tài khoản hoặc mật khẩu không chính xác')

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
          span: 24,
        }}

        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h1>Đăng nhập</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
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
          <Input.Password className='input' placeholder='Password' />
        </Form.Item>




        <Form.Item
          wrapperCol={{

            span: 24,
          }}
        >
          <Button className='input'  style={{ width: '100%' , background:'darkred' }} type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
        <hr />
        <div style={{textAlign:'center' , paddingTop:'10px' }}>
          <span>Bạn chưa có tài khoản ?<a style={{color:'darkred'}} href="./register"> Đăng ký</a></span>
        </div>
      </Form>
    </div>
  )
}

export default LoginPage