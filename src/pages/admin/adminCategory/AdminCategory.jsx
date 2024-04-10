import React, { useEffect, useState } from 'react'
import {Button, message , Table} from 'antd'
import ModalAddCategory from './ModalAddCategory'
import { callCreateCategory, callFetchAllCategory } from '../../../services/categoryApi'
import { render } from 'react-dom'
const AdminCategory = () => {
  const [isModalOpen , setIsModalOpen] = useState(false)
  const [listCategory , setListCategory] = useState([])
  useEffect(()=>{
    fetchAllCategory()
  },[])
  const fetchAllCategory = async() => {
    const res = await callFetchAllCategory()
    if(res){
      console.log(res.data.data)
      setListCategory(res.data.data)
    }else{
      console.log(fail)
    }
  }
  const showModal = () => {
    setIsModalOpen(true);
  }
  const handleSubmit = async(values) => {
    const {brand , country} = values
    const res = await callCreateCategory(values)
    if(res && res.data){
      console.log(res)
      message.success('Create succesfully')
      setIsModalOpen(false)
      fetchAllCategory()
    }else{
      console.log(error)
      message.error("Error")
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: 'id',
    },
    {
      title: 'Name brand',
      dataIndex: 'brand',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ]
  return (
    <div>
      <ModalAddCategory isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} showModal={showModal} handleSubmit={handleSubmit} />
      <Button style={{marginBottom:'10px'}} onClick={showModal}>Thêm thương hiệu</Button>
      <Table columns={columns} dataSource={listCategory} />
    </div>
  )
}

export default AdminCategory