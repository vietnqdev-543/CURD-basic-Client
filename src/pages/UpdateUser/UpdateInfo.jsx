import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, message , Alert , Space, Row , Col} from 'antd';
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
  const avatar = useSelector(state => state.account.user.avatar)
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    const { id, email, name, phone , avatar } = values;
    try {
      const res = await callUpdateUser(values);
      console.log('check' , res, values)
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

  const [dataAvatar , setDataAvatar] = useState(avatar)
  const convertBase64 =  (e) => {
    const reader = new FileReader();    
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
        console.log('check:', reader.result);
        setDataAvatar(reader.result)
        form.setFieldsValue({ avatar: reader.result });
    };
    reader.onerror = (error) => {
        console.log(error);
    };
  }  
  return (
    <div>
       <Form
       form={form}
    name="basic"
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
   <Row>
    <Col span={12}>
    <Form.Item
      name="avatar"
      rules={[
        {
          required: false,
          message: 'Please input your avatar!',
        },
      ]}
    >
      <img src={dataAvatar} alt=""  style={{width:'200px' , height:'200px' , borderRadius:'50%'}}/>
      <input  type="file" title='Chọn ảnh' onChange={convertBase64} />

      
    </Form.Item>
    </Col>
    <Col span={12}>
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
      label="Tên hiển thị"
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
      label="Số điện thoại"
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
    </Form.Item></Col>
   </Row>


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

export default UpdateInfo