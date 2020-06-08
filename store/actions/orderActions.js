import Order from "../../models/order"

export const ADD_ORDER = 'ADD_ORDER'
export const SET_ORDERS = 'SET_ORDERS'

export const fetchOrders = () => {
    return async dispatch => {
        try {
            // any async code you want!
            const response = await fetch('https://rn-complete-guide-86f0c.firebaseio.com/orders/u1.json')

            if (!response.ok) {
                throw new Error('Something went wrong.')
            }

            const resData = await response.json()

            const loadedOrders = []

            for (key in resData) {
                loadedOrders.push(
                    new Order(key,
                        resData[key].cartItems,
                        resData[key].totalSum,
                        new Date(resData[key].date)
                    )
                )
            }
            dispatch({ type: SET_ORDERS, orders: loadedOrders })

        } catch (err) {
            throw err
        }
    }
}

export const addOrder = (cartItems, totalSum) => {
    return async dispatch => {
        const date = new Date()
        // any async code you want!
        const response = await fetch('https://rn-complete-guide-86f0c.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalSum,
                date: date.toISOString()
            })
        })

        if (!response.ok) {
            throw new Error('Something went wrong!')
        }

        const resData = await response.json()

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                sum: totalSum,
                date
            }
        })
    }

}