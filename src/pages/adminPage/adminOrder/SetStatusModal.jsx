import { Modal, Select, Form, Input } from "antd";
import { callSetStatusOrder } from "../../../services/orderApi";
import { useEffect } from "react";
const SetStatusModal = (props) => {
    const {openModal, setOpenModal, dataModalSetStatus , setDataModalSetStatus} = props
    const [form] = Form.useForm();
    useEffect(()=>{
        if(openModal && dataModalSetStatus){
            form.setFieldsValue(dataModalSetStatus)
        }
    }, [dataModalSetStatus, openModal])

  const handleCancel = () => {
      setDataModalSetStatus({})
      form.resetFields()    
    setOpenModal(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onFinish = async (values) => {
    console.log(values)
    const res = await callSetStatusOrder(values);
    console.log(res);
    setOpenModal(false);
  };
  return (
    <div>
      <Modal
        title="Cập nhật trạng thái đơn hàng"
        open={openModal}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 12,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="ID"
            name="_id"
            //   initialValue={dataModalSetStatus._id}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cập nhật trạng thái đơn hàng"
            name="status"
            initialValue={dataModalSetStatus.status}
            rules={[
              {
                required: true,
                message: "Please input your status!",
              },
            ]}
          >
            <Select
              defaultValue={""}
              onChange={handleChange}
              options={[
                {
                  value: "confirm",
                  label: "Xác nhận đơn hàng",
                },
                {
                  value: "shipping",
                  label: "Đang giao hàng",
                },
                {
                  value: "succes",
                  label: "Giao hàng thành công",
                },
                {
                  value: "cancel",
                  label: "Đã huỷ",
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SetStatusModal;
