import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../action/action";
import '../../assets/style/retailerProduct.css';
import { useNavigate } from "react-router-dom";

let PageSize = 3;

const Product = () => {
    const productItem = [
        {
            name: "Product1",
            count: 10,
            description: "xxxxx"
        },
        {
            name: "Product2",
            count: 10,
            description: "xxxxx"
        },
        {
            name: "Product3",
            count: 10,
            description: "xxxxx"
        },
        {
            name: "Product4",
            count: 10,
            description: "xxxxx"
        },
        {
            name: "Product5",
            count: 10,
            description: "xxxxx"
        }
    ]
    const disapatch = useDispatch()
    const navigate = useNavigate()

    const { user } = useSelector(state => state.userData)
    const { products } = useSelector(state => state.productData)
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        disapatch(getAllProducts({ retailerId: user._id }))
    }, [user])


    return (
        <div>
            <main className="mt-2 p-3">
                <div className="container-fluid">
                    <div className="row">
                        <div className="display-3 col-md-12 fw-bold fs-3">
                            Dashboard
                        </div>
                    </div>
                </div>
                <hr></hr>
            </main>
            <div class="mt-2 p-3">
                <h1 class="display-4 ml-4">Welcome to Retailer Dashboard</h1>
                <hr class="my-4" />
                <p class="display-6 ml-4">Currently you have added {products.length} Products</p>
                <button className="btn btn-secondary ml-4 mt-2" onClick={() => { navigate("/retailer/stock") }}> Click to View </button>
            </div>
        </div>
    )
}


export default Product