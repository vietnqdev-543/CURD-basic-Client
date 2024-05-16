import { Button, Col, Modal } from 'antd';
const ViewDetailOrder = ({showModalDetail , setShowModalDetail , dataOrderViewDetail}) => {

  const handleCancel = () => {
    setShowModalDetail(false)
  }
  return (
    <div>
      <Modal title="Địa chỉ giao hàng" open={showModalDetail}  onCancel={handleCancel} footer={false}>
        <Col span={12}>
        <p>Tên khách hàng :{dataOrderViewDetail.customerName}</p>
        <p>Số điện thoại : {dataOrderViewDetail.customerPhone}</p>
        <p>Địa chỉ : {dataOrderViewDetail.customerAdress}</p>
    
        </Col>
      
      </Modal>
    </div>
  )
}

export default ViewDetailOrder
