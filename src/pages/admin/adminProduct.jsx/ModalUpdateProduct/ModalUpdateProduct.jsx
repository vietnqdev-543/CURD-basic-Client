import React from 'react'
import { Modal, Form, Input, Checkbox, Button, Select , Row , Col } from 'antd'

const ModalUpdateProduct = (props) => {
    const { isModalUpdateOpen, handleCancelUpdate, handleSubmitUpdate } = props
    const [form] = Form.useForm()
    return (
        <div>
            <Modal title="Add Product" open={isModalUpdateOpen} onOk={form.submit} onCancel={handleCancelUpdate}>
                <Form
                    form={form}
                    onFinish={handleSubmitUpdate}
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
                    <Row gutter={15}></Row>
                   <Col span={24}>
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
                   </Col>
                 

                   <Row gutter={15}>
                   <Col span={8}>
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
                           <Select
                        defaultValue=""
                      

                        options={[
                            {
                                value: 'Seiko',
                                label: 'Seiko',
                            },
                            {
                                value: 'Casio',
                                label: 'Casio',
                            },
                            {
                                value: 'Citizen',
                                label: 'Citizen',
                            },
                            {
                                value: 'Saga',
                                label: 'Saga',
                            },
                            {
                                value: 'Sokolov',
                                label: 'Sokolov',
                            },
                        ]}
                    />
                    </Form.Item>
                    </Col>
                   <Col span={8}>
                   <Form.Item
                        label="Sex"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your sex!',
                            },
                        ]}
                    >
                           <Select
                        defaultValue=""
                   

                        options={[
                            {
                                value: 'unisex',
                                label: 'Unisex',
                            },
                            {
                                value: 'men',
                                label: 'men',
                            },
                            {
                                value: 'women',
                                label: 'women',
                            },
                        ]}
                    />
                    </Form.Item>
                   </Col>
                    <Col span={8}>
                    <Form.Item
                        label="WaterProof"
                        name="waterproof"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your waterproof!',
                            },
                        ]}
                    >
                           <Select
                        defaultValue=""
                       

                        options={[
                            {
                                value: 'none',
                                label: 'none',
                            },
                            {
                                value: '10mm',
                                label: '10mm',
                            },
                            {
                                value: '30mm',
                                label: '30mm',
                            },
                            {
                                value: '50mm',
                                label: '50mm',
                            },
                            {
                                value: '100mm',
                                label: '100mm',
                            },
                            {
                                value: '200mm',
                                label: '200mm',
                            },
                        ]}
                    />
                    </Form.Item>
                    </Col>
                   </Row>

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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <Input />
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


                </Form>
            </Modal>
        </div>
    )
}

export default ModalUpdateProduct