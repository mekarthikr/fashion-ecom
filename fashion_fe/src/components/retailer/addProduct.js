import React from "react";
import { useState, useEffect } from "react";
import { getProductCategory, getProductSize, getProductType, getSimpleProduct, setProductImage, uploadProduct, resetImage } from '../../action/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddProduct = (socket) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [trigger, setTrigger] = useState(false);
    const variation = { "color": "", "price": "", "stock": "" }
    const value = { "Size": "", "variation": [variation] }
    const [productVariation, setproductVariation] = useState([value]);

    const { productSize } = useSelector(state => state.productData)
    const { productCategory } = useSelector(state => state.productData)
    const { productImageUrl } = useSelector(state => state.productData)
    const { user } = useSelector(state => state.userData)

    useEffect(() => {
        socket.props && socket.props.on("addProductError", (message) => {
            toast.error(message.message)
        })
        socket.props && socket.props.on("addProductSuccess", (message) => {
            toast.success(message.message)
            dispatch(resetImage())
            navigate('/retailer/stock')
        })
    }, [socket.props])

    useEffect(() => {
        dispatch(getProductSize())
        dispatch(getProductCategory())
        dispatch(getProductType())
        console.log("User id : ", user._id);
        dispatch(getSimpleProduct({ retailerId: user._id }))
    }, [user])

    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [category, setCategory] = useState("")
    const [skuId, setSkuId] = useState("")
    const [skuIds, setSkuIds] = useState("")
    const [ArraySku, setArraySku] = useState([])
    const [type, setType] = useState("simple")
    const [stock, setStock] = useState({})
    const [image, setImage] = useState("")
    const [skuIdsName, setSkuIdsName] = useState([])

    const [productNameError, setproductNameError] = useState("false");
    const [productPriceError, setProductPriceError] = useState("false");
    const [categoryError, setcategoryError] = useState("false");
    const [fileError, setfileError] = useState("");
    const [productSkuIdError, setProductSkuIdError] = useState("false");
    const [sizeError, setSizeError] = useState("");
    const [quantityError, setquantityError] = useState("false");
    const [skuIdsError, setSkuIdsError] = useState("");
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {

    }, [ArraySku, skuId, skuIds, image, productImageUrl])

    const change = (index, event) => {
        // console.log(event.value)
        const value = event.value;
        const values = [...productVariation]
        values[index].Size = value;
        console.log(values)
        setproductVariation(values)
    }

    const handleInputChange = (event, ind, index) => {
        const { name, value } = event.target
        const values = [...productVariation]
        values[index].variation[ind][name] = value
        console.log(values)
        setproductVariation(values)
    }

    const addNewVariation = (e, index) => {
        e.preventDefault()
        const prod = productVariation
        prod[index].variation.push(variation)
        setproductVariation(prod)
        console.log("added", productVariation[index].variation.length)
        setTrigger(!trigger)
    }

    useEffect(() => {
        console.log("called")
    }, [productVariation.length, trigger])


    useEffect(() => {
        console.log(startDate)
    }, [startDate])

    const fileChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleUpload = (e) => {
        e.preventDefault()

        dispatch(setProductImage(image))
        toast.success('Image Uploaded')
    }

    const removeVariation = (e, ind, index) => {
        e.preventDefault()
        if (productVariation[index].variation.length === 1) {
            const temp = productVariation;
            temp.splice(index, 1)
            setproductVariation(temp)
            setTrigger(!trigger)
        }
        else {
            const temp = productVariation;
            temp[index].variation.splice(ind, 1)
            setproductVariation(temp)
            setTrigger(!trigger)
        }

    }
    const removeSizeVariation = (index) => {
        const temp = productVariation
        temp.splice(index, 1)
        setproductVariation(temp)
        setTrigger(!trigger)

    }

    const addSizeVariation = (e) => {
        e.preventDefault()
        setproductVariation(productVariation => [...productVariation, value])
    }


    const SubmitForm = (e) => {
        e.preventDefault()
        if (productName === "" || category === "" || skuId === "") {
            toast.error("Enter the required fields for the product")
            return false
        }
        if (productVariation.length === 0 || productVariation[0].variation.length === 0) {
            console.log("alert")
            toast.error("Enter a Size Variation inorder to add the product")
            return false
        }
        if (image.length === 0) {
            toast.error("Add Product Image")
            return false
        }
        if (productImageUrl === "") {
            toast.error("Click Upload to upload the Image")
            return false

        }
        let product = {
            productName: productName,
            productImageUrl: productImageUrl,
            category: category,
            variation: productVariation,
            availableDate: startDate,
            skuId: skuId,
            retailerId: user._id,
        }
        console.log("is Validated", product)

        console.log("console-dispatch",dispatch(uploadProduct(product, socket.props)))
        // socket.props ? socket.props.on("addProductError", () => {
        //  //   toast.error(message.message)
        // }):
        // navigate('/retailer/stock')
    }

    const validateField = (event) => {
        const { name, value } = event.target
        if (name == "productName") {
            const productnameField = document.getElementById('productname');
            setProductName(value)
            if (value.match(/^[a-zA-Z$%&' ]+$/)) {
                console.log("true")
                productnameField.classList.remove('is-invalid')

            }
            else {
                console.log("false")
                productnameField.classList.add('is-invalid')
                setproductNameError("Provide a proper product name")

            }
        }
        if (name == "skuId") {
            const productSkuIdField = document.getElementById('skuid');
            setSkuId(value)
            if (value.match(/^[a-zA-Z1-9]+$/)) {
                console.log("true")
                productSkuIdField.classList.remove('is-invalid')

            }
            else {
                console.log("false")
                productSkuIdField.classList.add('is-invalid')
                setProductSkuIdError("Provide a proper SKUID")

            }
        }
        if (name == "productPrice") {
            const productPriceField = document.getElementById('productprice');
            setProductPrice(value)
            if (value.match(/^[\d]{1,}\.?\d{1,2}$/)) {
                console.log("true")
                productPriceField.classList.remove('is-invalid')

            }
            else {
                console.log("false")
                productPriceField.classList.add('is-invalid')
                setProductPriceError("Provide a proper Price")

            }
        }
    }

    return (
        <section className="mt-5 mb-5" style={{ backgroundColor: "#fff" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" >
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-8">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            Add Product
                                        </p>
                                        <form className="mx-1 mx-md-4">
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0 ">

                                                    <label className="form-label " htmlFor="productname" >
                                                        Product Name <sup style={{ color: "red" }}>*</sup>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="productName"
                                                        id="productname"
                                                        value={productName}
                                                        className="form-control"
                                                        placeholder="Enter the product name"
                                                        onChange={(e) => validateField(e)}

                                                    />
                                                    <strong className=' invalid-feedback ' >{productNameError}</strong>
                                                </div>
                                            </div>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <div className="form-outline flex-fill mb-0">

                                                    <label className="form-label" htmlFor="skuId" >
                                                        Sku Id <sup style={{ color: "red" }}>*</sup>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="skuId"
                                                        id="skuid"
                                                        value={skuId}
                                                        className="form-control"
                                                        placeholder="Enter the Sku Id"
                                                        onChange={(e) => validateField(e)}
                                                    />
                                                    <strong className=' invalid-feedback ' >{productSkuIdError}</strong>
                                                </div>
                                            </div>
                                            <>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="category" >
                                                            Category<sup style={{ color: "red" }}>*</sup>
                                                        </label>
                                                        <div className="">
                                                            <Select styles={{ border: "1px solid black" }} options={productCategory && productCategory.map((option) => ({ label: option.category, value: option.category }))} onChange={(event) => { setCategory(event.value) }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label" htmlFor="category" >
                                                            Product Available From<sup style={{ color: "red" }}>*</sup>
                                                        </label>
                                                        <div className="form-control customDatePickerWidth" style={{ width: "40%" }}>
                                                            <DatePicker placeholderText="Add a Date" wrapperClassName="datePicker" styles={{ border: "1px solid black" }} selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="d MMMM yyyy" />
                                                        </div>
                                                        <strong className='invalid-feedback' >{categoryError}</strong>
                                                    </div>
                                                </div>
                                                <>
                                                    <h5>Variations</h5>

                                                    {
                                                        productVariation && productVariation.map((val, index) =>
                                                        (
                                                            <>

                                                                <div className='form-outline row'>
                                                                    <div className="col-md-7">
                                                                        <label className="form-label" htmlFor="category" >Size Variation</label>
                                                                        <Select styles={{ border: "1px solid black" }} options={productSize && productSize.map((option) => ({ label: option.size, value: option.size }))} onChange={(event) => { change(index, event) }} />
                                                                    </div>
                                                                    <div className="col-md-3" style={{ marginTop: "30px" }} > <button className="btn btn-outline-danger" onClick={() => { removeSizeVariation(index) }}> Remove Size </button> </div>
                                                                    <div className="col-md-2" style={{ marginTop: "30px" }} > <button className="btn btn-outline-primary" onClick={(e) => { addNewVariation(e, index) }}> Add Color </button> </div>
                                                                    {
                                                                        productVariation[index].variation.map((value, ind) =>
                                                                        (<>
                                                                            {

                                                                                console.log("length", productVariation[index].variation.length)
                                                                            }
                                                                            <div class="row">
                                                                                <div class="col-md-3">
                                                                                    <label for="">Color</label>
                                                                                    <input type="text" class="form-control" id="" name='color' placeholder="Color" value={productVariation[index].variation[ind].color} onChange={(event) => { handleInputChange(event, ind, index) }} />
                                                                                </div>
                                                                                <div class="col-md-3">

                                                                                    <label for="">Price</label>
                                                                                    <input type="number" class="form-control" id="" name='price' placeholder="Price" value={productVariation[index].variation[ind].price} onChange={(event) => { handleInputChange(event, ind, index) }} />
                                                                                </div>
                                                                                <div class="col-md-2">

                                                                                    <label for="">Stock</label>
                                                                                    <input type="number" class="form-control" id="" name='stock' placeholder="Stock" value={productVariation[index].variation[ind].stock} onChange={(event) => { handleInputChange(event, ind, index) }} />
                                                                                </div>
                                                                                <div class="col-md-2">
                                                                                    <div className="" style={{ marginTop: "20px" }} >
                                                                                        <button className="btn" onClick={(e) => removeVariation(e, ind, index)} ><i class="bi bi-x-lg" /> </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                        )
                                                                        )
                                                                    }
                                                                </div>
                                                            </>
                                                        )
                                                        )
                                                    }
                                                    <button className='btn btn-outline-primary mb-2  mt-2' onClick={(e) => { addSizeVariation(e) }} > Add Size Variation </button>
                                                </>
                                                <div className="d-flex flex-row align-items-center mb-4 row">
                                                    <div className="form-outline flex-fill mb-0 col-6">
                                                        <label>Upload Image<sup style={{ color: "red" }}>*</sup></label><br />
                                                        <input
                                                            type="file"
                                                            name="image"
                                                            className="custom-file-input"
                                                            id="file"
                                                            accept="image/jpeg, image/png, image/jpg"
                                                            aria-describedby="inputGroupFileAddon01"
                                                            onChange={fileChange}
                                                        />
                                                        <button className="btn btn-info btn-md mt-4" onClick={handleUpload}>Upload</button>
                                                    </div>
                                                    <div className="mb-0 col-6">
                                                        <img src={productImageUrl} width={120} />
                                                    </div>
                                                </div>
                                            </>
                                            <div className="d-flex justify-content-center mt-4 mx-4 mb-3 mb-lg-4">
                                                <button className="btn btn-primary btn-lg m-2" onClick={SubmitForm}>
                                                    Submit
                                                </button>
                                                <button className="btn btn-secondary btn-lg m-2" onClick={() => { navigate("/retailer/stock") }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Toaster position="top-center" reverseOrder={false} />
        </section >
    )
}

export default AddProduct
