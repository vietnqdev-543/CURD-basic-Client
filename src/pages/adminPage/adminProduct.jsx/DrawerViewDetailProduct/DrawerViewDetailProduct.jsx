import React, { useEffect, useState } from 'react';
import { Button, Drawer, Descriptions, Image, Divider } from 'antd';
import moment from 'moment'
const DrawerViewDetailProduct = ({ setOpenDrawerViewDetail, openDrawerViewDetail, dataProductViewDetail, setDataProductViewDetail }) => {

  const onclose = () => {
    setOpenDrawerViewDetail(false)
  }
  return (
    <div>
      <Drawer width={800} title="Thông tin chi tiết sản phẩm" onClose={onclose} open={openDrawerViewDetail}>
        <Descriptions title="" bordered column={2}>
          <Descriptions.Item label="ID">{dataProductViewDetail?._id}</Descriptions.Item>
          <Descriptions.Item label="Tên sản phẩm" >
            {dataProductViewDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Hãng" >{dataProductViewDetail?.brand}</Descriptions.Item>
          <Descriptions.Item label="Phân loại">{dataProductViewDetail?.sex}</Descriptions.Item>
          <Descriptions.Item label="Chống nước">{dataProductViewDetail?.proof ? <>Có </> : <>Không</>}</Descriptions.Item>
          <Descriptions.Item label="Giá tiền">
            {parseInt(dataProductViewDetail?.price).toLocaleString('vi-VN')} vnd
          </Descriptions.Item>

          <Descriptions.Item label="Số lượng">{dataProductViewDetail?.quantity}</Descriptions.Item>
          <Descriptions.Item label="Đã bán">{dataProductViewDetail?.sold}</Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">
            {moment(dataProductViewDetail?.createdAt).format('HH:mm:ss DD-MM-YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {moment(dataProductViewDetail?.updatedAt).format('HH:mm:ss DD-MM-YYYY')}
          </Descriptions.Item>

        </Descriptions>
        <Divider orientation="left">Ảnh sản phẩm</Divider>
        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-start' ,width:'100%' }}>
        <Image
          style={{ width: '150px', height: 'auto' , padding:'0 10px'   }}
          width={200}
          src={dataProductViewDetail.image}
        />
        {dataProductViewDetail?.slider && dataProductViewDetail.slider.map((item, index) => (
          <Image
            style={{ width: '150px', height: 'auto' , padding:'0 10px' }}
            key={index}
            width={200}
            src={item}
          />
        ))}
        </div>

      </Drawer>
    </div>
  )
}

export default DrawerViewDetailProduct