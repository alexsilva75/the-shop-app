import {AUTHENTICATE, LOGOUT} from "../actions/authActions"

const INITIAL_STATE = {
    token: null,
    userId: null
}

export default (state = INITIAL_STATE, action) => {

    switch(action.type){
        // case SIGNUP: {
        //     return {
        //         token: action.token,
        //         userId: action.userId
        //     }
        // }
        case AUTHENTICATE: {
            return {
                token: action.token,
                userId: action.userId
            }
        }

        case LOGOUT: {
            return INITIAL_STATE
        }
    }//switch


    return state
}