import React from 'react'
import { Flex, Spin } from 'antd';
const SpinLoading = () => {
  return (
    <div className='style' style={{width:'100%', height:'70vh',display:'flex' , justifyContent:'center', alignItems:'center'}}>
         <Flex align="center" gap="middle">
             <Spin size="large" />
        </Flex>
    </div>
  )
}

export default SpinLoading