import * as types from '../action/actionType'

const initialState = {
    products: [],
    product: {},
    productCategory: [],
    productType: [],
    productSize: [],
    productImageUrl: '',
    cart: [],
    simpleProduct: [],
    currentPageNo:1,
    totalPageCount:1,
    itemsPerPage:5,
    loading: true
}

const productReducer = (state = initialState, action) => {
    console.log("product reducer", action.type)
    switch (action.type) {
        case types.REMOVE_FROM_CART:
            return {
                ...state,
                loading: false
            }
        case types.GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case types.GET_SIMPLE_PRODUCT:
            return {
                ...state,
                simpleProduct: action.payload,
                loading: false
            }
        case types.CART_PRODUCT:
            return {
                ...state,
                cart: action.payload,
                loading: false
            }
        case types.ADD_CART_PRODUCT:
            return {
                ...state,
                loading: false
            }
        case types.GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case types.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case types.GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case types.GET_PRODUCT_SIZE:
            return {
                ...state,
                productSize: action.payload,
                loading: false
            }
        case types.GET_PRODUCT_CATEGORY:
            return {
                ...state,
                productCategory: action.payload,
                loading: false
            }
        case types.GET_PRODUCT_TYPE:
            return {
                ...state,
                productType: action.payload,
                loading: false
            }
        case types.SET_IMAGE_URL:
            return {
                ...state,
                productImageUrl: action.payload,
                loading: false
            }
        case types.ADD_PRODUCT:
            return {
                ...state,
                loading: false
            }
        case types.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case types.SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
            case types.RESET_PRODUCT_IMAGE:
                return {
                    ...state,
                    productImageUrl: '',
                    loading: false
                }
        default:
            return state
    }
}

export default productReducer

