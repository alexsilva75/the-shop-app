import React from 'react'
import { View, FlatList, Text, Platform, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders)

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
