import 'react-native-safe-area-context'
import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { View, Button, Platform, SafeAreaView } from 'react-native'
import { useDispatch } from 'react-redux'

import { Ionicons } from '@expo/vector-icons'

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'

import Colors from '../constants/Colors'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'

import { logout } from '../store/actions/authActions'


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

const AdminNavigator = createStackNavigator({
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
},
    {
        // navigationOptions must only be used when the navigator is used as a screen
        // in another navigator
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}
            />
        },
        defaultNavigationOptions: defaultNavOptions
    }
)

const ShopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style={{ flex: 1, paddingTop: 24 }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                    <Button
                        title='Logout'
                        color={Colors.primaryColor}
                        onPress={() => {
                            dispatch(logout())
                            //props.navigation.navigate('Auth')
                        }}
                    />
                </SafeAreaView>
            </View>
        )
    }
}
)

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)