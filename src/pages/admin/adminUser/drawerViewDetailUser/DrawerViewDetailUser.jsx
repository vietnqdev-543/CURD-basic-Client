import React from 'react'
import {Drawer ,  Descriptions , Tag} from 'antd'
import moment from 'moment'

const DrawerViewDetailUser = ({openDrawerViewDetail , setOpenDrawerViewDetail , dataViewDetail }) => {
    const onClose = () => {
        setOpenDrawerViewDetail(false);
      };
  return (
    <div>
        <Drawer width={800} title="Thông tin chi tiết tài khoản" onClose={onClose} open={openDrawerViewDetail}>
            <Descriptions title="" bordered column={2}>
          <Descriptions.Item label="ID">{dataViewDetail?._id}</Descriptions.Item>
          <Descriptions.Item label="Email" >{dataViewDetail?.email}</Descriptions.Item>
          <Descriptions.Item label="Tên hiển thị" >
            {dataViewDetail?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Mật khẩu">{dataViewDetail?.password}</Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">{dataViewDetail?.phone}</Descriptions.Item>
          <Descriptions.Item label="Cấp bật">{dataViewDetail?.isAdmin === true ? <Tag color='green'>Admin</Tag> : <Tag color='blue'>User</Tag>}    </Descriptions.Item>
          <Descriptions.Item label="Ngày tạo">  
            {moment(dataViewDetail?.createdAt).format('HH:mm:ss DD-MM-YYYY')}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày cập nhật">
            {moment(dataViewDetail?.updatedAt).format('HH:mm:ss DD-MM-YYYY')}
          </Descriptions.Item>
        </Descriptions>
            </Drawer>
    </div>
  )
}

export default DrawerViewDetailUser