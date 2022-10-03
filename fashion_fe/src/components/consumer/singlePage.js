import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate, useParams } from "react-router-dom";
import { individualProduct } from '../../action/action'
import { useDispatch, useSelector } from "react-redux";

const SinglePage = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { product } = useSelector(state => state.productData)

    const [currentPrice, setCurrentPrice] = useState()
    const [size, setSize] = useState()
    const [color, setColor] = useState()

    useEffect(() => {
        dispatch(individualProduct(id))
    }, [])

    useEffect(() => {
        product.variation && product.variation.map((sizes) => {
            if (sizes.Size === size) {
                setColor(sizes.variation[0].color)
            }
        })
    }, [size])

    useEffect(() => {
        product.variation && product.variation.map((sizes) => {
            if (sizes.Size === size) {
                sizes.variation.map((colors) => {
                    if (colors.color === color) {
                        if (colors.stock === "0") {
                            setCurrentPrice(0)
                        }
                        else {
                            setCurrentPrice(colors.price)
                        }
                    }
                })
            }
        })
    }, [size, color])

    useEffect(() => {
        product.variation && setSize(product.variation[0].Size)
        product.variation && setColor(product.variation[0].variation[0].color)
    }, [product])

    const addToCart = (event) => {
        event.preventDefault()
    }

    return (
        product && <>
            <div className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="images p-3">
                                        <div className="text-center p-4">
                                            {" "}
                                            <img
                                                id="main-image"
                                                src={product.productImage}
                                                width={450}
                                                height={560}
                                                style={{ width: "450px", height: "560px" }}
                                            />{" "}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="product p-4 ">
                                        <div className="">
                                            <div className="">
                                                <span className="ml-1 display-block" onClick={() => navigate('/products', { state: { items: "" } })} ><i className="fa fa-long-arrow-left" ></i> Back</span>
                                            </div>
                                        </div>
                                        <div className="" style={{ height: "50%", marginTop: "25%", marginBottom: "25%" }}>
                                            <span className="text-uppercase text-muted brand">{product.category}</span>
                                            <h5 className="text-uppercase">{product.productName}</h5>
                                            <div className="align-items-center ">
                                                <div className="row">
                                                    <div className="col-2 mt-2"><h6>SIZE</h6></div>
                                                    <div className="col-4">

                                                        <select className="form-control" name="category" id="category" required onChange={(e) => { setSize(e.target.value) }} >
                                                            {product.variation && product.variation.map((option) => (
                                                                <option value={option.Size}>{option.Size}</option>
                                                            ))}

                                                        </select>

                                                    </div>
                                                </div>
                                                <div className="row mt-2">
                                                    {
                                                        <>
                                                            <div className="col-2 mt-2">
                                                                <h6>COLOR</h6>
                                                            </div>
                                                            <div className="col-4">
                                                                <select className="form-control" name="category" id="category" required onChange={(event) => { setColor(event.target.value) }} >
                                                                    {
                                                                        product.variation && product.variation.map((option) => {
                                                                            if (option.Size === size) {
                                                                                return option.variation.map((colorOption) => {

                                                                                    return <option value={colorOption.color}>{colorOption.color}</option>
                                                                                })
                                                                            }
                                                                        }
                                                                        )
                                                                    }
                                                                </select> 
                                                            </div> 
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                            <div className="">
                                            </div>
                                            {currentPrice === 0 ? <h5 className="mt-4" > Sorry,Product Out of Stock </h5> : <h5 className="act-price mt-4">{"Price : "}<CurrencyFormat value={currentPrice && currentPrice} displayType={'text'} thousandSeparator={true} prefix={'₹'} /></h5>}
                                            <div className="cart mt-4 align-items-center">
                                                <button className="btn btn-warning text-uppercase mr-2 px-4" disabled={currentPrice === 0 ? true : false} onClick={(e) => { addToCart(e) }} >
                                                    Add to cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SinglePage