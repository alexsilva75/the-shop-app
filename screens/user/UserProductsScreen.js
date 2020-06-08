import React from 'react'
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native'

import { useSelector, useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import ProductItem from '../../components/shop/ProductItem'

import Colors from '../../constants/Colors'

import { deleteProduct } from '../../store/actions/productActions'

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts)
    const dispatch = useDispatch()

    const editProductHandler = (id) => {

        props.navigation.navigate('EditProduct', {productId: id})
    }

    const deleteHandler = (prodId) => {
        Alert.alert(
            'Are you sure?',
            'Do you really want to delete this item?',
            [
                {text: 'No', style: 'default'},
                {text: 'Yes', style: 'destructive', onPress: () => { dispatch(deleteProduct(prodId))} }
        ]
        )
    }

    return (
        <FlatList
            keyExtractor={item => item.id}
            data={userProducts}
            renderItem={itemData => (
                <ProductItem
                    product={itemData.item}
                    onSelect={() => {editProductHandler(itemData.item.id) }} >
                    <Button
                        color={Colors.primaryColor}
                        title='Edit'
                        onPress={() => {editProductHandler(itemData.item.id) }}
                    />
                    <Button
                        color={Colors.primaryColor}
                        title='Delete'
                        onPress={() => { deleteHandler(itemData.item.id) }}
                    />
                </ProductItem>
            )}
        />
    )
}

const styles = StyleSheet.create({

})

UserProductsScreen.navigationOptions = navData => {



    return {
        headerTitle: 'Your Products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item tittle='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => navData.navigation.toggleDrawer()} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item tittle='Add'
                    iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                    onPress={() => navData.navigation.navigate('EditProduct')} />
            </HeaderButtons>
        )

    }
}

export default UserProductsScreen