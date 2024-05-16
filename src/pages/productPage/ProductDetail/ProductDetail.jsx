import { Row, Col, message, Switch} from "antd";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./style.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { callCreateComments , callFetchProductById } from "../../../services/productApi";
import SkeletonComponent from "../../../components/skeleton/SkeletonComponent";
import { doCreateCartProduct } from "../../../redux/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci";
import { callAddLikeProduct } from "../../../services/likeProductApi";

const ProductDetail = () => {
  //init value account
  const _id = useSelector(state => state.account.user._id)
  const name = useSelector(state => state.account.user.name)
  const avatar = useSelector(state => state.account.user.avatar)

  const [dataProduct, setDataProduct] = useState({});
  const [dataCommnet , setDataComment] = useState([])
  const location = useLocation();
  const id = location.pathname.split("/").pop();
  const userId = useSelector((state) => state.account.user._id);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchProductById(id);
  }, [id]);
  const fetchProductById = async (id) => {
    try {
      const res = await callFetchProductById(id);
      if (res && res.data) {
        // console.log(res.data); 
        setDataComment(res.data.data.comments)
        // console.log('check : ' , res.data.data.comments)
        setTimeout(() => {
          setDataProduct(res.data.data);
        }, [200]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const images = [
    {
      original: dataProduct.image,
      thumbnail: dataProduct.image,
      originalClass: "originalClass",
    },
    ...(dataProduct.slider
      ? dataProduct.slider.map((item, index) => ({
          key: index,
          original: item,
          thumbnail: item,
          originalClass: "originalClass",
        }))
      : []),
  ];

  //count product
  const [countProduct, setCountProduct] = useState(1);
  const handleAddCount = () => {
    if (countProduct < dataProduct.quantity) {
      setCountProduct((pre) => pre + 1);
    } else {
      message.info(`Số lượng sản phẩm tạm có là ${dataProduct.quantity}`);
    }
  };
  const handleRemoveCount = () => {
    if (countProduct > 1) {
      setCountProduct((pre) => pre - 1);
    }
  };

  const handleAddToCart = (quantity, dataProduct) => {
    dispatch(
      doCreateCartProduct({
        userId: userId,
        quantity,
        detail: dataProduct,
        _id: dataProduct._id,
      })
    );
    setCountProduct(1);
  };
 

  const handleAddLikeProduct = async (values) => {
    console.log('values' ,values)
    const res = await callAddLikeProduct(values)
    console.log('check res' ,res)
    if(res.data.status === 'ok'){
      message.success(res.data.message)
    }else{
     message.error(res.data.message)
    }
 
  }
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      {Object.keys(dataProduct).length !== 0 ? (
        <Row className="productDetail-container">
          <Col span={2}></Col>
          <Col className="left" span={10}>
            <ImageGallery
              items={images}
              showPlayButton={false} // Ẩn nút phát
              showFullscreenButton={false} // Ẩn nút toàn màn hình
              renderLeftNav={() => <></>} // Mũi tên trái === <> </>
              renderRightNav={() => <></>} // Mũi tên phải === <> </>
              slideOnThumbnailOver={true} // Di chuột qua thumbnail => tự động cuộn ảnh
            />
          </Col>
          <Col className="right" span={10}>
            <div className="brand">{dataProduct.brand}</div>
            <div className="name">{dataProduct.name}</div>
            <div className="middle">
              <div className="object">
                {" "}
                <span>Đối tượng :</span> {dataProduct.sex}
              </div>
              <div className="size">
                <span>Kích cỡ :</span> {dataProduct.size}
              </div>
              <div className="waterproof">
                <span>Kháng nước :</span>{" "}
                {dataProduct.waterproof ? "Có" : "Không"}
              </div>
              <div className="des">
                {" "}
                <span>Mô tả :</span> {dataProduct.description}
              </div>
              <div className="quantity">
                <span>Số lượng còn lại :</span> {dataProduct.quantity}
              </div>
            </div>
            <div className="price">
              {dataProduct.price &&
                dataProduct.price.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
            </div>
            <div className="count">
              <div>
                <button
                  onClick={() => {
                    handleRemoveCount();
                  }}
                >
                  -
                </button>
                <input type="text" value={countProduct} />
                <button
                  onClick={() => {
                    handleAddCount();
                  }}
                >
                  +
                </button>
              </div>
              <div style={{ fontSize: 20, padding: "0 20px" }}>
                Đã bán : {dataProduct.sold}
              </div>
            </div>

            <Row gutter={12}>
              {dataProduct.quantity === 0 ?  <Col span={24}>
                  <button
                    // className="btn-addCart"
                    style={{
                      width: "100%",
                      padding: "18px 0",
                      border: "none",
                      backgroundColor: "grey",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "18px",
                    }}
                  >
                    {" "}
                    Hết hàng
                  </button>
                </Col> : (
                <Col span={24} style={{display:'flex' , justifyContent:'center', alignItems:'center' }}>
                  <button
                    onClick={() => {
                      handleAddToCart(countProduct, dataProduct);
                    }}
                    className="btn-addCart"
                    style={{
                      width: "100%",
                      padding: "18px 0",
                      border: "none",
                      backgroundColor: "darkRed",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "18px",
                    }}
                  >
                    {" "}
                    Thêm vào giỏ hàng
                  </button>
                   <span style={{fontSize:'40px', padding:'0 10px'}} onClick={()=> {handleAddLikeProduct(dataProduct)}}>   <CiHeart /></span>
                </Col>
              )}
              <div>
              
              </div>
            </Row>
          </Col>
        </Row>
      ) : (
        <SkeletonComponent />
      )}
    </div>
  );
};

export default ProductDetail;
