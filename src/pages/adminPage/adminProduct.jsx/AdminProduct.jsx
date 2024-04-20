import React, { useState, useEffect } from 'react'
import { Space, Table, Tag, Button, message, Popconfirm , Form } from 'antd';
import { callDeleteProduct, callFetchAllProduct, callHandleUploadFile, callUpdateProduct } from '../../../services/productApi'
import { callCreateProduct } from '../../../services/productApi';
import ModalAddProduct from './ModalAddProduct/ModalAddProduct'
import * as XLSX from 'xlsx';
import ModalUpdateProduct from './ModalUpdateProduct/ModalUpdateProduct';
import DrawerViewDetailProduct from './DrawerViewDetailProduct/DrawerViewDetailProduct';
import { callFetchAllCategory } from '../../../services/categoryApi';
const AdminProduct = () => {
  const [allProduct, setAllProduct] = useState([])
  const [form] = Form.useForm()
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
      key : 1 ,
      render: (text) => <a onClick={()=>{setOpenDrawerViewDetail(true)}}>{text}</a>,
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key : 2 ,
    },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key : 3 ,
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key : 4 ,
      render: (text) => <div>{parseInt(text).toLocaleString('vi-VN')} vnd</div>

    },

    {
      title: 'Hành động',
      key:5 ,
      render: (text, record, index) => {
        return (
          <div> 
            <Space size="middle">

              <Button onClick={() => { setModalUpdateProduct(true), setDataProductUpdate(record), console.log(record) }} >
                Update 
              </Button>

              <Popconfirm
                title="Xoá sản phẩm"
                description="Bạn thật sự muốn xoá sản phẩm này?"    
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
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const showModalAddProduct = () => {
    setModalAddProduct(true);
  };
  const handleSubmitAddProduct = async (values) => {
    const { name, brand, price, size, waterproof, quantity, sold, sex, image, description , slider} = values
    const res = await callCreateProduct(values)
    console.log('check', res)
    try {
      message.success('Create product Succesfully')
      setModalAddProduct(false)
    getAllProduct()
    } catch (error) {
      message.error(error.message)
      setModalAddProduct(false)
    }
  }
  //---end---


  //modal update product
  const [dataProductUpdate, setDataProductUpdate] = useState([])
  const [modalUpdateProduct, setModalUpdateProduct] = useState(false)
  const handleSubmitUpdateProduct = async (values) => {
    const { _id, name, brand, sex, waterproof, size, price, quantity, sold, description, image , slider} = values
    console.log('values ', values)
    const res = await callUpdateProduct(values)
    console.log('res', res)
    if (res) {
      message.success('Cập nhật sản phẩm thành công')
      setModalUpdateProduct(false)
      getAllProduct()
    } else {
      message.error('error', error)
      setModalUpdateProduct(false)
    }
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

  //fetch list category
  useEffect(()=>{
    fetchAllCategory()
},[])
const [listCategory , setListCategory] = useState([])
const fetchAllCategory = async() => {
    const res = await callFetchAllCategory()
    if(res){
        console.log('list category' ,res.data.data)
        setListCategory(res.data.data)
    }else{
        console.log(error)
    }
}
//handle Upload file
  const handleUploadFile = async() => {
    const res = await callHandleUploadFile()
  }

  return (
    <div>
      <ModalAddProduct modalAddProduct={modalAddProduct} setModalAddProduct={setModalAddProduct} handleSubmitAddProduct={handleSubmitAddProduct} listCategory={listCategory} />

      <ModalUpdateProduct modalUpdateProduct={modalUpdateProduct} setModalUpdateProduct={setModalUpdateProduct} handleSubmitUpdateProduct={handleSubmitUpdateProduct} dataProductUpdate={dataProductUpdate} setDataProductUpdate={setDataProductUpdate}  listCategory={listCategory} />

      <DrawerViewDetailProduct dataProductViewDetail={dataProductViewDetail} setDataProductViewDetail={setDataProductViewDetail} setOpenDrawerViewDetail={setOpenDrawerViewDetail} openDrawerViewDetail={openDrawerViewDetail}
      />
      <div style={{ paddingBottom: '10px', }}>
        <Button style={{ marginRight: '10px', }} onClick={showModalAddProduct}> Thêm sản phẩm</Button>
        <Button onClick={handleExportExcel}>Export Excel</Button>
      </div>
      <Table columns={columns} dataSource={allProduct} />
    </div>
  )
}

export default AdminProduct