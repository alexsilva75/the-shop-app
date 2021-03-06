import { AsyncStorage } from 'react-native'
import { exp } from 'react-native-reanimated'
export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT'
import {apiKey} from '../../secret'

let timer

export const authenticate = (userId, token, expiryTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expiryTime))
        dispatch({ type: AUTHENTICATE, userId, token })
    }
    //return { type: AUTHENTICATE, userId, token }
}

export const signup = (email, password) => {
    // console.log('E-mail: ' + email, 'Password: ' + password)

    return async dispatch => {
        //try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )


        if (!response.ok) {
            const errorResponseData = await response.json()
            const errorId = errorResponseData.error.message
            let message = 'Something went wrong!'

            if (errorId === 'EMAIL_EXISTS') {
                message = 'This e-mail already exists!'
            }

            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)

        // dispatch({
        //     type: SIGNUP,
        //     token: resData.idToken,
        //     userId: resData.localId
        // }
        // )
        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            )
        )

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(
            resData.idToken,
            resData.localId,
            expirationDate
        )
        // } catch (err) {
        //     console.log("Error: "+ err)
        // }
    }
}

export const login = (email, password) => {
    // console.log('E-mail: ' + email, 'Password: ' + password)

    return async dispatch => {
        //try {
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        )


        if (!response.ok) {
            const errorResponseData = await response.json()
            const errorId = errorResponseData.error.message
            let message = 'Something went wrong!'

            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This e-mail could not be found!'
            } else if (errorId === 'INVALID_PASSWORD') {
                message = 'Your password is incorrect!'
            }

            throw new Error(message)
        }

        const resData = await response.json()
        console.log(resData)

        // dispatch({
        //     type: LOGIN,
        //     token: resData.idToken,
        //     userId: resData.localId
        // })

        dispatch(
            authenticate(
                resData.localId,
                resData.idToken,
                parseInt(resData.expiresIn) * 1000
            )
        )

        const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000)
        saveDataToStorage(
            resData.idToken,
            resData.localId,
            expirationDate
        )

        // } catch (err) {
        //     console.log("Error: "+ err)
        // }
    }
}

export const logout = () => {
    //return dispatch => {
    clearLogoutTimer()
    AsyncStorage.removeItem('userData')
    //}
    return { type: LOGOUT }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer)
    }

}

const setLogoutTimer = expirationTime => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout())
        }, expirationTime)
    }

}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expiryDate: expirationDate.toISOString()
    }))
}