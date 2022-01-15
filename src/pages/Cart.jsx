import { Add, Remove } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Narbar from '../components/Narbar'
import {mobile} from '../resposive'
import { useSelector } from 'react-redux'
import StripeCheckout from "react-stripe-checkout"
import {userRequest} from '../RequestMethod'
import { useNavigate, Link } from 'react-router-dom'
import NarbarUser from '../components/NavbarUser'
import { useDispatch } from 'react-redux'
import { updateProduct, removeProduct } from '../redux/cartRedux'

const KEY = 'pk_test_51K3JNMEGdSbYRQwvlh50XrGEorS6JT2M9gJwmacd3ECQRIETcf0FW8ud33DxORh2SQZJken0VlzMzf57JZKiOjzI00QqJZS3Lu'

const Container = styled.div`
`

const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${(props) => props.type === "filled" && "none"};
    background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
    color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2.5;
    display: flex;
`;

const Image = styled.img`
    width: 200px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`;

const Summary = styled.div`
    flex: 1;
`;
const SummaryTitle = styled.h1`
    font-weight: 200;
`;

const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
`;

const RemoveProduct = styled.div`
    flex: 0.2;
`;

const RemoveButton = styled.div`
    padding: 8px;
    font-weight: 600;
    cursor: pointer;
    border: black 2px solid;
    background-color: transperent;
    text-align: center;
    font-size: 12px;
    height: 10px;
    width: 20px;
    &:hover{
        background-color: #e60023;
        color: white;
        border: #e60023 2px solid;
    }
`;

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    let navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser)
    const onToken = (token)=>{
        setStripeToken(token)
    }
    useEffect(() => {
        const makeRequest = async()=>{
            try{
                const res = await userRequest.post("/checkout/payment",{
                    tokenId: stripeToken.id,
                    amount: 500,
                })
                navigate('/success',{
                    stripeData: res.data
                })
            }catch (e){}
        }
        stripeToken && makeRequest()
    }, [stripeToken, cart.total, navigate])
    
    const handleClick = (index, type) => {
        let quantity = cart.products[index].quantity
        if(type === 'remove'){
            console.log('remove')
            if(quantity > 1) quantity--
        }
        if (type === 'add'){
            console.log('add')
            quantity++
        }
        dispatch(updateProduct({ ...cart.products[index], index, quantity}))
    };

    const handleRemove = (index) => {
        dispatch(removeProduct({index}))
    };

    return (
        <Container>
            {user ? <NarbarUser/> : <Narbar/>}
            <Announcement/>
            <Wrapper>
                <Title>YOUR BAG</Title>
                <Top>
                    <Link to='/products'>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                    </Link>
                    <TopTexts>
                        <TopText>Shopping Bag(2)</TopText>
                        <TopText>Your Wishlist (0)</TopText>
                    </TopTexts>
                    <TopButton type="filled">CHECKOUT NOW</TopButton>
                </Top>
                <Bottom>
                    <Info>
                        {cart.products.map((product, index)=>(
                        <div key ={index}>
                            <Product key ={product}>
                                <ProductDetail>
                                    <Image src={product.img} />
                                    <Details>
                                        <ProductName>
                                            <b>Product:</b> {product.title}
                                        </ProductName>
                                        <ProductId>
                                            <b>ID:</b> {product._id}
                                        </ProductId>
                                        <ProductColor color={product.color} />
                                        <ProductSize>
                                            <b>Size:</b> {product.size}
                                        </ProductSize>
                                    </Details>
                                </ProductDetail>
                                <PriceDetail>
                                    <ProductAmountContainer>
                                        <Remove onClick ={()=>handleClick(index, 'remove')}/>
                                        <ProductAmount>{product.quantity}</ProductAmount>
                                        <Add onClick ={()=>handleClick(index, 'add')}/>
                                    </ProductAmountContainer>
                                    <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                </PriceDetail>
                                <RemoveProduct onClick={()=>handleRemove(index)}>
                                    <RemoveButton>X</RemoveButton>
                                </RemoveProduct>
                            </Product>
                            <Hr/>
                        </div>
                        ))}
                    </Info>
                    <Summary>
                        <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                        <SummaryItem>
                            <SummaryItemText>Subtotal</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Estimated Shipping</SummaryItemText>
                            <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem>
                            <SummaryItemText>Shipping Discount</SummaryItemText>
                            <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                        </SummaryItem>
                        <SummaryItem type="total">
                            <SummaryItemText>Total</SummaryItemText>
                            <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                        </SummaryItem>
                        <StripeCheckout
                            name="Đặng Shop"
                            image="https://scontent.fhan4-1.fna.fbcdn.net/v/t39.30808-6/250384275_3005461373060797_9052031117227489754_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=wMp4GGrDSNUAX9pj908&_nc_ht=scontent.fhan4-1.fna&oh=c8870155884e671973093255e9b0ac24&oe=61B4155A"
                            billingAddress
                            shippingAddress
                            description={`Your total is $${cart.total}`}
                            amount={cart.total * 100}
                            token={onToken}
                            stripeKey={KEY}
                        >
                            <Button>CHECKOUT NOW</Button>
                        </StripeCheckout>
                    </Summary>
                </Bottom>
            </Wrapper>
            <Footer/>
        </Container>
    )
}

export default Cart
