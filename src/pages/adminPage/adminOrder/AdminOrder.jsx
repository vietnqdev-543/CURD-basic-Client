import { useEffect, useState } from "react"
import { callfetchAllOrder } from "../../../services/orderApi"
import { Button, Space, Table, Tag } from 'antd'

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
    title: 'Hành động',
    key:5 ,
    render: (text, record, index) => {
      return (
        <div> 
          <Space size="middle">
            <Button >Xem chi tiết</Button>
          </Space>
        </div>
      )
    }
  },
  
];
const AdminOrder = () => {
  const [listOrder , setListOrder] = useState([])
  useEffect(()=>{
    const fetchAllOrder = async() => {
      const res = await callfetchAllOrder()
      console.log(res)
      setListOrder(res.data.data)
      console.log(listOrder)
    }
  fetchAllOrder()
  }, [])

  
  
  return (
    <div>
      <Table columns={columns} dataSource={listOrder} />
    </div>
  )
}

export default AdminOrder