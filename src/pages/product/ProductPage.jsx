import { useEffect, useState } from "react"
import { callFetchAllProduct , callCreateProduct } from "../../services/productApi"
import { Button, Card, Col, Row, message } from "antd"
import AddProductModal from "./AddProductModal/AddProductModal"
const { Meta } = Card
const ProductPage = () => {
  const [listProduct, setListProduct] = useState([])
  useEffect(() => {
    handleFetchAccount()
  }, [])

  const handleFetchAccount = async () => {
    try {
      const res = await callFetchAllProduct()
      console.log(res.data) // Make sure this logs the expected data structure
      setListProduct(res.data) // Assuming res.data contains the array of products
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }


  return (
    <div>
      <div style={{ padding: '30px 0px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <h1>Product Page</h1>
      </div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {listProduct.map((item, index) => (
          <Col span={4}  key={index} onClick={() => { console.log(123) }} >
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src={item.image} />}
            >
              <Meta title={item.name}  />
              {item.price ?
                <div style={{ fontSize: '25px', fontWeight: 'bold' , color:'darkred' }}>
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
