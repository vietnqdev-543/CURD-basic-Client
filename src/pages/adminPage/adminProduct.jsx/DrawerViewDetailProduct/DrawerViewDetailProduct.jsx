import React, { useEffect, useState } from 'react';
import { Button, Drawer, Descriptions , Image} from 'antd';
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
          <Descriptions.Item label="Chống nước">{dataProductViewDetail?.waterproof}</Descriptions.Item>
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
          <Descriptions.Item label="Ảnh đại diện">
            <Image
              width={200}
              src={dataProductViewDetail.image}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Ảnh slider">
            <Image
              width={200}
              src={dataProductViewDetail?.slider}
            />

          </Descriptions.Item>
          
        </Descriptions>
      </Drawer>
    </div>
  )
}

export default DrawerViewDetailProduct