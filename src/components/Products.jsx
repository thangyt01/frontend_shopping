import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from 'axios'

const Container = styled.div`
    display: flex;
    padding: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat, filters, sort}) => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
          try {
            let res = await axios.get(
              cat
                ? `http://localhost:5000/api/products?category=${cat}`
                : "http://localhost:5000/api/products"
            );
            if(res.data.length === 0) res = await axios.get(`http://localhost:5000/api/products/search?keyword=${cat}`)
            setProducts(res.data);
          } catch (err) {}
        };
        getProducts();
      }, [cat]);

    useEffect(() => {
        cat && 
            setFilteredProducts(
                products.filter(item => Object.entries(filters).every(([key,value])=> //lọc ra những product có props như trên
                    item[key].includes(value)
                )
            )
        )    
    }, [products, cat, filters])

    useEffect(()=>{
        if((sort === "newest")) {
            setFilteredProducts((prev) =>
                [...prev].sort((a, b) => (a.createdAt < b.createdAt)? 1 : -1)
            );
            
        } else if ((sort === "asc")) {
            setFilteredProducts(prev=>
                [...prev].sort((a, b) => a.price - b.price)
            );
            console.log(products[0].createdAt + " vs " + products[2].createdAt)
            console.log(products[0].createdAt < products[2].createdAt)
        } else if((sort === "desc")){
            setFilteredProducts(prev=>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    },[sort])
    return (
        <Container>
            {cat ? filteredProducts.map((item) =>(
                <Product item={item} key={item._id}/>
                )): 
                products.slice(0, 20).map((item) =>(
                    <Product item={item} key={item._id}/>
                ))
            }
        </Container>
    )
}

export default Products
