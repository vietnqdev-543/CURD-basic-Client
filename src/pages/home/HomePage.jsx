import SliderComponent from '../../components/sliderComponent/SliderComponent';
import './style.scss'
import banner2 from './banner2.jpg'
import banner1 from './banner1.jpg'
import { callFetchAllProduct } from '../../services/productApi';
import { useEffect } from 'react';
import {Row , Col} from 'antd'
const HomePage = () => {
  useEffect(()=>{
    listProduct()
  },[])
  const arrImage = [
    'https://images.pexels.com/photos/20804798/pexels-photo-20804798/free-photo-of-thanh-ph-ngh-thu-t-m-c-toa-nha.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' ,
    'https://media.istockphoto.com/id/1383796215/photo/silhouette-of-man-holding-binoculars-on-mountain-peak-against-bright-sunlight-sky-background.jpg?b=1&s=612x612&w=0&k=20&c=7qil3OYFwP814_tFl1b-nPHloTptreuOeWA0HOLE5pE=' ,
    'https://media.istockphoto.com/id/1446043855/photo/black-woman-on-road-enjoying-window-view-of-desert-and-traveling-in-jeep-on-holiday-road-trip.jpg?b=1&s=612x612&w=0&k=20&c=_7aLPcUUN1sMMmIUpPPI4BshWkwn5MQuI9FFEHswy34='
  ]
  const listProduct = async() => {
    const res = await callFetchAllProduct()
    console.log('list product' ,res.data)
  }
  return (
    <div className='home-container'>
      <div className="c1">
        {/* <SliderComponent arrImg={arrImage}/> */}
          <img src={banner2} className='img' alt="" />
      </div>
      <div className="c2">
        <div className='item item1'>
          <div className='name'>Sản phẩm mới</div>
        </div>
        <div className='item item2'>
          <div className='name'>Nam</div>
        </div>
        <div className='item item3'>
          <div className='name'>Nữ</div>
        </div>
        <div className='item item4'>
          <div className='name'>Cặp đôi</div>
        </div>
      </div>
      <div className="c1">    
          <img src={banner1} className='img' alt="" />
      </div>

      <div className="c4">
          <Row gutter={15}>
            <Col className='c4-item' span={6}>
              <div>1</div>
            </Col>
            <Col className='c4-item' span={6}>
              <div>2</div>
            </Col>
            <Col className='c4-item' span={6}>
              <div>3</div>
            </Col>
            <Col className='c4-item' span={6}>
              <div>4</div>
            </Col>
          </Row>
        </div>

      
    </div>
  )
}

export default HomePage
