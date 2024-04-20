import { useEffect, useState } from "react";
import { callFetchAllProduct } from "../../services/productApi";
import { Card, Col, Row, Tabs, Select } from "antd";
import { useNavigate } from 'react-router-dom';
import SpinLoading from "../../components/spinLoading/SpinLoading";
import './style.scss';
import { callFetchAllCategory } from "../../services/categoryApi";

const { Meta } = Card;
const { Option } = Select;
const items = [
    {
      key: 'listProductToSold',
      label: 'Phổ biến',
      children: <></>,
    },
    {
      key: 'listProductToUpdateAt',
      label: 'Hàng mới',
      children: <></>,
    },
    {
      key: 'listProductToPrice',
      label: 'Giá thấp đến cao',
      children: <></>,
    },
    {
      key: 'listProductToPriceReverse',
      label: 'Giá cao đến thấp',
      children: <></>,
    },
  ];

const ProductPage = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [sortedProduct, setSortedProduct] = useState([]);
  const [sortQuery, setSortQuery] = useState('listProductToSold');
  const [brandFilter, setBrandFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const [listBrand , setListBrand] = useState([])
  useEffect(()=>{
    const fetchBrand = async() => {
      const res =  await callFetchAllCategory()
      setListBrand(res.data.data)
    }
    fetchBrand()
  },[])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await callFetchAllProduct();
        if (res.data) {
          setLoading(true)
            setListProduct(res.data);
          setLoading(false);
        } else {
          console.log('Có lỗi xảy ra');
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (listProduct.length > 0) {
      let sortedList = [...listProduct];
      switch (sortQuery) {
        case 'listProductToSold':
          sortedList.sort((a, b) => b.sold - a.sold);
          break;
        case 'listProductToUpdateAt':
          sortedList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          break;
        case 'listProductToPrice':
          sortedList.sort((a, b) => a.price - b.price);
          break;
        case 'listProductToPriceReverse':
          sortedList.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      if (brandFilter) {
        sortedList = sortedList.filter(product => product.brand === brandFilter);
      }
        setSortedProduct(sortedList);
    }
  }, [listProduct, sortQuery, brandFilter]);

  const handleNavigateProductDetail = (productId) => {
      navigate(`${productId}`);
  };

  if (loading) {
    return <SpinLoading />;
  }
  

  return (
    <div className="product-container">
      <Row gutter={50}>
        <Col span={24} style={{ display: 'flex', width: '100%', flexWrap: 'wrap' }}>
          <Row>
     
            <Tabs defaultActiveKey="1" items={items} onChange={(value) => setSortQuery(value)} />
              <Select defaultValue="" style={{ width: 170 , margin:'7px 0 0 20px' }} onChange={(value) => setBrandFilter(value)}>
                <Option value="">Tất cả thương hiệu</Option>
                {listBrand.map((item, index)=>{
                 return(
                  <Option key={index} value={item.brand}>{item.brand}</Option>
                 )
                })}
              </Select>
    
          </Row>
          <Row gutter={10}>
            {sortedProduct.map((item, index) => (
              <Col xs={12} sm={8} md={6} lg={6} xl={4} xxl={4} className="item" key={index} onClick={() => { handleNavigateProductDetail(item._id) }}>
                <Card
                  hoverable
                  style={{
                    width: '100%',
                  }}
                  cover={<img alt="example" src={item.image} />}
                >
                  <Meta className="name" title={item.name} />
                  {item.price ?
                    <div className="price">
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
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;
