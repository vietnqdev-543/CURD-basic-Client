    import React, { useEffect, useState } from 'react'
    import { Modal, Form, Input, Select, Row, Col, InputNumber, Image,Space} from 'antd'


    const ModalUpdateProduct = (props) => {
        const { modalUpdateProduct, setModalUpdateProduct, handleSubmitUpdateProduct, dataProductUpdate, listCategory, setDataProductUpdate } = props

        useEffect(() => {
            if (modalUpdateProduct && dataProductUpdate) {
                form.setFieldsValue(dataProductUpdate)
                setImage(dataProductUpdate?.image);
                setSlider(dataProductUpdate?.slider)
            }
        }, [modalUpdateProduct, dataProductUpdate])

        const [form] = Form.useForm()
        const handleCancel = () => {
            setModalUpdateProduct(false)
            form.resetFields()
            setDataProductUpdate([])
            setImage({})
        }
        const [image , setImage] = useState({})
        const [slider , setSlider] = useState([])
        const convertBase64Image = (e) => {
            const reader = new FileReader();    
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                console.log('check:', reader.result);
                setImage(reader.result)
                form.setFieldsValue({ image: reader.result });
            };
            reader.onerror = (error) => {
                console.log(error);
            };
        }

        const convertBase64Slider = (e) => {
            const files = e.target.files
            const newSlider = [];
            if (files) {
                for (let i = 0; i < files.length; i++) {
                    const reader = new FileReader();
                    reader.readAsDataURL(files[i]);
                    reader.onload = () => {
                        newSlider.push(reader.result);
                        if (newSlider.length === files.length) {
                            console.log('check :' , newSlider)
                            setSlider(newSlider);
                            form.setFieldsValue({ slider: newSlider }); 
                        }
                    };
                    reader.onerror = (error) => {
                        console.log(error);
                    };
                }
            }
        };
        
        return (
            <div>
                <Modal title="Update Product" open={modalUpdateProduct} onOk={form.submit} onCancel={handleCancel}>
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
                                style={{ display: 'none' }}
                                initialValue={dataProductUpdate._id}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name id!',
                                    },
                                ]}
                            >
                                <Input />
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
                                            ...listCategory.map((item) => {
                                                return { value: item.brand, label: item.brand }
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
                                                value: 'men',
                                                label: 'Men',
                                            },
                                            {
                                                value: 'women',
                                                label: 'Women',
                                            },
                                            {
                                                value: 'couple',
                                                label: 'Couple',
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
                                                value: false,
                                                label: 'Không'
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
                                    <InputNumber min={0} style={{ width: '100%' }} />
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
                                    <InputNumber min={0} style={{ width: '100%' }} />
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
                            <Image src={image} style={{ width: '100px', height: 'auto', borderRadius: '50%' }} />
                            <input type="file" onChange={convertBase64Image} />
                        </Form.Item>

                        <Form.Item
                            label="Slider"
                            name="slider"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your slider!',
                                },
                            ]}
                        >
                            <Space wrap>
                                {slider?.map((item, index) => (
                                    <Image  
                                        key={index}
                                        src={item}
                                        style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '5px' }}
                                    />
                                ))
                                }
                            </Space>
                            <input type="file" multiple onChange={convertBase64Slider} />

                        </Form.Item>



                    </Form>
                </Modal>
            </div>
        )
    }

    export default ModalUpdateProduct