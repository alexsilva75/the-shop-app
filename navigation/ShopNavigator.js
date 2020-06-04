import 'react-native-safe-area-context'
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'

import Colors from '../constants/Colors'

const defaultNavOptions = {
    
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }


const ProductsNavigator = createStackNavigator({
    ProductOverview: {
        screen: ProductOverviewScreen

    },
    ProductDetail: {
        screen: ProductDetailScreen
    },
    Cart: CartScreen

},
   {
        // navigationOptions must only be used when the navigator is used as a screen
        // in another navigator
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons 
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                size={23}
                color={drawerConfig.tintColor}
                /> 
        },
        defaultNavigationOptions: defaultNavOptions
    }
)


const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},
    {
        // navigationOptions must only be used when the navigator is used as a screen
        // in another navigator
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons 
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'} 
                size={23}
                color={drawerConfig.tintColor}
                /> 
        },
        defaultNavigationOptions: defaultNavOptions
    }
)

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator
},{
    contentOptions: {
        activeTintColor: Colors.primaryColor
    }
}
)

export default createAppContainer(ShopNavigator)