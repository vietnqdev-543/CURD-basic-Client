import { useEffect, useState } from "react";
import "./style.scss";
import { callCancelOrder, callGetOrderByID } from "../../../services/orderApi";
import { useSelector } from "react-redux";
import { Divider, Button, Row, message } from "antd";
import { Empty} from "antd";
const OrderManager = () => {
  const [listOrder, setListOrder] = useState([]);
  const _id = useSelector((state) => state.account.user._id);
  useEffect(() => {
    handleGetOrderById();
  }, [listOrder]);
  const handleGetOrderById = async () => {
    const res = await callGetOrderByID(_id);
    console.log("check res :", res.data.data);
    // const listdata = res.data.data.sort((a,b)=>{b.createdAt - a.createdAt})
    const listdata = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // chuyển về Date để so sánh
    setListOrder(listdata);
  };
  const handleCancelOrder = async (_id) => {
    const res = await callCancelOrder(_id);
    console.log("check status :", res);
    message.info('Huỷ đơn hàng thành công')
  };
  return (
    <div className="orderManager-container">
      {listOrder.length === 0 ? (
        <div style={{ paddingTop: "20%" }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chưa có đơn hàng "
          />
        </div>
      ) : (
        <div>
          {listOrder.map((item, index) => {
            return (
              <div className="cart-item" key={index}>
                <div
                  style={{ color: "grey", fontSize: "20px", marginTop: "10px" }}
                >
                  {item.status === "confirm" ? <>Đã xác nhận</> : <></>}
                  {item.status === "shipping" ? <>Đang vận chuyển</> : <></>}
                  {item.status === "succes" ? <>Giao hàng thành công</> : <></>}
                  {item.status === "cancel" ? <>Đã huỷ</> : <></>}
                </div>
                <Divider />
                <div>
                  {item.detailProduct.map((item, index) => {
                    return (
                      <div className="product-detail" key={index}>
                        <div className="content">
                          <div className="image">
                            <img src={item.image} alt="" />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              lineHeight: "1.7rem",
                            }}
                          >
                            <div>
                              <div style={{ fontSize: "20px" }}>
                                {item.nameProduct}
                              </div>
                              <div>Số lượng : {item.quantity}</div>
                            </div>
                            <div>
                              {(item.quantity * item.price).toLocaleString(
                                "it-IT",
                                { style: "currency", currency: "VND" }
                              )}
                            </div>
                          </div>
                        </div>
                        <Divider />
                      </div>
                    );
                  })}
                </div>
                {/* <Divider /> */}
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 10px 20px 0",
                  }}
                >
                  <div style={{ fontSize: "20px" }}>
                    {" "}
                    <span style={{ color: "grey" }}>Tổng tiền :</span>{" "}
                    {item.totalPrice.toLocaleString("it-IT", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <Button>Xem chi tiết</Button>
                    <Button
                        type="primary"
                        onClick={()=>{handleCancelOrder(item._id)} }

                      >
                        Huỷ đơn hàng
                      </Button>
                  </div>
                </Row>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderManager;
