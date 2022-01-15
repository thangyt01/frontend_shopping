import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Narbar from '../components/Narbar'
import NewSletter from '../components/NewSletter'
import Products from '../components/Products'
import {mobile} from '../resposive'
import { useSelector } from 'react-redux'
import NarbarUser from '../components/NavbarUser'

const Container = styled.div`
`
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    ${mobile({ marginRight: "0px" })}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option`
`

const ProductList = () => {
    const location = useLocation()
    var cat = (location.pathname.split('/')[2])
    if(cat) cat = decodeURIComponent(cat)
    if(cat) document.title = cat
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState("newest")
    const user = useSelector((state) => state.user.currentUser)
    const handleFilters = (e) =>{
        const value = e.target.value;
        setFilters({
            ...filters,
            [e.target.name] : value,
        })
    }

    useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [])
    return (
        <Container>
            <Announcement/>
            {user ? <NarbarUser/> : <Narbar/>}
            <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Product: </FilterText>
                    <Select name = "color" onChange={handleFilters}>
                        <Option disabled>
                            Color
                        </Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select name = "size" onChange={handleFilters}>
                        <Option disabled>
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Product: </FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value = 'newest'>Newest</Option>
                        <Option value = 'asc'>Price (asc)</Option>
                        <Option value = 'desc'>Price (desc)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <NewSletter/>
            <Footer/>
        </Container>
    )
}

export default ProductList
