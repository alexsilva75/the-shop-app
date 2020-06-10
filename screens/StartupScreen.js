import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux' 
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native'
import  Colors  from '../constants/Colors'

import {authenticate} from '../store/actions/authActions'

const StartupScreen = props => {
    const dispatch = useDispatch()


    useEffect(()=>{
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData')

            if(!userData){
                props.navigation.navigate('Auth')
                return 
            }

            const transformedData = JSON.parse(userData)

            const{token, userId, expiryDate } = transformedData
            const expirationDate = new Date(expiryDate)
            
            if(expirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('Auth')
                return 
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime()
            //const expiryTime = expirationTime - new Date().getTime()

            props.navigation.navigate('Shop')
            dispatch(authenticate(userId, token, expirationTime))
        }

        tryLogin()
    }, [dispatch])

    return (
        <View style={styles.centered}>
            <ActivityIndicator size='large' color={Colors.primaryColor} />
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default StartupScreen