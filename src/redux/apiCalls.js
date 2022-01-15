import { publicRequest } from "../RequestMethod"
import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux"

export const login = async(dispatch, user)=>{
    dispatch(loginStart())
    try{
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    }catch(e){
        dispatch(loginFailure())
    }
}

export const logout = async(dispatch)=>{
    dispatch(logoutUser())
}