import React from 'react'
import { Modal, Form, Input, Checkbox, Button, Select , Row , Col, InputNumber } from 'antd'

const ModalAddProduct = (props) => {
    const { isModalOpenAddProduct , setIsModalOpenAddProduct , handleSubmitAddProduct } = props
    const handleCancel = () => {
        setIsModalOpenAddProduct(false);
      };
    const [form] = Form.useForm()
    return (
        <div>
            <Modal title="Create product" open={isModalOpenAddProduct} onOk={form.submit} onCancel={handleCancel}>
                <Form
                    form={form}
                    onFinish={handleSubmitAddProduct}
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
                   <Col span={6}>
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
                   <Col span={6}>
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
                                value: 'nam',
                                label: 'Nam',
                            },
                            {
                                value: 'nữ',
                                label: 'Nữ',
                            },
                        ]}
                    />
                    </Form.Item>
                   </Col>
                    <Col span={6}>
                    <Form.Item
                        label="Size"
                        name="size"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your size!',
                            },
                        ]}
                    >
                           <Select
                        defaultValue=""
                       

                        options={[
                            {
                                value: '24mm',
                                label: '24mm',
                            },
                            {
                                value: '26mm',
                                label: '26mm',
                            },
                            {
                                value: '32mm',
                                label: '32mm',
                            },
                            {
                                value: '36mm',
                                label: '36mm',
                            },
                            {
                                value: '40mm',
                                label: '40mm',
                            },
                            {
                                value: '44mm',
                                label: '44mm',
                            },
                            {
                                value: '46mm',
                                label: '46mm',
                            },
                            {
                                value: '52mm',
                                label: '52mm',
                            },
                            {
                                value: '56mm',
                                label: '56mm',
                            },
                        ]}
                    />
                    </Form.Item>
                    </Col>

                    <Col span={6}>
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
                        defaultValue=''
                       

                        options={[
                            {
                                value: true,
                                label: 'Có',
                            },
                            {
                                value: false,
                                label: 'Không',
                            },
                        ]}
                    />
                    </Form.Item>
                    </Col>
                   </Row>

                    <Row gutter={15}>
                        <Col span={12}>
                        <Form.Item
                        label="Quantity"
                        name="quantity"
                        initialValue={0}
                        
                        rules={[
                            {
                                required: true,
                                message: 'Please input your quantity',
                            },
                        ]}
                    >
                        <InputNumber min={0}  style={{width:'100%'}} />
                    </Form.Item>
                        </Col>
                        <Col span={12}>
                        <Form.Item
                        label="Sold"
                        name="sold"
                        initialValue={0}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your sold',
                            },
                        ]}
                    >
                        <InputNumber min={0}  style={{ width: '100%' }} />
                    </Form.Item>
                        </Col>
                    </Row>
                    <Col span={24}>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name price!',
                            },
                        ]}
                    >
                        <InputNumber style={{width:'100%'}} min={0}   
                        
                        />
                    </Form.Item>
                    </Col>
                    <Form.Item
                        label="Image"
                        name="image"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image!',
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

export default ModalAddProduct