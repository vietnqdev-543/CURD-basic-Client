
import './style.scss'
import banner2 from './banner2.jpg'
import banner1 from './banner1.jpg'
import { callFetchAllProduct } from '../../services/productApi';
import { useEffect, useState } from 'react';
import {Row , Col} from 'antd'
import {useNavigate} from 'react-router-dom'
const HomePage = () => {
  const [listProduct , setListProduct] = useState([])
  const [top4SoldProduct , setTop4SoldProduct] = useState([])

  useEffect(()=>{
    getListProduct()
    console.log('checkkkkk : ', listProduct)
  },[])

const getListProduct = async () => {
  try {
    const res = await callFetchAllProduct();
    setListProduct(res.data);
    const sortedProducts = [...res.data].sort((a, b) => b.sold - a.sold);
    setTop4SoldProduct(sortedProducts.slice(0, 4));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

  const navigate = useNavigate()
 


  return (
    <div className='home-container'>
      <div className="c1">
        {/* <SliderComponent arrImg={arrImage}/> */}
          <img src={banner2} className='img' alt="" />
      </div>
      <div className="c2">
        <div className='item item1' onClick={()=>{navigate('/product')}}>
          <div className='name'>Sản phẩm mới</div>
        </div>
        <div className='item item2' onClick={()=>{navigate('/product')}}>
          <div className='name'>Nam</div>
        </div>
        <div className='item item3' onClick={()=>{navigate('/product')}}>
          <div className='name'>Nữ</div>
        </div>
        <div className='item item4' onClick={()=>{navigate('/product')}}>
          <div className='name'>Cặp đôi</div>
        </div>
      </div>

      <div className="c4">
        <h1 className='title'>Top sản phẩm bán chạy</h1>
        <Row gutter={30}>
          {top4SoldProduct.map((item, index)=>{
          return(
            <Col span={6} key={index}>
            <div className="item"  onClick={()=>{navigate(`product/${item._id}`)}}>
              <div className="thumbnail">
                <img src={item.image} alt="" />
              </div>
              <div className="name">
                <div>{item.name}</div>
              </div>
                <div className="price">
                  <div>
                  {`${item.price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}`}
                  </div>
                </div>
                <div className='viewdetail'>
                  <a href={`product/${item._id}`}> xem thêm</a>
                 
                </div>
            </div>  
          </Col>
          )

          })}
        </Row>

      </div>

      <div className="c1">    
          <img src={banner1} className='img' alt="" />
      </div>

      
    </div>
  )
}

export default HomePage
