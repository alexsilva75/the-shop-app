import {combineReducers} from 'redux'
import productReducer from './productReducer'
import cartReducer from './cartReducer'
import orderReducer from './orderReducer'
import authReducer from './authReducer'

export default combineReducers({
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    auth: authReducer
})