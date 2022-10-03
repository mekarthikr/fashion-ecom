import React, { useEffect } from "react";
// import { useOktaAuth } from "@okta/okta-react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { cartProduct } from "../../action/action";

import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import Cart from "./cart";

const Consumer = (socket) => {

    // const { oktaAuth, authState } = useOktaAuth();
    const dispatch = useDispatch();
    const { togglecart, user } = useSelector((state) => state.userData);


    useEffect(() => {
        dispatch(cartProduct(user._id))
    }, [togglecart])

    return (
        <div style={{ marginRight: togglecart ? "200px" : "0px", transition: "margin-right 1s" }} >
            <Header props={socket} />
            <Outlet />
            <div className=" sidenav" id="left_side">
                <Cart />
            </div>
            <Footer />
        </div>
    )
}

export default Consumer;