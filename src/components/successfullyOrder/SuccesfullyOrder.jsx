import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const SuccesfullyOrder = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: "80vh" }}>
      <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Cảm ơn bạn đã đặt hàng"
        extra={[
          <Button
            onClick={() => {
              navigate("/orderManager");
            }}
            type="primary"
            key="console"
          >
            Xem đơn hàng
          </Button>,
          <Button
            onClick={() => {
              navigate("/product");
            }}
            key="buy"
          >
            Tiếp tục mua sắm
          </Button>,
        ]}
      />
    </div>
  );
};

export default SuccesfullyOrder;
