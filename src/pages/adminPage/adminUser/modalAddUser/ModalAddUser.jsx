import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
const ModalAddUser = (props) => {
    const { modalAddUser, setModalAddUser, handleSubmitAddProduct} = props
    const [form] = Form.useForm()
    const handleCancelModalAddUser = ()=>{
        setModalAddUser(false)
      }
    return (
        <div>
            <Modal title="Basic Modal" open={modalAddUser} onOk={form.submit} onCancel={handleCancelModalAddUser}>
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
                    onFinish={handleSubmitAddProduct}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
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
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                        label="Phone"
                        name="phone"
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

export default ModalAddUser