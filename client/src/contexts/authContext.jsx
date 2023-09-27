import { createContext, useContext, useReducer } from "react";
import { toast } from "react-toastify"
import axios from "../axios"

export const authContext = createContext(null)

const initialState = {
    user: null,
    loading: false,
    error: null
}

const reducer = (state, action) => {
    switch(action.type) {
        case "REGISTER_REQ":
            return {
                ...state,
                isLoading: true,
            }
        case "REGISTER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case "REGISTER_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case "LOGIN_REQ":
            return {
                ...state,
                isLoading: true,
            }
        case "LOGIN_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case "LOGIN_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case "LOGOUT_REQ":
            return {
                ...state,
                isLoading: true,
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                isLoading: false,
                user: action.payload
            }
        case "LOGOUT_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const register = async (dispatch, user) => {
    
    try {
        dispatch({ type: "REGISTER_REQ" })

        const config = { headers: { "Content_Type": "application/json" } }

        const { data } = await axios.post("/auth/register", user, config)

        dispatch({
            type: "REGISTER_SUCCESS",
            payload: data.user
        })
        toast.success("Registered successfully")
        
    } catch (error) {
        dispatch({
            type: "REGISTER_FAIL",
            payload: error.response.data.msg
        })
        console.log(error.response.data.msg)
        toast.error("can't register, please check your email")
    }
    
}
export const login = async (dispatch, user) => {
    try {
        dispatch({ type: "LOGIN_REQ" })

        const config = { headers: { "Content_Type": "application/json" } }
        
        const { data } = await axios.post("/auth/login", user, config)
        
        dispatch({
            type: "LOGIN_SUCCESS",
            payload: data.user
        })
        toast.success("Logged in successfully!")
    } catch (error) {
        dispatch({
            type: "REGISTER_FAIL",
            payload: error.response.data.msg
        })
        console.log(error.response.data.msg)
        toast.error("can't login, please check your email and password")
    }
}
export const logout = async (dispatch) => {
    try {
        dispatch({ type: "LOGOUT_REQ" })
        await axios.get("/auth/logout")
        dispatch({ type: "LOGOUT_SUCCESS" })
        toast.success("logged out successfully")
    } catch (error) {
        dispatch({
            type: "LOGOUT_FAIL",
            payload: error.response.data.msg
        })
        console.log(error.response.data.msg)
        toast.error("can't logout, try again")
    }
}

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <authContext.Provider value={{ state, dispatch }}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => useContext(authContext)

export default AuthContextProvider