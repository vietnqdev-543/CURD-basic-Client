
import './style.scss'
import { callFetchAllProduct } from '../../services/productApi';
import { useEffect, useState } from 'react';
import {Row , Col , Card} from 'antd'
import {useNavigate} from 'react-router-dom'
import SliderComponent from '../../components/sliderComponent/SliderComponent'
import slide0  from '../../assets/images/slide0.jpg'
import slide1  from '../../assets/images/slide1.jpg'
import slide2  from '../../assets/images/slide2.jpg'
import slide3  from '../../assets/images/slide3.jpg'
const { Meta } = Card

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
 
  const arrImageSlider = [
    slide0 , slide1 , slide2 , slide3
  ]
  return (
    <div className='home-container'>
      <div className="c1">
        <SliderComponent arrImg={arrImageSlider}/>

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
        <Row  gutter={10}>
          {top4SoldProduct.map((item, index)=>{
          return(
            <Col xs={6} sm={8} md={6} lg={6} xl={6} xxl={6} key={index} onClick={()=>{navigate(`product/${item._id}`)}}> 
             <Card className='item'
              hoverable
              style={{
                width:'100%',
              }}
              cover={<img alt="example" src={item.image} />}
            >
              <div className='name'> {item.name}</div> 
              {item.price ?
                <div className='price'>
                  {`${item.price.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}`}
                </div>
                :
                <Meta description='Sold out' />
              }
            </Card>
          </Col>
          )

          })}
        </Row>

      </div>

      
      
    </div>
  )
}

export default HomePage
