import React, { useState, useEffect, useCallback } from 'react'
import {
    FlatList,
    Button,
    Platform,
    ActivityIndicator,
    StyleSheet,
    View,
    Text
} from 'react-native'


import { useSelector, useDispatch } from 'react-redux'
import { DrawerActions } from 'react-navigation-drawer'


import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import Colors from '../../constants/Colors'

import ProductItem from '../../components/shop/ProductItem'
import { addToCart } from '../../store/actions/cartActions'
import { fetchProducts } from '../../store/actions/productActions'

const ProductOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const products = useSelector(state => state.products.availableProducts)

    const dispatch = useDispatch()

    const loadProducts = useCallback(async () => {
        setError(null)
        setIsLoading(true)
        try {
            await dispatch(fetchProducts())
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError])

    const {navigation} = props //Avoiding unnecessary re-renderings
    useEffect(() => {
        const willFocusSub = navigation.addListener('willFocus', loadProducts)

        return () => {
            willFocusSub.remove()
        }
    },[loadProducts])


    useEffect(/* You can't use async here*/() => {
        loadProducts()
    }, [dispatch, loadProducts])

    const onViewDetailHandler = (productId, productTitle) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: { productId, productTitle }
        })
    }

    const onAddToCartHandler = (product) => {
        dispatch(addToCart(product))
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred: {error}</Text>
                <Button title='Try again'
                    onPress={loadProducts}
                    color={Colors.primaryColor}
                />
            </View>
        )
    }
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator
                    size='large'
                    color={Colors.primaryColor}
                />
            </View>
        )
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        )
    }

    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            data={products}

            renderItem={itemData =>
                (
                    <ProductItem
                        product={itemData.item}
                        onSelect={() => onViewDetailHandler(itemData.item.id, itemData.item.title)} >
                        <Button
                            color={Colors.primaryColor}
                            title='View Details'
                            onPress={() => onViewDetailHandler(itemData.item.id, itemData.item.title)}
                        />
                        <Button
                            color={Colors.primaryColor}
                            title='To Cart'
                            onPress={() => onAddToCartHandler(itemData.item)}
                        />
                    </ProductItem>
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

ProductOverviewScreen.navigationOptions = navData => {
    const { navigation } = navData

    return {
        headerTitle: 'All Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item tittle='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item tittle='Cart'
                    iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={() => navigation.navigate('Cart')} />
            </HeaderButtons>
        )
    }
}

export default ProductOverviewScreen