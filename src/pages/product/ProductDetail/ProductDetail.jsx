import { Row, Col } from 'antd'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import './style.scss'
import { useEffect, useState } from 'react';

import {useLocation} from 'react-router-dom'
import { callFetchProductById } from '../../../services/productApi';
import { render } from 'react-dom';


const ProductDetail = ({}) => {
  const [dataProduct , setDataProduct] =useState({})
  const location =useLocation()
  const id = location.pathname.split('/').pop();

  
  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const fetchProductById = async(id) => {
    console.log('check' , id);
    try {
      const res =  await callFetchProductById(id);
      if (res && res.data) {
        console.log(res.data);
        setDataProduct(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const images = [
   {
    original :dataProduct.image ,
    thumbnail : dataProduct.image ,
    originalClass : 'originalClass'
   }
  ]
  
  //count product
  const [countProduct , setCountProduct] = useState(1)
  const handleAddCount = () => {
    setCountProduct(pre => pre + 1)
  }
  const handleRemoveCount = () => {
    if (countProduct > 1) {
      setCountProduct(pre => pre - 1)
    }
  }
  
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <Row className='productDetail-container'>
        <Col className='left' span={12} >
        
         <ImageGallery items={images} showPlayButton={false} //hide play button
                          showFullscreenButton={false} //hide fullscreen button
                          renderLeftNav={() => <></>} //left arrow === <> </>
                          renderRightNav={() => <></>}//right arrow === <> </>
                          slideOnThumbnailOver={true}  //onHover => auto scroll images
          />
       
         
        </Col>
        <Col className='right' span={12} >
          <div className="brand">{dataProduct.brand} </div>
          <div className="name">{dataProduct.name} </div>
          <div className='middle'>
            <div className="object"> <span>Đối tượng :</span> {dataProduct.sex}</div>
            <div className="size"><span>kích cỡ :</span> {dataProduct.size}</div>
            <div className="waterproof"><span>Kháng nước :</span>  {dataProduct.waterproof}</div>
            <div className="des"> {dataProduct.description}</div>
          </div>
          <div className="price">{dataProduct.price && dataProduct.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
          <div className='count'>
            <button onClick={()=>{handleRemoveCount()}}>-</button>
            <input type="text" value={countProduct} />
            <button onClick={()=>{handleAddCount()}}>+</button>
          </div>


          <Row gutter={12}>
            <Col span={12}>
              <button style={{width:'100%', padding:'18px 0' , border:'none', backgroundColor:'darkRed', color:'white', borderRadius:'5px',fontSize:'18px'}}>Thêm vào giỏ hàng</button>
            </Col>
            <Col span={12}>
              <button style={{width:'100%', padding:'18px 0' , border:'none', backgroundColor:'darkBlue', color:'white', borderRadius:'5px' , fontSize:'18px'}}>Mua ngay</button>
            </Col>
         
          </Row>
        </Col>
      </Row>



    </div>
  )
}

export default ProductDetail