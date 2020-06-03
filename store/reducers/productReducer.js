import PRODUCTS from '../../data/dummy-data'

const INITIAL_STATE = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1') 
}

const productReducer =  (state = INITIAL_STATE, action) => {


    return state
}

export default productReducer