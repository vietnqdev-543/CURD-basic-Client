import React from 'react'
import { Modal, Form, Input } from 'antd'
const ModalAddCategory = ({ isModalOpen, setIsModalOpen, showModal, handleSubmit }) => {
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    const [form] = Form.useForm()
    return (
        <div>
            <Modal title='Create Brand' open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Name brand"
                        name="brand"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your brand!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your country!',
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

export default ModalAddCategory