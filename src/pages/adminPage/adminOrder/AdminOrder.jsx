import { useEffect, useState } from "react"
import { callfetchAllOrder } from "../../../services/orderApi"
import { Button, Space, Table, Tag } from 'antd'
import DrawerViewDetailOrder from "./DrawerViewDetailOrder"


const AdminOrder = () => {
  const [listOrder , setListOrder] = useState([])
  const [dataViewOrder , setDataViewOrder ] = useState([])
  useEffect(()=>{
    const fetchAllOrder = async() => {
      const res = await callfetchAllOrder()
      console.log(res)
      setListOrder(res.data.data)
      console.log(listOrder)
    }
  fetchAllOrder()
  }, [])

  const columns = [
    {
      title: 'ID đơn hàng',
      dataIndex: '_id',
      key: '_id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
      key: 'name',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'customerAdress',
      key: 'address',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'customerPhone',
      key: 'phone',
    },
    {
      title: 'Tổng giá trị đơn hàng',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render : (text) => text.toLocaleString('vi', {style : 'currency', currency : 'VND'})
    },
    {
      title: 'Phương thức thanh toán',
      dataIndex: 'paymentMethod',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text, record, index) => {
        switch(text) {
          case 'confirm':
            return <Tag color="cyan">Đã xác nhận</Tag>;
          case 'shipping':
            return <Tag color="orange">Đã vận chuyển</Tag>;
          case 'succé':
            return <Tag color="green">Giao thành công</Tag>;
          case 'cancel':
            return <Tag color="red">Đã huỷ</Tag>;
          default:
            return null;
        }
      }
    },
    {
      title: 'Hành động',
      key:5 ,
      render: (text, record, index) => {
        return (
          <div> 
            <Space size="middle">
              <Button onClick={()=>{ setDataViewOrder(record) , handleOpenDrawer() }} >Cập nhật trạng thái</Button>
              <Button onClick={()=>{ setDataViewOrder(record) , handleOpenDrawer() }} >Xem chi tiết</Button>
            </Space>
          </div>
        )
      }
    },
    
  ];
  // view detail order
  const [openDrawer , setOpenDrawer] = useState(false)
  const handleOpenDrawer = () => {
    setOpenDrawer(true)
  }

 
  
  
  return (
    <div>
      <DrawerViewDetailOrder setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} dataViewOrder={dataViewOrder} />
      <Table columns={columns} dataSource={listOrder} />
    </div>
  )
}

export default AdminOrder