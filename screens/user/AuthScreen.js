import React, { useState, useEffect, useCallback, useReducer } from 'react'
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Button,
    ActivityIndicator,
    StyleSheet,
    Alert
} from 'react-native'

import { useDispatch } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient'

import { signup, login } from '../../store/actions/authActions'

import Colors from '../../constants/Colors'
import Input from '../../components/UI/Input'
import Card from '../../components/UI/Card'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }//FORM_INPUT_UPDATE

    return state
}

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const [isSignup, setIsSignup] = useState(false)

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    })

    const dispatch = useDispatch()

    useEffect(()=> {
        if(error){
            Alert.alert('An error occurred!', error, [{text: 'Okay'}])
        }
    },[error])

    const authHandler = async () => {
        let action
        if (isSignup) {
            action =
                signup(
                    formState.inputValues.email,
                    formState.inputValues.password
                )

        } else {
            action =
                login(
                    formState.inputValues.email,
                    formState.inputValues.password
                )

        }

        setError(null)
        setIsLoading(true)
        try{
            await dispatch(action)
            props.navigation.navigate('Shop')
        }catch(err){
            setError(err.message)
            setIsLoading(false)
        }       

    }

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    return (

        <KeyboardAvoidingView
            //behavior='padding'
            //keyboardVerticalOffset={50}
            style={styles.screen}>
            <LinearGradient
                colors={['#ffedff', '#ffe3ff']}
                style={styles.gradient}
            >
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id='email'
                            label='E-mail'
                            keyboardType='email-address'
                            required
                            email

                            autoCapitalize='none'
                            errorText='Please enter a valid email address.'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />
                        <Input
                            id='password'
                            label='Password'
                            keyboardType='default'
                            secureTextEntry
                            required
                            autoCapitalize='none'
                            onInputChange={inputChangeHandler}
                            initialValue=''
                        />

                        <View style={styles.buttonContainer}>
                            {isLoading ? 
                            <ActivityIndicator size='small' color={Colors.primaryColor} /> : 
                            <Button
                                title={isSignup ? 'Sign Up' : 'Login'}
                                color={Colors.primaryColor}
                                onPress={authHandler}
                            />}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={Colors.accentColor}
                                onPress={() => {
                                    setIsSignup(prevState => !prevState)
                                }}
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )

}

AuthScreen.navigationOption = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }

})


export default AuthScreen