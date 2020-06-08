import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

import CartItem from './CartItem'

import Card from '../UI/Card'

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summuary}>
                <Text style={styles.totalSum}>{props.sum.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button
                color={Colors.primaryColor}
                title={showDetails ? "Hide Details" : "Show Details"}
                onPress={() => {
                    setShowDetails(prevState => !prevState)
                }
                }
            />
            {showDetails && (
                <View style={styles.detailItems}>
                    {props.items.map(cartItem => (<CartItem key={cartItem.productId} item={cartItem} />)
                    )}
                </View>
            )}
        </Card>
    )
}

const styles = StyleSheet.create({
    orderItem: {
       
        margin: 20,
        padding: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden'
    },
    summuary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalSum: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailItems: {
        width: '100%'
    }

})

export default OrderItem