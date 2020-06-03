import React, { useEffect } from 'react'
import { FlatList, View, Text, Platform, StyleSheet } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem'
import { addToCart } from '../../store/actions/cartActions'



const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts)


    const dispatch = useDispatch()

    const onViewDetailHandler = (productId, productTitle) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: { productId, productTitle }
        })
    }

    const onAddToCartHandler = (product) => {
        dispatch(addToCart(product))
    }

    // useEffect(()=>{
    //     alert('Product Added!')


    // },[products] )

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={products}

            renderItem={itemData =>
                (<ProductItem
                    product={itemData.item}
                    onViewDetail={() => onViewDetailHandler(itemData.item.id, itemData.item.title)}
                    onAddToCart={() => onAddToCartHandler(itemData.item)}
                />)}

        />
    )
}

const styles = StyleSheet.create({})


ProductOverviewScreen.navigationOptions = navData => {


    return {
        headerTitle: 'All Products',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item tittle='Cart' 
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                    onPress={() => navData.navigation.navigate('Cart')}/>
            </HeaderButtons>
        )
    }
}

export default ProductOverviewScreen