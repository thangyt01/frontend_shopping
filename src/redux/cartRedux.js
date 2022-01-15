import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products: [],
        quantity: 0,
        total:0, 
    },
    reducers:{
        addProduct: (state, action)=>{
            state.quantity +=1
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        },
        updateProduct: (state, action)=>{
            state.total += state.products[action.payload.index].price * (action.payload.quantity - state.products[action.payload.index].quantity)
            state.products[action.payload.index].quantity = action.payload.quantity
            console.log(state.products[action.payload.index].quantity)
            console.log(state.total)
        },
        removeProduct: (state, action)=>{
            state.total -= state.products[action.payload.index].price * state.products[action.payload.index].quantity
            state.products.splice(action.payload.index, 1)
            state.quantity -=1
        },
        removeCart: (state)=>{
            state.products = []
            state.quantity = 0
            state.total = 0
        }
    }
})

export const {addProduct, removeCart, updateProduct, removeProduct} = cartSlice.actions
export default cartSlice.reducer;