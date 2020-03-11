import axios from "../../axios/api"
import {FIREBASE_SIGN_IN_URL, FIREBASE_SIGN_UP_URL} from "../../configApi"
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes"

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        const { data } = await axios.post( isLogin ? FIREBASE_SIGN_IN_URL : FIREBASE_SIGN_UP_URL, authData )
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(data.idToken))
        dispatch(autoLogout(data.expiresIn))

    }
}

export function autoLogout(expiresIn) {

    return dispatch =>{
        setTimeout(() => {
            dispatch(logout())
        }, expiresIn * 1000)

    }

}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }

}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')

        if(!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }

}

export function authSuccess(token) {

    return {
        type: AUTH_SUCCESS,
        token
    }

}