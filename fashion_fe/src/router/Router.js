import React from "react";
import AddProduct from "../components/retailer/addProduct"
import Profile from "../components/retailer/profile";
import Product from "../components/retailer/product";
import InventoryManagement from "../components/retailer/inventoryManagement";
import Home from "../components/home/home";
import Retailer from "../components/retailer/retailerPanel";
import ProductListing from "../components/consumer/productList"
import Consumer from "../components/consumer/consumer"
import UpdateProfile from "../components/retailer/updateProfile";
import Loading from "../components/retailer/loading";
import { LoginCallback } from "@okta/okta-react";
import { Routes, Route } from "react-router-dom";
import Secureroute from "./Secureroute";
import SinglePage from "../components/consumer/singlePage";
import UpdateProduct from "../components/retailer/updateProduct";

const Router = ({ socket }) => {
    // console.log(socket)
    return (
        <>
            <Routes>
                <Route path='login/callback' element={<LoginCallback loadingElement={<Loading />} />} />
                <Route path="retailer" element={<Retailer />}>
                    <Route path="stock" element={<InventoryManagement props={socket} />} />
                    <Route path="product" element={<Product />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="product/:id" element={<UpdateProduct />} />
                    <Route path="addProduct" element={<AddProduct props={socket} />} />
                    <Route path="profile/updateProfile/:id" element={<UpdateProfile />} />
                </Route>                    
                    <Route path="/" element={<Consumer props={socket}  />}>
                        <Route path="" element={<Home props={socket}  />} />
                        <Route path="products" element={<ProductListing />} />
                        <Route path="product/:id" element={<UpdateProduct />} />
                        <Route path="view-product/:id" element={<SinglePage />} />
                        <Route path="profile" element={<Secureroute><Profile /></Secureroute>} />
                        <Route path="profile/updateProfile/:id" element={<UpdateProfile />} />
                    </Route>
            </Routes>
        </>)
}

export default Router

