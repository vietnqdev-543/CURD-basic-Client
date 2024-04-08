import React, { useState, useEffect } from 'react'
import { Space, Table, Tag, Button, message, Popconfirm } from 'antd';
import { callDeleteProduct, callFetchAllProduct, callUpdateProduct } from '../../../services/productApi'
import { callCreateProduct } from '../../../services/productApi';
import ModalAddProduct from './ModalAddProduct/ModalAddProduct'
import * as XLSX from 'xlsx';
import ModalUpdateProduct from './ModalUpdateProduct/ModalUpdateProduct';
import DrawerViewDetailProduct from './DrawerViewDetailProduct/DrawerViewDetailProduct';

const AdminProduct = () => {
  const [allProduct, setAllProduct] = useState([])
  useEffect(() => {
    getAllProduct()
  }, [])
  const getAllProduct = async () => {
    const res = await callFetchAllProduct()
    console.log('list product', res.data)
    setAllProduct(res.data)
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      render: (text) => <a onClick={()=>{setOpenDrawerViewDetail(true)}}>{text}</a>,
    },
    {
      title: 'Name Product',
      dataIndex: 'name',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text) => <div>{parseInt(text).toLocaleString('vi-VN')} vnd</div>

    },

    {
      title: 'Action',
      render: (text, record, index) => {
        return (
          <div> 
            <Space size="middle">
              <Button onClick={() => { setIsModalOpenUpateProduct(true), setDataProductUpdate(record), console.log(record) }} >Update </Button>
              <Popconfirm
                title="Thông báo"
                description="Bạn thật sự muốn xoá tài khoản này?"
                onConfirm={()=>{handleConfirmDeleteProduct() }}
                onCancel={handleCancelDeleteProduct}
                okText="Yes"
                cancelText="No"
              >
                <Button danger onClick={()=>{ setDataDeleteProduct(record) , console.log('dataDeleteProduct :' , dataDeleteProduct)}}>Delete</Button>
              </Popconfirm>
              <Button onClick={() => { setOpenDrawerViewDetail(true), setDataProductViewDetail(record), console.log(dataProductViewDetail) }}>View Detail</Button>
            </Space>
          </div>
        )
      }
    },
  ];

  //---create Product---
  const [isModalOpenAddProduct, setIsModalOpenAddProduct] = useState(false);
  const showModalAddProduct = () => {
    setIsModalOpenAddProduct(true);
  };
  const handleSubmitAddProduct = async (values) => {
    const { name, brand, price, size, waterproof, quantity, sold, sex, image, description } = values
    const res = await callCreateProduct(values)
    console.log('check', res)
    try {
      message.success('Create product Succesfully')
      setIsModalOpenAddProduct(false)
      window.location.reload();
    } catch (error) {
      message.error(error.message)
      setIsModalOpenAddProduct(false)
    }
  }
  //---end---


  //modal update product
  const [dataProductUpdate, setDataProductUpdate] = useState([])
  const [isModalOpenUpdateProduct, setIsModalOpenUpateProduct] = useState(false)
  const handleSubmitUpdateProduct = async (values) => {
    const { _id, name, brand, sex, waterproof, size, price, quantity, sold, description, image } = values
    console.log('values ', values)
    const res = await callUpdateProduct(values)
    console.log('res', res)
    if (res) {
      message.success('Cập nhật sản phẩm thành công')
      setIsModalOpenUpateProduct(false)
    } else {
      message.error('error', error)
      setIsModalOpenUpateProduct(false)
    }
  }
  const handleCancel = () => {
    setIsModalOpenUpateProduct(false)
    window.location.reload()
  }

  //---end---

  //---delete product---
  const [dataDeleteProduct , setDataDeleteProduct] = useState({})
  const handleConfirmDeleteProduct = async() => {
    const _id=  dataDeleteProduct._id
    const res = await callDeleteProduct(_id)
    if(res){
      console.log(res)
      message.success('Xoá sản phẩm thành công')
      getAllProduct()
    }else{
      message.error('Xoá sản phẩm thất bại')
    }
  }
  const handleCancelDeleteProduct =()=>{
    console.log('cancel')
  }
  //---end---

  //---drawer view detail product---
  const [openDrawerViewDetail, setOpenDrawerViewDetail] = useState(false);
  const [dataProductViewDetail, setDataProductViewDetail] = useState([])

  //---end---

  //---Export excel---
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "TableAllProdct.xlsx");
  }
  //---end---

  return (
    <div>
      <ModalAddProduct isModalOpenAddProduct={isModalOpenAddProduct} setIsModalOpenAddProduct={setIsModalOpenAddProduct} handleSubmitAddProduct={handleSubmitAddProduct} />
      <ModalUpdateProduct isModalOpenUpdateProduct={isModalOpenUpdateProduct} setIsModalOpenUpateProduct={setIsModalOpenUpateProduct} handleSubmitUpdateProduct={handleSubmitUpdateProduct} dataProductUpdate={dataProductUpdate} handleCancel={handleCancel} />
      <DrawerViewDetailProduct dataProductViewDetail={dataProductViewDetail} setDataProductViewDetail={setDataProductViewDetail} setOpenDrawerViewDetail={setOpenDrawerViewDetail} openDrawerViewDetail={openDrawerViewDetail}
      />
      <div style={{ paddingBottom: '10px', }}>
        <Button style={{ marginRight: '10px', }} onClick={showModalAddProduct}>Add Product</Button>
        <Button onClick={handleExportExcel}>Export Excel</Button>
      </div>
      <Table columns={columns} dataSource={allProduct} />
    </div>
  )
}

export default AdminProduct