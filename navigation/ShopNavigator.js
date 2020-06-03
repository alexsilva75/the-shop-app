import 'react-native-safe-area-context'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {Platform} from 'react-native'

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'

import Colors from '../constants/Colors'

const ProductsNavigator = createStackNavigator({
    ProductOverview : {
        screen: ProductOverviewScreen
        
    },
    ProductDetail: {
        screen: ProductDetailScreen
    },
    Cart: CartScreen

},
{defaultNavigationOptions: {
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
}
)


export default createAppContainer(ProductsNavigator)