import React, { useEffect } from 'react'
import {
    View,
    Text,
    Image,
    Button,
    ScrollView,
    StyleSheet
} from 'react-native'

import { useSelector,useDispatch } from 'react-redux'
import Colors from '../../constants/Colors'
import { addToCart } from '../../store/actions/cartActions'

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId')

    const product = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId))


    // useEffect(() => {
    //     props.navigation.setParams({title: product.title})
    // }, [])

    const dispatch = useDispatch()

    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: product.imageUrl }} />
            <View style={styles.actions}>
                <Button color={Colors.primaryColor} title='Add to Cart' 
                onPress={() => dispatch(addToCart(product))} />
            </View>
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans-bold'
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans'
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
})

// ProductDetailScreen.navigationOptions = (navData) => ({
//     headerTitle: navData.navigation.getParam('title')
// })

ProductDetailScreen.navigationOptions = (navData) => ({
    headerTitle: navData.navigation.getParam('productTitle')
})



export default ProductDetailScreen