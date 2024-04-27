
import {  Descriptions, Divider, Drawer } from 'antd';
import './style.scss'
const DrawerViewDetailOrder = ({openDrawer, setOpenDrawer , dataViewOrder}) => {
    const onClose = () => {
        setOpenDrawer(false);
      };
    
    return (
    <div>
     <Drawer title="Xem chi tiet don hang" onClose={onClose} open={openDrawer} width={800}>
       <Descriptions title='' bordered column={2}>
       <Descriptions.Item label='ID đơn hàng'>
           {dataViewOrder._id}
        </Descriptions.Item>
        <Descriptions.Item label='Tên khách hàng'>
            {dataViewOrder?.customerName}
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
        {dataViewOrder?.customerAdress}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
            {dataViewOrder?.customerPhone}
        </Descriptions.Item>
        <Descriptions.Item label="Tổng giá trị đơn hàng">
         {dataViewOrder?.totalPrice && dataViewOrder?.totalPrice.toLocaleString('vi', {style : 'currency', currency : 'VND'})} 
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán">
            {dataViewOrder?.paymentMethod}
        </Descriptions.Item>
       </Descriptions>
        
       <Divider orientation="left">Sản phẩm trong đơn hàng</Divider>
         <div>
            {dataViewOrder?.detailProduct && dataViewOrder?.detailProduct.map((item , index)=> {
                return (
                    <div key={index}>
                      
                        <div style={{display:'flex', alignItems:'center'}}>
                            <img  src={item?.image} style={{width:'100px', height:'auto' , marginRight:'20px'}} alt="" />
                            <div style={{lineHeight:'1.5rem', fontSize:'15px'}}>
                                <div> <span style={{fontWeight:'bold'}}>Tên sản phẩm :</span>{item.nameProduct}</div>
                                <div>  <span style={{fontWeight:'bold'}}>Giá tiền  :</span> {item.price.toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                                <div> <span style={{fontWeight:'bold'}}>Số lượng:</span>{item.quantity}</div>
                                <div>  <span style={{fontWeight:'bold'}}>Tổng giá trị :</span>{(item.price*item.quantity).toLocaleString('vi', {style : 'currency', currency : 'VND'})}</div>
                        </div>
                        </div>
                        <Divider /> 
                    </div>
                )
            })}
         </div>
      </Drawer>
    </div>
  )
}

export default DrawerViewDetailOrder
