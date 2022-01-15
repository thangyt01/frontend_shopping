import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from "../redux/apiCalls"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { removeCart } from '../redux/cartRedux'

const Logout = () => {
    const dispatch = useDispatch()
    logout(dispatch)
    let navigate = useNavigate()
    dispatch(removeCart()) 
    useEffect(() => {
        navigate('/home')
    }, [navigate])
    return (
        <div>
            
        </div>
    )
}

export default Logout
