import React from 'react'
import { View, Text, FlatList, Button, StyleSheet } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import { removeFromCart } from '../../store/actions/cartActions'
import {addOrder} from '../../store/actions/orderActions'


const CartScreen = props => {
    const cartTotalSum = useSelector(state => state.cart.totalSum)
    const cartItems = useSelector(state => {
        const transformedCartItems = []
        const items = state.cart.items
        for (const key in items) {
            transformedCartItems.push({
                productId: key,
                productTittle: items[key].productTitle,
                productPrice: items[key].productPrice,
                quantity: items[key].quantity,
                sum: items[key].sum
            })
        }//for
        return transformedCartItems.sort((a, b) => (
            a.productId > b.productId ? 1 : -1
        )
        )

    })

    const dispatch = useDispatch()

    const onRemoveHandler = productId => {
        dispatch(removeFromCart(productId))
    }


    const onAddOrderHandler = (items, sum) => {
        dispatch(addOrder(items, sum))
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.sum}>R${cartTotalSum.toFixed(2)}</Text>
                </Text>
                <Button
                    color={Colors.accentColor} title='Order Now'
                    disabled={cartItems.length > 0 ? false : true}
                    onPress={()=> onAddOrderHandler(cartItems, cartTotalSum)}
                />
            </View>
            <FlatList
                keyExtractor={(item) => item.productId}
                data={cartItems}
                renderItem={itemData => <CartItem
                    item={itemData.item}
                    onRemove={() => onRemoveHandler(itemData.item.productId)}
                />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18,

    },
    sum: {
        color: Colors.primaryColor
    }

})

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

export default CartScreen
