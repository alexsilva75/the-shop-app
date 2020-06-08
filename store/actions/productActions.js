export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'PRODUCT_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

export const deleteProduct = productId => {
    console.log('Deleting product: '+ productId)
    return {type: DELETE_PRODUCT, pid: productId}
}

export const createProduct = ({title, description, imageUrl, price}) => {
    console.log('Adding a product....')

    return {type: CREATE_PRODUCT, productData:{title, description, imageUrl, price} }
}

export const updateProduct = ({id, title, description, imageUrl}) => {
    console.log('Updating product....')

    return {type: UPDATE_PRODUCT, productData: {id, title, description, imageUrl}}
}