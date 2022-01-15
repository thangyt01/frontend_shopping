import { Add, Remove } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Narbar from '../components/Narbar'
import NarbarUser from '../components/NavbarUser'
import NewSletter from '../components/NewSletter'
import {mobile} from '../resposive'
import {useLocation} from 'react-router-dom'
import { publicRequest } from '../RequestMethod'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

const Container = styled.div`
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
    ${mobile({ height: "40vh" })}
`;

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection:"column" })}
`
const ImgContainer = styled.div`
    flex: 1;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    font-weight: 500;
`
const Desc = styled.p`
    margin: 20px 0px;
`
const Price = styled.div`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
    display: flex;
    align-items: center;
`;

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: 1px solid black;
`;

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    
`;

const FilterSizeOption = styled.option`
`;

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`;
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`;
const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover{
        background-color: #f8f4f4;
    }
`;

const Product = () => {
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("Black");
    const [size, setSize] = useState(null);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user.currentUser)

    const handleQuantity = (option) => {
        if (option === "remove") {
            setQuantity(quantity > 1 ? quantity - 1 : 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleClick = () => {
        dispatch(addProduct({ ...product, quantity, color, size }))
    };
    
    const location = useLocation()
    const id = location.pathname.split('/')[2]
    const [product, setProduct] = useState({})

    useEffect(()=>{
        const getProduct = async()=>{
            try{
                const res = await publicRequest.get("/products/find/" + id)
                setProduct(res.data)
            }catch(e){

            }
        }
        getProduct();
    },[id])

    useEffect(() => {
        document.documentElement.scrollTop = 0
    }, [])

    document.title = product.title
    return (
        <Container>
            {user ? <NarbarUser/> : <Narbar/>}
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color ? product.color.map((c) =>(
                                <FilterColor color={c} key={c} onClick={()=>setColor(c)} />
                            )): true}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e)=>setSize(e.target.value)}>
                                <FilterSizeOption key="mkk">Size</FilterSizeOption>
                                {product.size ? product.size.map((s) =>(
                                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                                )): true}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>handleQuantity('remove')}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=>handleQuantity('add')}/>
                        </AmountContainer>
                        <Button onClick={handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <NewSletter/>
            <Footer/>
        </Container>
    )
}

export default Product