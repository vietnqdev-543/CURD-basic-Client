import React from 'react'
import { Modal, Form, Input, Checkbox, Button, Select, Row, Col ,InputNumber } from 'antd'

const ModalUpdateProduct = (props) => {
    const { isModalOpenUpdateProduct,setIsModalOpenUpateProduct , handleSubmitUpdateProduct, dataProductUpdate,  listCategory} = props
    const [form] = Form.useForm()
    const handleCancel = () => {
        setIsModalOpenUpateProduct(false)
        form.resetFields()
      }

    return (
        <div>
            <Modal title="Add Product" open={isModalOpenUpdateProduct} onOk={form.submit} onCancel={handleCancel}>
                <Form
                    form={form}
                    onFinish={handleSubmitUpdateProduct}
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
                            label="ID Product"
                            name="_id"
                            style={{display:'none'}}
                            initialValue={dataProductUpdate._id}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name id!',
                                },
                            ]}
                        >
                            <Input  />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            label="Name product"
                            name="name"
                            initialValue={dataProductUpdate.name}
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
                                initialValue={dataProductUpdate.brand}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your brand!',
                                    },
                                ]}
                            >
                                <Select
                                    options={[
                                        ...listCategory.map((item)=>{
                                            return {value : item.brand ,label : item.brand }
                                        })
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                label="Sex"
                                name="sex"
                                initialValue={dataProductUpdate.sex}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your sex!',
                                    },
                                ]}
                            >
                                <Select
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
                        <Col span={6}>
                            <Form.Item
                                label="Size"
                                name="size"
                                initialValue={dataProductUpdate.size}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your size!',
                                    },
                                ]}
                            >
                                <Select
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
                                initialValue={dataProductUpdate.waterproof}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your waterproof!',
                                    },
                                ]}
                            >
                                <Select
                                    options={[
                                        {
                                            value: true,
                                            label: 'Có',
                                        },
                                        {
                                            value: false ,
                                            label : 'Không'
                                        }
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
                        initialValue={dataProductUpdate.quantity}
                        
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
                        initialValue={dataProductUpdate.sold}
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

                    <Form.Item
                        label="Price"
                        name="price"
                        initialValue={dataProductUpdate.price}
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
                        initialValue={dataProductUpdate.image}
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
                        initialValue={dataProductUpdate.description}
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