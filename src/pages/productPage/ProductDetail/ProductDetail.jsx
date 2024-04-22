import { Row, Col , Skeleton , Space, message} from 'antd'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './style.scss'
import { useEffect, useState } from 'react';

import {useLocation} from 'react-router-dom'
import { callFetchProductById } from '../../../services/productApi';
import SkeletonComponent from '../../../components/skeleton/SkeletonComponent';



const ProductDetail = ({}) => {
  const [dataProduct , setDataProduct] =useState({})
  const location =useLocation()
  const id = location.pathname.split('/').pop();
   useEffect(() => {
    fetchProductById(id);
  },[id])

  const fetchProductById = async(id) => {
    // console.log('check' , id);
    try {
      const res =  await callFetchProductById(id);
      if (res && res.data) {
        setTimeout(()=>{
          setDataProduct(res.data.data);
        },[1000])
      }
    } catch (error) {
      console.log(error);
    }
  }

  const images = [
    {
      original: dataProduct.image,
      thumbnail: dataProduct.image,
      originalClass: 'originalClass'
    },
    ...(dataProduct.slider ? dataProduct.slider.map((item, index) => ({
      original: item,
      thumbnail: item,
      originalClass: 'originalClass'
    })) : [])
  ];
  
  
  //count product
  const [countProduct , setCountProduct] = useState(1)
  const handleAddCount = () => {
    if(countProduct < dataProduct.quantity){
      setCountProduct(pre => pre + 1)
    }else{
      message.info(`Số lượng sản phẩm tạm có là ${dataProduct.quantity}`)
    }
  }
  const handleRemoveCount = () => {
    if (countProduct > 1) {
      setCountProduct(pre => pre - 1)
    }
  }
  
  return (
  <div style={{ width: '100%', minHeight: '100vh' }}>
    {Object.keys(dataProduct).length !== 0 ? (
      <Row className='productDetail-container'>
        <Col className='left' span={10}>
          <ImageGallery items={images} showPlayButton={false} // Ẩn nút phát
            showFullscreenButton={false} // Ẩn nút toàn màn hình
            renderLeftNav={() => <></>} // Mũi tên trái === <> </>
            renderRightNav={() => <></>} // Mũi tên phải === <> </>
            slideOnThumbnailOver={true}  // Di chuột qua thumbnail => tự động cuộn ảnh
          />
        </Col>
        <Col className='right' span={14}>
          <div className="brand">{dataProduct.brand}</div>
          <div className="name">{dataProduct.name}</div>
          <div className='middle'>
            <div className="object"> <span>Đối tượng :</span> {dataProduct.sex}</div>
            <div className="size"><span>Kích cỡ :</span> {dataProduct.size}</div>
            <div className="waterproof"><span>Kháng nước :</span> {dataProduct.waterproof ? "Có" : "Không"}</div>
            <div className="des"> <span>Mô tả :</span> {dataProduct.description}</div>
            <div className="quantity"><span>Số lượng còn lại :</span> {dataProduct.quantity}</div>
          </div>
          <div className="price">{dataProduct.price && dataProduct.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
          <div className='count'>
            <div>
              <button onClick={() => { handleRemoveCount() }}>-</button>
              <input type="text" value={countProduct} />
              <button onClick={() => { handleAddCount() }}>+</button>
            </div>
            <div style={{ fontSize: 20, padding: '0 20px' }}>
              Đã bán : {dataProduct.sold}
            </div>
          </div>

          <Row gutter={12}>
            <Col span={12}>
              <button className='btn-addCart' style={{ width: '100%', padding: '18px 0', border: 'none', backgroundColor: 'darkRed', color: 'white', borderRadius: '5px', fontSize: '18px' }}> Thêm vào giỏ hàng</button>
            </Col>
            <Col span={12}>
              <button className='btn-buy' style={{ width: '100%', padding: '18px 0', border: 'none', backgroundColor: 'darkBlue', color: 'white', borderRadius: '5px', fontSize: '18px' }}>Mua ngay</button>
            </Col>
          </Row>
        </Col>
      </Row>
    ) : 
    <SkeletonComponent />
      }
  </div>
  )
}

export default ProductDetail;