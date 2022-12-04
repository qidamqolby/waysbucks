import React from "react"
import {createContext, useReducer} from 'react'
export const UserContext = createContext()

const defaultState = {
    isLogin: false,
    user: {},
    cart: {}
}

function reducer(user, action) {
    const { type, payload } = action

    switch (type) {
        case 'USER_SUCCESS':
        case 'LOGIN_SUCCESS':
            localStorage.setItem("token", payload.token);
            return {
                isLogin: true,
                user: payload
            };
        case 'ADD_CART_SUCCESS':
            return{
                cart: {}
            };
        case 'AUTH_ERROR':
        case 'LOGOUT':
            localStorage.removeItem("token");
            return {
                isLogin: false,
                user: {}
            }
        default: throw new Error()
    }
}

export function UserContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, defaultState)

    return (
        <UserContext.Provider value={ [state, dispatch] }>
            { children }
        </UserContext.Provider>
    )
}
