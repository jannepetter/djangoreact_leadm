import axios from "axios"
import { sendError } from "./errorReducer"

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOADING':
            return {
                ...state,
                isLoading: true
            }
        case 'USER_LOADED':
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.data
            }
        case 'LOGOUT':
        case 'AUTH_ERROR':
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                user: null,
                isLoading: false,
                isAuthenticated: false
            }
        case 'REGISTER':
        case 'LOGIN':
            localStorage.setItem('token', action.data.token)
            return {
                ...state,
                token: action.data?.token,
                user: action.data?.user,
                isAuthenticated: true,
                isLoading: false
            }

        default:
            return state
    }
}

export const register = (newuser) => {
    return async (dispatch) => {
        if (!newuser?.password || !newuser?.email || !newuser?.username) {
            dispatch({
                type: 'GETERRORS',
                data: {
                    msg: "kenttä puuttuu",
                    status: "wat?"
                }
            })
            return
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = {
            username: newuser.username,
            password: newuser.password,
            email: newuser.email
        }

        try {
            const ans = await axios.post("api/auth/register", body, config)
            dispatch({
                type: 'REGISTER',
                data: ans.data
            })
        } catch (error) {
            console.log('otetu kiinni errororr error.response.data)', error.response.data)
            dispatch(sendError(error?.response))
            dispatch({
                type: 'AUTH_ERROR'
            })
        }

    }
}

export const login = (username, password) => {
    return async (dispatch) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = {
            username: username,
            password: password
        }

        try {
            const ans = await axios.post("api/auth/login", body, config)
            dispatch({
                type: 'LOGIN',
                data: ans.data
            })
        } catch (error) {
            console.log('otetu kiinni errororr error.response.data)', error.response.data)
            dispatch(sendError(error?.response))
            dispatch({
                type: 'AUTH_ERROR'
            })
        }

    }
}

export const loadUser = () => {
    return async (dispatch) => {
        dispatch({ type: 'USER_LOADING' })

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (token) {
            config.headers['Authorization'] = `Token ${token} `
        }
        try {
            const ans = await axios.get("api/auth/user", config)
            dispatch({
                type: 'USER_LOADED',
                data: ans.data
            })
        } catch (error) {
            console.log('auth reducer, loadUser', error.response)
            dispatch(sendError(error?.response))
            dispatch({
                type: 'AUTH_ERROR'
            })
        }

    }
}
export const logout = (token) => {
    return async (dispatch, getState) => {

        // const token = getState().auth.token
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        if (token) {
            config.headers['Authorization'] = `Token ${token} `
        }
        try {
            const ans = await axios.post("api/auth/logout", null, config)
            console.log(ans, 'logout success')
            dispatch({
                type: 'LOGOUT',
            })
        } catch (error) {
            console.log('auth reducer, logoutUser', error.response)
            dispatch(sendError(error?.response))
            dispatch({
                type: 'AUTH_ERROR'
            })
        }

    }
}

export default authReducer