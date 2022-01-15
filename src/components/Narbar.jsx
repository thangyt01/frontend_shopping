import React, { useState } from 'react'
import styled from 'styled-components'
import {Search, ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import {mobile} from '../resposive'
import {useSelector} from 'react-redux'
import {
    Link
  } from "react-router-dom";

const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding : '10px 0'})}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    align-items: center;
    display: flex;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`
const Center = styled.div`
    flex: 1;
    text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })};
    cursor: pointer;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`
const MenuItem = styled.div`
    font-sized: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "3px" })}
`


const Narbar = () => {
    const [keyword, setKeyword] = useState('')
    const quantity = useSelector(state=>state.cart.quantity);
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input
                            value={keyword}
                            onChange={(e)=>setKeyword(e.target.value)}
                        />
                        <Link to={'/products/' + keyword}>
                        <Search style = {{color: "gray", fontSize: 16}}/>
                        </Link>
                    </SearchContainer>
                </Left>
                <Link to="/" style={{textDecoration: 'none', color:'black'}}>
                    <Center><Logo >ACRONYM.</Logo></Center>
                </Link>
                <Right>
                    <Link to='/register' style={{textDecoration: 'none', color:'black'}}>
                    <MenuItem>REGISTER</MenuItem>
                    </Link>
                    <Link to='/login' style={{textDecoration: 'none', color:'black'}}>
                    <MenuItem>SIGN IN</MenuItem>
                    </Link>
                    <Link to='/cart'>
                        <MenuItem>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined color="action" />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Narbar
