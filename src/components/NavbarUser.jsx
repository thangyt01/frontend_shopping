import React, { useState } from 'react'
import styled from 'styled-components'
import {Search, ShoppingCartOutlined } from '@mui/icons-material'
import { Badge } from '@mui/material'
import {mobile} from '../resposive'
import {useSelector} from 'react-redux'
import {
    Link
  } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


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
const MenuItemU = styled.div`
    font-sized: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "3px" })}
`


const NarbarUser = () => {
    const [keyword, setKeyword] = useState('')
    const quantity = useSelector(state=>state.cart.quantity);
    const user = useSelector((state) => state.user.currentUser)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                    <p onClick={handleClick}>Hello, {user.username}</p>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>
                            <Link to='/logout' style={{textDecoration: 'none',}}>
                                <MenuItemU style={{marginLeft: '0', color:'black'}}>Log out</MenuItemU>
                            </Link>
                        </MenuItem>
                    </Menu>
                    <Link to='/cart'>
                        <MenuItemU>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined color="action" />
                            </Badge>
                        </MenuItemU>
                    </Link>
                </Right>
            </Wrapper>
        </Container>
    )
}

export default NarbarUser
