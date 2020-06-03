import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cartActions"
import CartItem from '../../models/cart-item'

const INITIAL_STATE = {
    items: {},
    totalSum: 0
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case ADD_TO_CART: {
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            const prodId = addedProduct.id

            if(state.items[prodId]){
                const currentCartItem = state.items[prodId]
                let quantity = currentCartItem.quantity

                const updatedCartItem = new CartItem(
                    quantity + 1,
                    prodPrice,
                    prodTitle,
                    currentCartItem.sum + prodPrice 

                )

                return {...state, 
                        items:{...state.items, [prodId]:updatedCartItem},
                        totalSum: state.totalSum + prodPrice
                    }
            }else{
                const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
                return {...state, 
                        items: {...state.items, [prodId]: newCartItem},
                        totalSum: state.totalSum + prodPrice
                    }
            }

        }

        case REMOVE_FROM_CART: {
            const productId = action.pid

            console.log(`Product Id: ${productId}`)
            console.log(`Item: ${state.items}`)
            const currentCartItem = state.items[productId]
            console.log(currentCartItem)

            const currentQty = currentCartItem.quantity

            let updatedCartItems

            if(currentQty > 1){
                const updatedCartItem = new CartItem(
                                        currentQty -1,
                                        currentCartItem.productPrice,
                                        currentCartItem.productTitle,
                                        currentCartItem.sum - currentCartItem.productPrice
                                        )
                updatedCartItems  = {...state.items, [productId]: updatedCartItem}

                return {...state, 
                        items: updatedCartItems,
                        totalSum: state.totalSum - currentCartItem.productPrice
                    }

            }else{
                updatedCartItems  = {...state.items}
                delete updatedCartItems[productId]
                return {...state, 
                        items: updatedCartItems, 
                        totalSum: state.totalSum - currentCartItem.productPrice 
                    }

            }
        }

        default:
            return state
    }

}