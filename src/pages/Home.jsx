import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Footer from '../components/Footer'
import Narbar from '../components/Narbar'
import NewSletter from '../components/NewSletter'
import Products from '../components/Products'
import Sliders from '../components/Sliders'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import NarbarUser from '../components/NavbarUser'

const Home = () => {
    useEffect(() => {
        document.title = "Home"
    }, [])
    const user = useSelector((state) => state.user.currentUser)
    return (
        <div>
            {user ? <NarbarUser/> : <Narbar/>}
            <Announcement/>
            <Sliders/>
            <Categories/>
            <Products/>
            <NewSletter/>
            <Footer/>
        </div>
    )
}

export default Home

