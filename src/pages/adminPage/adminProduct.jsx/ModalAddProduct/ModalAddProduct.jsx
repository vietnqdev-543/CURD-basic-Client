    import React, { useEffect, useState } from 'react'
    import { Modal, Form, Input, Checkbox, Button, Select, Row, Col, InputNumber } from 'antd'
    import { PlusOutlined } from '@ant-design/icons';
    import { UploadOutlined } from '@ant-design/icons';
    import { Image, Upload, Space } from 'antd'

    const ModalAddProduct = (props) => {
        const { modalAddProduct, setModalAddProduct, handleSubmitAddProduct, listCategory } = props
        const handleCancel = () => {
            setModalAddProduct(false);
        };
        const [form] = Form.useForm()

        const [image, setImage] = useState({})
        const [slider, setSlider] = useState([])
        const convertBase64Image = (e) => {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => {
                console.log('check:', reader.result);
                setImage(reader.result);
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
                <Modal title="Create product" open={modalAddProduct} onOk={form.submit} onCancel={handleCancel}>
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
                                            ...listCategory.map((item) => ({
                                                value: item.brand,
                                                label: item.brand,
                                            })),
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
                                    <InputNumber min={0} style={{ width: '100%' }} />
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
                                    <InputNumber min={0} style={{ width: '100%' }} />
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
                                <InputNumber style={{ width: '100%' }} min={0}

                                />
                            </Form.Item>
                        </Col>
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

                        <Form.Item
                            label="Image thumbnail"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your image!',
                                },
                            ]}
                        >
                            <input type="file" onChange={convertBase64Image} />
                            {image && <Image src={image} style={{ width: '100px', height: 'auto', borderRadius: '50%' }}></Image>}
                        </Form.Item>


                        <Form.Item
                            label="Image slider (max 3 items)"
                            name="slider"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your slider!',
                                },
                            ]}
                        >
                            <input type='file' multiple onChange={convertBase64Slider} />
                            <Space wrap>
                                {slider.map((slide, index) => (
                                    <Image
                                        key={index}
                                        src={slide}
                                        style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '5px' }}
                                    />
                                ))}
                            </Space>
                        </Form.Item>




                    </Form>
                </Modal>
            </div>
        )
    }

    export default ModalAddProduct