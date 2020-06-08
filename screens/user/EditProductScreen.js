import React, {
    //useState, 
    useEffect,
    useCallback,
    useReducer
} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    View,
    ScrollView,
    Platform,
    Alert,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import { createProduct, updateProduct, deleteProduct } from '../../store/actions/productActions'
import Input from '../../components/UI/Input'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }

        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }

        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }

        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }//FORM_INPUT_UPDATE

    return state
}

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId))

    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        formIsValid: editedProduct ? true : false
    })

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong input!',
                'Please check the errors in the form.',
                [
                    { text: 'Okay' }
                ])
            return
        }

        if (editedProduct) {
            dispatch(updateProduct({
                id: prodId,
                title: formState.inputValues.title,
                imageUrl: formState.inputValues.imageUrl,
                description: formState.inputValues.description
            }))
        } else {
            dispatch(createProduct({
                title: formState.inputValues.title,
                imageUrl: formState.inputValues.imageUrl,
                price: +formState.inputValues.price,
                description: formState.inputValues.description
            }))
        }
        props.navigation.goBack()
    }, [dispatch, prodId, formState])

    useEffect(() => {
        props.navigation.setParams({ 'submit': submitHandler })
    }, [submitHandler])


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView 
        style={{flex: 1}} 
        behavior='padding' 
        // keyboardVerticalOffset={20}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valide title.'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Image URL'
                        errorText='Please enter a valide image URL.'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />

                    {editedProduct ? null : (
                        <Input
                            id='price'
                            label='Price'
                            errorText='Please enter a valide price.'
                            keyboardType='decimal-pad'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />
                    )}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description.'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    form: {
        margin: 20,
    }

})

EditProductScreen.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item tittle='Save'
                    iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                    onPress={submitFunction} />
            </HeaderButtons>
        )
    }
}


export default EditProductScreen