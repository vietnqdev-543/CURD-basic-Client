import { useEffect, useState } from "react";
import "./style.scss";
import { callCancelOrder, callGetOrderByID } from "../../../services/orderApi";
import { useSelector } from "react-redux";
import { Divider, Button, Row, message } from "antd";
import { Empty} from "antd";
import { FaShippingFast } from "react-icons/fa";
import ViewDetailOrder from "../viewDetailOrder/ViewDetailOrder";

const OrderManager = () => {
  const [listOrder, setListOrder] = useState([]);
  const [showModalDetail, setShowModalDetail] = useState(false)
  const [dataOrderViewDetail , setDataOrderViewDetail] = useState({})
  const _id = useSelector((state) => state.account.user._id);
  useEffect(() => {
    handleGetOrderById();
  }, [listOrder]);
  const handleGetOrderById = async () => {
    const res = await callGetOrderByID(_id);
    console.log("check res :", res.data.data);
    const listdata = res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // chuyển về Date để so sánh
    setListOrder(listdata);
  };
  const handleCancelOrder = async (_id) => {
    const res = await callCancelOrder(_id);
    console.log("check status :", res);
    message.info('Huỷ đơn hàng thành công')
  };

  //modal view detail
  const handleShowModalViewDetail = () => {
    setShowModalDetail(true)
  }
  return (
    <div className="orderManager-container">
      <ViewDetailOrder showModalDetail={showModalDetail} setShowModalDetail={setShowModalDetail} dataOrderViewDetail={dataOrderViewDetail} />
      {listOrder.length === 0 ? (
        <div style={{ paddingTop: "20%" }}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Chưa có đơn hàng "
          />
        </div>
      ) : (
        <div>
          {listOrder.map((item, index)  => {
            return (
              <div className="cart-item" key={index}>
               <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div
                    style={{ color: "grey", fontSize: "20px", marginTop: "10px" }}
                  >
                    {item.status === "confirm" ? <div style={{color:'darkGreen'}}>Đã xác nhận</div> : <></>}
                    {item.status === "shipping" ? <div style={{color :'darkGreen', display:'flex', alignItems:'center', gap:'10px'}}> <FaShippingFast /> Đang vận chuyển</div> : <></>}
                    {item.status === "succes" ? <div style={{color:'darkGreen'}}>Giao hàng thành công</div> : <></>}
                    {item.status === "cancel" ? <div style={{color:'darkred'}}>Đã huỷ</div> : <></>}
                  </div>
                  <div>
                      {item.status === 'shipping' || 'succes'  ?    <div style={{color:'grey'}}>
                        <span>Mã vận đơn : </span>{item?.shippingCode}
                        </div> : null}
                  
                  </div>
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
                    <Button onClick={()=>{handleShowModalViewDetail(),  setDataOrderViewDetail(item)}}>Xem chi tiết</Button>
                    {item.status === 'confirm' ?                     <Button
                        type="primary"
                        onClick={()=>{handleCancelOrder(item._id)} }

                      >
                        Huỷ đơn hàng
                      </Button> : null}
                     {item.status === 'shipping' ?  <Button
                        type="primary"
                        disabled
                        onClick={()=>{handleCancelOrder(item._id)} }

                      >
                        Huỷ đơn hàng
                      </Button> : null}
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
