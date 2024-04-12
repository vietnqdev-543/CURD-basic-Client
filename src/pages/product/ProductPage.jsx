import { useEffect, useState } from "react"
import { callFetchAllProduct } from "../../services/productApi"
import {  Card, Col, Row} from "antd"
import { useNavigate } from 'react-router-dom'
import ProductDetail from "./ProductDetail/ProductDetail"
import SpinLoading from "../../components/spinLoading/SpinLoading"
const { Meta } = Card
const ProductPage = () => {
  const navigate = useNavigate()
  const [listProduct, setListProduct] = useState([])
  const [isLoading , setIsLoading] = useState(false)
  useEffect(() => {
    
    setTimeout(()=>{
      handleFetchAccount()
    },[1000])
  }, [])

  const handleFetchAccount = async () => {
    try {
      const res = await callFetchAllProduct()
      if(res.data){
        console.log(res.data)
        setListProduct(res.data)
      }else{
        console.log('có lỗi xảy ra')
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  const [dataSlug, setDataSlug] = useState({})
  const handleNavigateProductDetail = (productId) => {
    const slug = productId
    console.log(slug)
    setDataSlug(slug)
    navigate(`${slug}`)
  }

  return (
    <div>
      <div style={{ display: 'none' }}>
      </div>
      <div style={{ padding: '30px 0px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h1>Product Page</h1>
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {listProduct.map((item, index) => (
          <Col className="clickme" span={4} key={index} onClick={() => { handleNavigateProductDetail(item._id) }} >
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={item.image} />}
            >
              <Meta title={item.name} />
              {item.price ?
                <div style={{ fontSize: '25px', fontWeight: 'bold', color: 'darkred' }}>
                  {`${item.price.toLocaleString('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  })}`}
                </div>
                :
                <Meta description='Sold out' />
              }
            </Card>
          </Col>
        ))}
      </Row>

    </div>
  )
}

export default ProductPage
