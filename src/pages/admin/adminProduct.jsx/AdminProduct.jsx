import React, { useState , useEffect } from 'react'
import { Space, Table, Tag ,Button , message } from 'antd';
import { callFetchAllProduct, callUpdateProduct } from '../../../services/productApi'
import { callCreateProduct } from '../../../services/productApi';
import ModalAddProduct from './ModalAddProduct/ModalAddProduct'
import * as XLSX from 'xlsx';
import ModalUpdateProduct from './ModalUpdateProduct/ModalUpdateProduct';

const AdminProduct = () => {
  const [allProduct , setAllProduct ] = useState([])
  useEffect(()=> {
  getAllProduct()
  },[])
  const getAllProduct = async() => {
    const res =await callFetchAllProduct()
    console.log(res.data)
    setAllProduct(res.data)
    
  }
  const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
    {
      title: 'Name Product',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={showModalUpdate}>Update </Button>
          <Button>Delete</Button>
          <Button>View Detail</Button>
        </Space>
      ),
    },
  ];
  const data = allProduct.map((item , index)=> ({
   key : index ,
   id : item._id ,
   name : item.name ,
   brand : item.brand ,
   price : item.price

  }))

  const [listProduct, setListProduct] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async (values) => {
    const { name, brand, price, size , waterproof , sex , image, description } = values
    const res = await callCreateProduct(values)
    console.log('check', res)
    try {
      message.success('Create product Succesfully')
      setIsModalOpen(false)
      window.location.reload();
    } catch (error) {
      message.error(error.message)
      setIsModalOpen(false)
    }
  }

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "TableAllProdct.xlsx");
  }

  //update product
  const [isModalUpdateOpen , setIsModalUpdateOpen] = useState(false)
  const showModalUpdate = () => {
    setIsModalOpen(true);
  };
  const handleCancelUpdate = () => {
    setIsModalOpen(false);
  };
  const handleSubmitUpdate = async (values) => {
    const {_id ,  name, brand, price,waterproof , sex , size , image, description } = values
    const res = await callUpdateProduct(values)
    console.log('check', res)
    try {
      message.success('Create product Succesfully')
      setIsModalUpdateOpen(false)
      window.location.reload();
    } catch (error) {
      message.error(error.message)
      setIsModalOpen(false)
    }
  }

  return (
    <div>
      <ModalAddProduct isModalOpen={isModalOpen} handleCancel={handleCancel} handleSubmit={handleSubmit}/>
      <ModalUpdateProduct isModalUpdateOpen={isModalUpdateOpen} handleCancelUpdate={handleCancelUpdate} handleSubmitUpdate={handleSubmitUpdate}/>
     <div style={{paddingBottom:'10px', }}>
     <Button style={{marginRight:'10px', }} onClick={showModal}>Add Product</Button>
     <Button  onClick={handleExportExcel}>Export Excel</Button>
     </div>
      <Table columns={columns} dataSource={data} />;
    </div>
  )
}

export default AdminProduct