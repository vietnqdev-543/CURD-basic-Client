import React, { useEffect, useState } from 'react'
import { callCreateUser, callDeleteUser, callFetchAllUser, callUpdateUser } from '../../../services/userApi'
import { Space, Table, Tag, Button, message , Popconfirm , Drawer} from 'antd';
import ModalAddUser from './modalAddUser/ModalAddUser';
import { CgKey } from 'react-icons/cg';
import DrawerViewDetailUser from './drawerViewDetailUser/DrawerViewDetailUser';
import ModalUpdateUser from './modalUpdateUser/ModalUpdateUser';


const AdminUser = () => {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'isAdmin',
      render: (text) => <div>
        {text === true ? <Tag color='green'>Admin</Tag> : <Tag color='blue'>User</Tag>}
      </div>
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={()=>{showModalUpdateUser() , setDataUpdateUser(record) , console.log('record update user' , record)}}>Update</Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={handleConfirmDeleteUser}
            // onCancel={console.log('no')}
            okText="Yes"
            cancelText="No"
          >
            <Button onClick={()=>{setDataDeleteUser(record) , console.log(record)}} danger>Delete</Button>
          </Popconfirm>
          <Button onClick={()=>{setDataViewDetail(record)  ,showDrawer() , console.log(record)}}>View Detail</Button>
        </Space>
      ),
    },
  ];

  // ---create user ---
  const [isModalOpenAddUser, setIsModalOpenAddUser] = useState(false);
  const handleCancelModalAddUser = ()=>{
    setIsModalOpenAddUser(false)
  }
  const handleSubmitAddProduct = async (values) => {
    const { email, name, password, phone } = values
    const res = await callCreateUser(values)
    console.log(res)
    if (res) {
      message.success('Tạo tài khoản thành công')
      setIsModalOpenAddUser(false)
      fetchAllUser()
      clearInterval(values)
    }else{
      message.error('lỗi')
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

  // --update user--
  const [isOpenModalUpdateUser , setIsOpenModalUpdateUser] = useState(false)
  const [dataUpdateUser , setDataUpdateUser] = useState({})
 const showModalUpdateUser = () => {
  setIsOpenModalUpdateUser(true)
 }
 const handleCancelModalUpdateUser = () => {
  setIsOpenModalUpdateUser(false)
 }
 const handleSubmitUpdateProduct = async(values) => {
  const {_id , email , name , phone} =values
  const res = await callUpdateUser(values)
  if(res){
    message.success('Cập nhật tài khoản thành công')
    setIsOpenModalUpdateUser(false)
    fetchAllUser()
  }else{
    message.error('Đã có lỗi xảy ra')
  }
 }
  
  

  return (
    <div>
      <DrawerViewDetailUser dataViewDetail={dataViewDetail} openDrawerViewDetail={openDrawerViewDetail} setOpenDrawerViewDetail={setOpenDrawerViewDetail}/>

      <ModalAddUser  isModalOpenAddUser={isModalOpenAddUser} setIsOpenModalAddUser={setIsModalOpenAddUser} handleSubmitAddProduct={handleSubmitAddProduct} handleCancelModalAddUser={handleCancelModalAddUser} />

      <ModalUpdateUser handleCancelModalUpdateUser={handleCancelModalUpdateUser} showModalUpdateUser={showModalUpdateUser} isOpenModalUpdateUser={isOpenModalUpdateUser} setIsModalOpenUpdateUser={setIsOpenModalUpdateUser} dataUpdateUser={dataUpdateUser} handleSubmitUpdateProduct={handleSubmitUpdateProduct}/>
      
      <div style={{ paddingBottom: '10px' }}>
        <Button onClick={() => { setIsModalOpenAddUser(true) }} >Create User</Button>
        <Button style={{ marginLeft: '10px' }}>Export Excel</Button>
      </div>
      <Table columns={columns} dataSource={allUser} />
    </div>
  )
}

export default AdminUser