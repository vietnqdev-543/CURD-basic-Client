import React, { useEffect, useState } from 'react'
import { callCreateUser, callDeleteUser, callFetchAllUser, callUpdateUser } from '../../../services/userApi'
import { Space, Table, Tag, Button, message , Popconfirm , Drawer, Form , Image, Avatar} from 'antd';
import ModalAddUser from './modalAddUser/ModalAddUser';
import { CgKey } from 'react-icons/cg';
import DrawerViewDetailUser from './drawerViewDetailUser/DrawerViewDetailUser';
import ModalUpdateUser from './modalUpdateUser/ModalUpdateUser';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { UserOutlined } from '@ant-design/icons';



const AdminUser = () => {
  const [form] = Form.useForm()

  useEffect(() => {
    fetchAllUser()
  }, [])

  const [allUser, setAllUser] = useState([])
  const fetchAllUser = async () => {
    const res = await callFetchAllUser()
    console.log('check all user :', res.data)
    setAllUser(res.data)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Ảnh đại diện',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text)=> <Avatar src={text} icon={<UserOutlined /> }  style={{width:'50px', height:'50px', borderRadius:'50%'}} alt="" />
    },
    {
      title: 'Tên ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Quyền',
      dataIndex: 'isAdmin',
      render: (text) => <div>
        {text === true ? <Tag color='green'>Admin</Tag> : <Tag color='blue'>User</Tag>}
      </div>
    },

    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={()=>{showModalUpdateUser() , setDataUpdateUser(record) , console.log('record update user' , record)}}>Cập nhật</Button>
          <Popconfirm
            title="Xoá tài khoản"
            description="Bạn chắc chắn muốn xoá tài khoản này?"
            onConfirm={handleConfirmDeleteUser}
            // onCancel={console.log('no')}
            okText="Yes"
            cancelText="No"
          >
            <Button onClick={()=>{setDataDeleteUser(record) , console.log(record)}} danger>Xoá</Button>
          </Popconfirm>
          <Button onClick={()=>{setDataViewDetail(record)  ,showDrawer() , console.log(record)}}>Xem chi tiết</Button>
        </Space>
      ),
    },
  ];

  // ---create user ---
  const [modalAddUser, setModalAddUser] = useState(false);
  const showModalAddUser = () => {
    setModalAddUser(true)
  }
  const handleSubmitAddProduct = async (values) => {
    const { email, name, password, phone } = values
    const res = await callCreateUser(values)
    if (res) {
      message.success('Tạo tài khoản thành công')
      setModalAddUser(false)
      fetchAllUser()
    }else{
      message.error('lỗi')
      setModalAddUser(false)
    }
  }

  // --update user--
  const [modalUpdateUser , setModalUpdateUser] = useState(false)
  const [dataUpdateUser , setDataUpdateUser] = useState({})
 const showModalUpdateUser = () => {
  setModalUpdateUser(true)
 }

 const handleSubmitUpdateProduct = async(values) => {
  const {id , email , name , phone} =values
  const res = await callUpdateUser(values)
  if(res){
    console.log('check res update user :' , res)
    message.success('Cập nhật tài khoản thành công')
    setModalUpdateUser(false)
    fetchAllUser()
  }else{
    message.error('Đã có lỗi xảy ra')
  }
 }

   //---delete user---
   const [dataDeleteUser, setDataDeleteUser] = useState({})
   const handleConfirmDeleteUser = async() => {
     const _id = dataDeleteUser._id
     const res = await callDeleteUser(_id)
     if(res){
       message.success('Xoá tài khoản thành công')
       fetchAllUser()
     }else{
       message.error('xoá tài khoản thất bại')
     }
   }
 
   //--view detail -- 
   const [ dataViewDetail,setDataViewDetail ] = useState({})
   const [openDrawerViewDetail, setOpenDrawerViewDetail] = useState(false);
   const showDrawer = () => {
     setOpenDrawerViewDetail(true);
   };

  

  return (
    <div>
    
      <DrawerViewDetailUser dataViewDetail={dataViewDetail} openDrawerViewDetail={openDrawerViewDetail} setOpenDrawerViewDetail={setOpenDrawerViewDetail}/>

      <ModalAddUser
        modalAddUser={modalAddUser}
        setModalAddUser={setModalAddUser} 
        handleSubmitAddProduct={handleSubmitAddProduct} 
      />

      <ModalUpdateUser  
        modalUpdateUser={modalUpdateUser} 
       setModalUpdateUser={setModalUpdateUser} 
        dataUpdateUser={dataUpdateUser} 
        setDataUpdateUser={setDataUpdateUser} 
        handleSubmitUpdateProduct={handleSubmitUpdateProduct}/>
      
      <div style={{ paddingBottom: '10px' }}>
        <Button onClick={showModalAddUser} >Tạo tài khoản</Button>
        <Button style={{ marginLeft: '10px' }}>Export Excel</Button>
      </div>
      <Table columns={columns} dataSource={allUser} />
    </div>
  )
}

export default AdminUser