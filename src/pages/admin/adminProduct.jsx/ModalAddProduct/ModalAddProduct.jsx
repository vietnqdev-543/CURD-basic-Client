import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Checkbox, Button, Select, Row, Col, InputNumber } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd'
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const ModalAddProduct = (props) => {
    const { isModalOpenAddProduct, setIsModalOpenAddProduct, handleSubmitAddProduct, listCategory } = props
    const handleCancel = () => {
        setIsModalOpenAddProduct(false);
    };
    const [form] = Form.useForm()

    //handle upload file
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const [fileList, setFileList] = useState([])
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

                  {/* image && slider   */}
                    {/* <Form.Item
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
                        label="slider"
                        name="slider"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your slider!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> */}


                    <Col span={12}>
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
                     <Upload
                        action=""
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            wrapperStyle={{
                                display: 'none',
                            }}
                            preview={{
                                visible: previewOpen,
                                onVisibleChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
                    </Form.Item>
                    </Col>
                </Form>
            </Modal>
        </div>
    )
}

export default ModalAddProduct