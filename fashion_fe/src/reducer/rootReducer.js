import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
    userData: userReducer,
    productData: productReducer
})

export default rootReducer