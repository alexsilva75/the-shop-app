import PRODUCTS from '../../data/dummy-data'
import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/productActions'
import Product from '../../models/product'
const INITIAL_STATE = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const productReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }

        }
        case DELETE_PRODUCT: {
            
            state.userProducts.forEach(prod => {
                console.log(prod.title, ' ', prod.id)
            }
            )

            const updatedProducts = state.userProducts.filter(prod => prod.id != action.pid)
            console.log('Filtered Products: ')
            updatedProducts.forEach(prod => {
                console.log(prod.title, ' ', prod.id)
            }
            )

            return {
                ...state,
                userProducts: state.userProducts.filter(prod => prod.id != action.pid),
                availableProducts: state.availableProducts.filter(prod => prod.id != action.pid)
            }

        }

        case CREATE_PRODUCT: {
                        
            const newProduct = new Product(
                action.productData.id,
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price
            )

            return {...state, 
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)}
        }

        case UPDATE_PRODUCT: {
            console.log('Updating a product: '+ action.productData.id)
            const productIndex = state.userProducts.findIndex(
                    prod => prod.id === action.productData.id)
           
            console.log('Product Index: '+ productIndex)
            console.log('Product Title: '+ action.productData.title)
            console.log('Product Owner Id: '+state.userProducts[productIndex].ownerId)

            const updatedProduct = new Product(
                action.productData.id,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price
            )

            console.log('Updated Product Title: '+updatedProduct.title)

            const updatedUserProducts = [...state.userProducts] //cria uma nova referencia
            updatedUserProducts[productIndex] = updatedProduct

            const availableProductIndex = state.availableProducts.findIndex(
                prod => prod.id === action.productData.id)

            const updatedAvailableProducts = [...state.availableProducts]

            updatedAvailableProducts[availableProductIndex] = updatedProduct

            return {
                ...state, 
                userProducts: updatedUserProducts, 
                availableProducts: updatedAvailableProducts
            }

        }

    }

    return state
}

export default productReducer