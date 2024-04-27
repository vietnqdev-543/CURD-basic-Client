import { useEffect, useState } from "react";
import "./style.scss";
import {
  Col,
  Divider,
  InputNumber,
  Row,
  Empty,
  Button,
  Form,
  Input,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  doDeleteCartProduct,
  doResetCartProduct,
  doUpdateCartProduct,
} from "../../redux/order/orderSlice";
import { callCreateOrder } from "../../services/orderApi";
import { useNavigate } from "react-router-dom";
import SuccesfullyOrder from "../../components/successfullyOrder/SuccesfullyOrder";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [dataCart, setDataCart] = useState([]);
  const cartsList = useSelector((state) => state.order.carts);
  const userId = useSelector(state => state.account.user._id)
  useEffect(() => {
    setDataCart(cartsList);
    console.log(cartsList);
  }, [cartsList]);

  useEffect(() => {
    handleTotalPrice();
  }, [dataCart]);
  const [totalPrice, setTotalPrice] = useState(0);
  const handleTotalPrice = () => {
    const res = dataCart.reduce((total, currentItem) => {
      return total + currentItem.quantity * currentItem.detail.price;
    }, 0);
    setTotalPrice(res);
    console.log("checkTotalPrice :", res);
  };
  const handleOnchangeInput = (value, item) => {
    if (!value || value < 1) return;
    else {
      dispatch(
        doUpdateCartProduct({ _id: item._id, quantity: value, detail: item })
      );
    }
  };

  const onFinish = async(values) => {
    const detailProduct = dataCart.map((item)=>{
    return {
      nameProduct :item.detail.name ,
      quantity : item.detail.quantity ,
      price : item.detail.price
    }
    })
    const data = {
      customerName : values.customerName ,
      customerAdress: values.customerAdress ,
      customerPhone : values.customerPhone ,
      customerId : userId ,
      totalPrice : totalPrice ,
      detailProduct : detailProduct
  }
  const res = await callCreateOrder(data)
  dispatch(doResetCartProduct())
  console.log(res)
  navigate('/sucessfullyOrder')
    // console.log('check values form :' , data )
  };
  return (
    <div className="cart-container">
      <Row gutter={20}>
        <Col span={2}></Col>
        <Col className="left" span={14}>
          {dataCart.length === 0 ? (
            <>
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </>
          ) : (
            <>
              {dataCart.map((item, index) => {
                return (
                  <div className="item-cart" key={index}>
                    <Col
                      span={10}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={item.detail.image} alt="" className="image" />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          flexDirection: "column",
                          padding: "5px",
                          gap: "10px",
                          cursor: "default",
                        }}
                      >
                        <span className="name">{item.detail.name}</span>
                        <span
                          className="delete-item"
                          onClick={() => {
                            dispatch(doDeleteCartProduct({ _id: item._id }));
                          }}
                        >
                          Remove
                        </span>
                      </div>
                    </Col>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="quantity">
                        <InputNumber
                          onChange={(value) => {
                            handleOnchangeInput(value, item);
                          }}
                          value={item.quantity}
                        ></InputNumber>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "100px" }}>
                      <div className="price">
                        <span>
                          {" "}
                          {item.detail.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </div>
                      <div className="totalPrice">
                        <span>
                          {(item.quantity * item.detail.price).toLocaleString(
                            "it-IT",
                            { style: "currency", currency: "VND" }
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </Col>
        <Col className="right" span={6}>
          <Col className="pay" span={24}>
            <h2 style={{ padding: "0 20px 30px 20px" }}>Tóm tắt giỏ hàng</h2>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px",
              }}
            >
              <span>Tạm tính</span>
              <span>
                {totalPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <Divider />
            </Row>
            <Row
              gutter={10}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px",
                alignItems: "center",
              }}
            >
              <Col span={16}>
                <input
                  placeholder="Mã giảm giá"
                  type="text"
                  style={{
                    width: "100%",
                    padding: "10px 20px",
                    outline: "none",
                  }}
                />
              </Col>
              <Col span={8}>
                <button
                  style={{
                    width: "100%",
                    padding: "12px 20px",
                    background: "darkred",
                    borderRadius: "5px",
                    color: "white",
                    border: "1px solid darkred",
                  }}
                >
                  Áp dụng
                </button>
              </Col>
              <Divider />
            </Row>
            <Row
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 20px",
                alignItems: "center",
              }}
            >
              <span>Tổng tính</span>
              <span
                style={{
                  color: "darkred",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {totalPrice.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
              <Divider />
            </Row>
            <h2 style={{ padding: "0 20px 0px 20px" }}>Thông tin người nhận </h2>
          <div style={{padding:' 0 20px'}}>
          <Form
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
              onFinish={onFinish}
              autoComplete="off"
            >
              
              <Form.Item
                name="customerName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên người nhận!",
                  },
                ]}
              >
                <Input  className="input" placeholder="Tên người nhận"/>
              </Form.Item>

              <Form.Item
                name="customerAdress"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ!",
                  },
                ]}
              >
                <Input className="input"  placeholder="Địa chỉ"/>
              </Form.Item>

              <Form.Item
                name="customerPhone"
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập số điện thoại người nhận!",
                  },
                ]}
              >
                <Input className="input" placeholder="Số điện thoại "/>
              </Form.Item>


              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
              >
                <Button style={{width:'100%' , 
                  backgroundColor: "darkred",
                  color: "white",
                  border: "none",
                  height:'40px',
                  borderRadius: "5px",}} type="primary" htmlType="submit">
                  Đặt hàng ( {dataCart?.length} )
                </Button>
              </Form.Item>
            </Form>
          </div>

          </Col>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  );
};

export default Cart;
