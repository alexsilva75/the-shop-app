import Product from "../../models/product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'PRODUCT_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
    return async dispatch => {
        try {
            // any async code you want!
            const response = await fetch('https://rn-complete-guide-86f0c.firebaseio.com/products.json')

            if (!response.ok) {
                throw new Error('Something went wrong.')
            }

            const resData = await response.json()

            const loadedProducts = []

            for (key in resData) {
                loadedProducts.push(
                    new Product(key,
                        'u1',
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    )
                )
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProducts })
        } catch (err) {
            throw err
        }
    }
}

export const deleteProduct = productId => {
    return async dispatch => {
        const response = await fetch(
            `https://rn-complete-guide-86f0c.firebaseio.com/products/${productId}.json`,
            {
                method: 'DELETE',               
            }
        )

        if(!response.ok){
            throw new Error('Something went wrong!')
        }

        dispatch({ type: DELETE_PRODUCT, pid: productId })
    }

}

export const createProduct = ({ title, description, imageUrl, price }) => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch('https://rn-complete-guide-86f0c.firebaseio.com/products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        })

        const resData = await response.json()

        console.log(resData)

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        })
    }

}

export const updateProduct = ({ id, title, description, imageUrl }) => {
    return async dispatch => {
        const response = await fetch(
            `https://rn-complete-guide-86f0c.firebaseio.com/products/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                })
            })

            if(!response.ok){
                throw new Error('Something went wrong!')
            }

        dispatch({ type: UPDATE_PRODUCT, productData: { id, title, description, imageUrl } })
    }
}