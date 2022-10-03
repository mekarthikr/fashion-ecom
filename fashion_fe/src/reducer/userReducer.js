import * as types from '../action/actionType'

const initialState = {
    users: [],
    user: {},
    togglecart:false,
    loading: true
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_USER:
            console.log('payload',action.payload)
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            }
        case types.UPDATE_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case types.TOGGLE_CART:
            return{
                ...state,
                togglecart:action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default userReducer



