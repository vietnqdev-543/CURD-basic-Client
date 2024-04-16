import React from 'react'
import {Modal , Form , Input} from 'antd'
const ModalUpdateUser = ({setIsOpenModalUpdateUser , isOpenModalUpdateUser , showModalUpdateUser , handleCancelModalUpdateUser , handleSubmitUpdateProduct , dataUpdateUser}) => {
  
    const [form] = Form.useForm()
  return (
    <div>
        <Modal title="Basic Modal" open={isOpenModalUpdateUser} onOk={form.submit} onCancel={handleCancelModalUpdateUser}>
        <Form
                form={form}
                    name="basic"
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmitUpdateProduct}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Id"
                        name="id"
                        initialValue={dataUpdateUser._id}
                        style={{display:'none'}}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        initialValue={dataUpdateUser?.email}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Username"
                        name="name"
                        initialValue={dataUpdateUser.name}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                        <Form.Item
                        label="Phone"
                        name="phone"
                        initialValue={dataUpdateUser?.phone}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                   
                </Form>
      </Modal>
    </div>
  )
}

export default ModalUpdateUser