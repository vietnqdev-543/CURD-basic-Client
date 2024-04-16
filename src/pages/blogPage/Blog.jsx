import React, { useEffect, useState } from 'react'
import './style.scss'
import { callFetchAllProduct } from '../../services/productApi'
const Blog = () => {
  const [listProduct, setListProduct] = useState([])
  const [listProductToPrice, setListProductToPrice] = useState([])
  const [listProductToDate, setListProductToDate] = useState([])
  useEffect(() => {
    handlefetchProduct()
    console.log(listProduct)
  }, [])
  const handlefetchProduct = async () => {
    const res = await callFetchAllProduct()
    if (res && res.data) {
      setListProduct(res.data)
      console.log(res.data)
      const filterToPrice = [...res.data].sort((a, b) => b.price - a.price)
      setListProductToPrice(filterToPrice)
      const filterToDate = [...res.data].sort((a, b) => a.createdAt - b.createdAt)
      setListProductToDate(filterToDate)
    }
  }
  return (
    <div >


      <div >
        <h1>List Product</h1>
        {listProduct.map((item, index) => {
          return (
            <div key={index}>
              <div>{item.name} : <span style={{ color: 'red' }}>{item.price}</span> : <span style={{ color: 'red' }}>{item.createdAt}</span> </div>
            </div>
          )
        })}
      </div>
      <div>
        <h1>ListProduct for price</h1>
        {listProductToPrice.map((item, index) => {
          return (
            <div key={index}>{item.name} : <span style={{ color: 'red' }}>{item.price} </span> </div>
          )
        })}
      </div>

      <div>
        <h1>ListProduct for price</h1>
        {listProductToDate.map((item, index) => {
          return (
            <div key={index}>{item.name} : <span style={{ color: 'red' }}>{item.createdAt} </span> </div>
          )
        })}
      </div>

    </div>

  )
}

export default Blog