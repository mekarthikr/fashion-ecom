import axios from 'axios'
import * as types from './actionType'

const userAdded = (payload) => ({
    type: types.ADD_USER,
    payload: payload
})

const userUpdate = (payload) => ({
    type: types.UPDATE_USER,
    payload: payload
})

const productSize = (payload) => ({
    type: types.GET_PRODUCT_SIZE,
    payload: payload
})

const productCategory = (payload) => ({
    type: types.GET_PRODUCT_CATEGORY,
    payload: payload
})

const productType = (payload) => ({
    type: types.GET_PRODUCT_TYPE,
    payload: payload
})

const setImage = (payload) => ({
    type: types.SET_IMAGE_URL,
    payload: payload
})

// const productAdded = () => ({
//     type: types.ADD_PRODUCT
// })

const getProducts = (payload) => ({
    type: types.GET_PRODUCTS,
    payload: payload
})

const removeProductFromCart = () => ({
    type: types.REMOVE_FROM_CART,
})


export const    toggleCart = (payload) => ({
    type: types.TOGGLE_CART,
    payload: payload
})

const productList = (payload) => ({
    type: types.GET_ALL_PRODUCTS,
    payload: payload
})
const pagination = (payload) => ({
    type : types.HANDLE_PAGINATION,
    payload: payload
})


const addToCart = () => ({
    type: types.ADD_CART_PRODUCT
})

const getMyProduct = (payload) => ({
    type: types.CART_PRODUCT,
    payload: payload
})

const getSingleProduct = (payload) => ({
    type: types.GET_PRODUCT,
    payload: payload
})

const simpleProduct = (payload) => ({
    type: types.GET_SIMPLE_PRODUCT,
    payload: payload
})

export const resetImage = () => ({
    type: types.RESET_PRODUCT_IMAGE,
})


export const setPageNumber = (payload) => ({
    type: types.MANAGE_PAGE_NUMBER,
    payload:payload
})

export const setItemsPerPage = (payload) => ({
    type: types.MANAGE_ITEMS_PER_PAGE,
    payload:payload
})


export const registerRetailer = (retailer) => {
    console.log("action call", retailer)
    return function (dispatch) {
        axios.post('http://localhost:8000/users/login', retailer, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then((res) => {
                dispatch(userAdded(res.data.user))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const updateUser = (retailer, id) => {
    console.log("action call", retailer, id)
    return function (dispatch) {
        axios
            .put(`http://localhost:8000/users/${id}`, retailer, {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                }
            })
            .then((res) => {
                // dispatch(userAdded())
                // console.log("user",res.data)
                dispatch(userUpdate(res.data.user))

            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getProductSize = () => {
    return function (dispatch) {
        axios
            .get('http://localhost:8000/products/product-size')
            .then((res) => {
                console.log("product size data : ", res.data.productSize)
                dispatch(productSize(res.data.productSize))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getProductCategory = () => {
    return function (disapatch) {
        axios
            .get('http://localhost:8000/products/product-category')
            .then((res) => {
                disapatch(productCategory(res.data.productCategory))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getProductType = () => {
    return function (disapatch) {
        axios
            .get('http://localhost:8000/products/product-type')
            .then((res) => {
                disapatch(productType(res.data.productType))
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const setProductImage = (image) => {
    console.log("In set product image", image.name);
    return function (disapatch) {
        const formData = new FormData()
        formData.append('image-upload', image, image.name)

        axios
            .post('http://localhost:8000/products/uploadImage', formData)
            .then((res) => {
                disapatch(setImage(res.data))
            })
            .catch(err => {
                console.log(err)
            })
    }
}



export const editProduct = (product, productid) => {
    console.log("dispatch")
    return function (disapatch) {
        axios
            .put(`http://localhost:8000/products/${productid}`, product)
            .then((res) => {
                console.log("success",res.data.product)
            })
            .catch(err => {
                console.log("ADD product error" + err)
            })
    }
}


export const updateInventory = (productid, variation) => {
    console.log("dispatch")
    return function (disapatch) {;
        axios
            .put(`http://localhost:8000/products/${productid}`, variation)
            .then((res) => {
                console.log("success",res.data.product)
            })
            .catch(err => {
                console.log("ADD product error" + err)
            })
    }
}




export const uploadProduct = (productDetails, socket) => {
    console.log("dispatch",productDetails,socket)
    return function (disapatch) {
        axios
            .post('http://localhost:8000/products/add-product', productDetails)
            .then((res) => {
                console.log("success",res.data.product)
                res.data.product && socket.emit("sendNotification", {
                    product: res.data.product
                })
            }
            // return true 
            )
            .catch(err => {
                console.log("ADD product error" + err)
                // err && socket.emit("sendErrorOnAddProduct", {
                //     error: err
                // })
            })
    }
}

export const changeStatus = (productid,retailerId) => {
    console.log("dispatch",productid)
    return function (disapatch) {
        console.log("called",productid)
        axios
            .put(`http://localhost:8000/products/${productid}`)
            .then((res) => {
                console.log(res.data.message)
            //    disapatch(retailerProductList(retailerId))
            })
            .catch(err => {
                console.log("ADD product error" + err)
            })
    }
}

export const getAllProducts = (retailerId) => {
    console.log("RETAILER ID IN ACTION : ", retailerId);
    return function (disapatch) {
        axios
            .post('http://localhost:8000/products', retailerId)
            .then((res) => {
                console.log("response : ", res.data.products)
                disapatch(getProducts(res.data.products))
            })
    }
}


export const getSimpleProducts = (retailerId) => {
    console.log("RETAILER ID IN ACTION : ", retailerId);
    return function (disapatch) {
        axios
            .post('http://localhost:8000/products/get-simple-products', retailerId)
            .then((res) => {
                console.log("response : ", res.data.simpleProduct)
                disapatch(getProducts(res.data.simpleProduct))
            })
    }
}



export const retailerProductList = (retailerid) => {
    console.log("ALL PRODUCTS IN STOCK : ");
    return function (disapatch) {
        axios
            .post('http://localhost:8000/products/',retailerid)
            .then((res) => {
                console.log("response : for retailer")
                disapatch(productList(res.data.products))
            })
    }
}


export const productlist = () => {
    console.log("ALL PRODUCTS IN STOCK : ");
    return function (disapatch) {
        axios
            .post('http://localhost:8000/products/')
            .then((res) => {
                console.log("response : ", res.data.products)
                disapatch(productList(res.data.products))
            })
    }
}

export const addProductToCart = (productId, userID) => {
    console.log("AddProductToCart", productId);
    return function (disapatch) {
        axios
            .post(`http://localhost:8000/cart/${productId}/${userID}`)
            .then((res) => {
                console.log("res add", res.data);
                disapatch(addToCart())
            })
            .catch((err) => {
                console.log("err" + err);
            })
    }
}

export const cartProduct = (userID) => {
    console.log("Cart Product", userID)
    return function (disapatch) {
        axios
            .get(`http://localhost:8000/cart/${userID}`)
            .then((res) => {
                console.log("resx n---------------------------------------------", res.data);
                disapatch(getMyProduct(res.data.userCart))
            })
            .catch((err) => {
                console.log("err", err);
            })
    }
}

export const updateQuantity = (product, userID) => {
    return function (disapatch) {
        axios
            .put(`http://localhost:8000/cart/${product}/${userID}`)
            .then((res) => {
                disapatch(addToCart())
            })
    }

}

export const removeFromCart = (cart) => {
    console.log(cart);
    return function (disapatch) {
        axios
            .delete(`http://localhost:8000/cart/${cart._id}`)
            .then((res) => {
                disapatch(removeProductFromCart())
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

}

export const individualProduct = (id) => {
    return function (dispatch) {
        axios
            .get(`http://localhost:8000/products/${id}`)
            .then((res) => {
                console.log("THIS is response : " + JSON.stringify(res.data.getProduct));
                console.log("THIS is response : " + res.data.getProduct);
                dispatch(getSingleProduct(res.data.getProduct))
            })
            .catch((err) => {
                console.log("err", err);
            })
    }
}

export const getSimpleProduct = (retailerId) => {
    return function (dispatch) {
        axios
            .post('http://localhost:8000/products/simple-product', retailerId)
            .then((res) => {
                console.log("simple product : ", res.data.simpleProduct)
                dispatch(simpleProduct(res.data.simpleProduct))
            })
            .catch((err) => {
                console.log(err)
            })
    }
}



// outOfStockProducts


export const filterProducts = (filter,retailerid) => {
    console.log("dispatch",filter)
    console.log("ALL PRODUCTS IN STOCK : ");
    // filter.search="peter"
    return function (disapatch) {
        axios
            .post(`http://localhost:8000/products/filter?outofstock=${filter.stock}&category=${filter.category}&search=${filter.search}&sortby=${filter.sort}&orderby=${filter.order}&page=${filter.currentPage}&limit=${filter.limit}`,retailerid)
            .then((res) => {
                console.table("response : ", res.data.products)
                disapatch(productList(res.data.products))
                disapatch(pagination(res.data.pagination))
            })
    }
}



export const searchProducts = (items) => {
    console.log("IN search products");
    return function(disapatch) {
        axios
            .post(`http://localhost:8000/products/`, items)
            .then((res) => {
                console.log("Response" +JSON.stringify(res.data));
                // disapatch(productList(res.data.resultProduct))
                disapatch(productList(res.data.products))
            })
            .catch((err)=>{
                console.log("error",err);
            })
    }
}




