
import React, { useState } from 'react';
import { Tabs , Modal } from 'antd';
import UpdateInfo from './UpdateInfo'
import UpdatePassword from './UpdatePassword';
const UpdateUser = ({isModalOpen , setIsModalOpen}) => {
    const onChange = (key) => {
        console.log(key);
      };
      const items = [
        {
          key: '1',
          label: 'Cập nhật thông tin',
          children: <UpdateInfo setIsModalOpen={setIsModalOpen} />,
        },
        {
          key: '2',
          label: 'Đổi mật khẩu',
          children: <UpdatePassword setIsModalOpen={setIsModalOpen} />,
        },
      ];

    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      
  return (
    <div>
        <Modal footer={null} title="Cập nhật thông tin người dùng" open={isModalOpen} onCancel={handleCancel}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Modal>

    </div>
  )
}

export default UpdateUser