import React, { useEffect, useState } from "react";
import { callFetchAllLikeProduct } from "../../services/likeProductApi";
import { Card, Col, Row, Tabs, Select , Button } from "antd";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;

const LikeProduct = () => {
  const navigate  = useNavigate()
  const [listLikeProduct, setListLikeProduct] = useState([]);
  // const [idProduct , setIdProduct]
  useEffect(() => {
    handleGetlistLikeProduct();
  }, []);
  const handleGetlistLikeProduct = async () => {
    const res = await callFetchAllLikeProduct();
    console.log(res.data.data);
    setListLikeProduct(res.data.data);
  };
  
    const handleNavigateProductDetail = (productId) => {
      navigate(`/product/${productId}`);
  };
  return (
    <div style={{ width: "100%", minHeight: "80vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {listLikeProduct &&
          listLikeProduct.map((item, index) => {
            return (
              <div key={item}>
                <div onClick={()=>{handleNavigateProductDetail(item.idProduct)}}>
                <Card
                  hoverable
                  style={{
                    width: 240,
                  }}
                  cover={<img alt="example" src={item.image} />}
                >
                  <Meta title={item.name} />
                  <div style={{ fontSize: 20, color: "darkRed" }}>
                    {item.price.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                  <Button>Bỏ yêu thích</Button>
                </Card>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LikeProduct;
