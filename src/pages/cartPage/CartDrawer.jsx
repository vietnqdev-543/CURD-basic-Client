import React from 'react'
import { Drawer } from 'antd'
const CartDrawer = ({openDrawer,setOpenDrawer}) => {
    const onClose = () => {
        setOpenDrawer(false)
    }
  return (
    <div>
         <Drawer title="Giỏ hàng" onClose={onClose} open={openDrawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

export default CartDrawer