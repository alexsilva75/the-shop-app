import React, {useEffect, useState} from 'react'
import { View, FlatList, Text, Platform, ActivityIndicator, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import {fetchOrders} from '../../store/actions/orderActions'
import  Colors from '../../constants/Colors'

const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false)

    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    useEffect(()=>{
        setIsLoading(true)
        dispatch(fetchOrders()).then( () => setIsLoading(false))
    },[dispatch])

    if(isLoading){
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primaryColor}/>
            </View>
        )
    }

    if(orders.length === 0){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>No orders found!</Text>
            </View>
        )
    }

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={orders}
            renderItem={(itemData) => (
                <OrderItem
                    sum={itemData.item.totalSum}
                    date={itemData.item.date}
                    items={itemData.item.items}
                />
            )}
        />
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

OrdersScreen.navigationOptions = navData => {
    const { navigation } = navData
    return {
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item tittle='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navigation.toggleDrawer()} />
            </HeaderButtons>
        )
    }
}


export default OrdersScreen
