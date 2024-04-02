import React from 'react'
import { Modal, Form, Input, Checkbox ,Button } from 'antd'

const AddProductModal = (props) => {
    const { isModalOpen, handleCancel, handleSubmit} = props
    const [form] = Form.useForm()
    return (
        <div>
            <Modal title="Add Product" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
                <Form
                    form={form}
                    onFinish={handleSubmit}
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
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name product"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name product!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Brand"
                        name="brand"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your brand!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    {/* <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                </Form>
            </Modal>
        </div>
    )
}

export default AddProductModal