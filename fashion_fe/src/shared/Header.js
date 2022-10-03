import * as React from "react";
import "../assets/style/header.css"
import { Badge, Box, Tab, Tabs } from "@material-ui/core";
import { ExitToApp, Mail, Person, ShoppingBasket, ShoppingCart, Notifications } from "@material-ui/icons";
// import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../action/action";
import Search from "./Search";
import toast, { Toaster } from "react-hot-toast";


const Header = (socket) => {
    const dispatch = useDispatch();
    const { togglecart } = useSelector((state) => state.userData);
    const { cart } = useSelector(state => state.productData)
    const { oktaAuth, authState } = useOktaAuth();
    const navigate = useNavigate()

    const toggleCartDisplay = () => {
        dispatch(toggleCart(!togglecart))
    }

    // useEffect(() => {
    //     setNotification(false)
    // }, [])

    const navigateProduct = (message) => {
        message && navigate(`view-product/${message.data.product._id}`)
    }


    useEffect(() => {
        console.log("message")
        console.log("alert", socket.props.props)

        socket.props.props && socket.props.props.on("getNotification",
            (message) => (
                toast.custom(() => (
                    <div
                        className=
                        {`
              
              max-w-md h-15 w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >

                        <div className="flex-1 w-0 pt-3 pl-3 pr-3">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={message.data && message.data.product.productImage}
                                        alt=""
                                    />
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        New Product Added
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {/* Name */}
                                        {message.data && message.data.product.productName}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => { navigateProduct(message) }}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))
            )
        )
    }, [socket.props.props])

    return (

        authState && <>

            <div className="d-grid align-items-center" style={{ backgroundColor: "white", height: "100px" }}>
                <nav className="navbar navbar-expand-lg navbar-light " >
                    <div className="container" >
                        <h2 className="site-title" style={{ fontSize: "53px", margin: "0px", cursor: "pointer" }} onClick={() => { navigate("/") }}>fashion</h2>
                        <button className="navbar-toggler" type="button" style={{ backgroundColor: "black" }} data-toggle="collapse" data-target="#collapsibleNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="collapsibleNavbar">
                            <ul className="navbar-nav " style={{ marginLeft: "auto", backgroundColor: "white" }}>
                                <li className="nav-item">
                                    <Search />
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to={"profile"}>
                                        <Person color="action" style={{ fontSize: "35px", color: "black" }} />
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" onClick={toggleCartDisplay}>
                                        <Badge overlap="rectangular" badgeContent={cart.length} color="primary">
                                            <ShoppingCart style={{ fontSize: "35px", color: "black" }} color="action" />
                                        </Badge>
                                    </a>
                                </li>
                                {authState.isAuthenticated && <li className="nav-item">
                                    <button className="nav-link remove-button" onClick={() => { oktaAuth.signOut() }} >
                                        <ExitToApp style={{ fontSize: "35px", color: "black" }} color="action" />
                                    </button>
                                </li>}
                            </ul>
                        </div>
                    </div>
                </nav>
                <Toaster
                    position="top-left"
                    reverseOrder={false}
                />
            </div>
        </>
    )

}

export default Header;