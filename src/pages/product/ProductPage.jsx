import { useEffect, useState } from "react"
import { callCreateProduct, callFetchAllProduct, callFetchUser } from "../../services/api"
import { Button, Card, Col, Row  ,Modal, message} from "antd"
import AddProductModal from "./AddProductModal/AddProductModal"
const {Meta}= Card
const ProductPage = () => {
  const [listProduct, setListProduct] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = async(values)=> {
    const {name , brand, price , description } = values
    const res = await callCreateProduct(values)
    console.log('check' ,res)
   try {
      message.success('Create product Succesfully')
      setIsModalOpen(false)
      window.location.reload();
   } catch (error) {
      message.error(error.message)
      setIsModalOpen(false)
   }
  }

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
      <div style={{padding: '30px 0px' , display:'flex' ,alignItems:'center' , gap:'20px'}}>
        <h1>Product Page</h1>
        <Button onClick={showModal}>Add Product</Button>
      </div>
      <Row >
        {listProduct.map((item, index) => (
          <Col key={index} onClick={()=>{console.log(123)}} span={4}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
              <Meta title={item.name} description = {item.description} />
              {item.price ?
                <Meta style={{fontSize:'30px' , fontWeight:'bold' }} description={`${item.price.toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}`} />
              :
                <Meta description = 'Sold out' />        
              }
            </Card>
          </Col>
        ))}
      </Row>
      <AddProductModal isModalOpen={isModalOpen} handleCancel={handleCancel}  handleSubmit={handleSubmit}/>
    </div>
  )
}

export default ProductPage
