import { toRelativeUrl } from "@okta/okta-auth-js";
import { useOktaAuth } from "@okta/okta-react";
import React, { useEffect, useState } from "react";
import { FaUserAlt, FaShoppingBag, FaBars } from "react-icons/fa";
import {FcDataConfiguration} from "react-icons/fc"
import { FiLogOut } from "react-icons/fi"
import { MdOutlineInventory } from "react-icons/md"
import { TiFolderAdd } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getAllProducts, registerRetailer } from "../../action/action";
import Loading from "./loading";

const Retailer = () => 
{
    const { oktaAuth, authState } = useOktaAuth();
    const { user } = useSelector((state) => state.userData);

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const toggle = () => setIsOpen(!isOpen);
    const [retailer, setRetailer] = useState({ name: "", email: "", role: "retailer" })
    const menuItem = [
        {
            path: "/retailer/product",
            name: "Dashboard",
            icon: <FaShoppingBag />
        },
        {
            path: "/retailer/stock",
            name: "Manage Product",
            icon: <MdOutlineInventory />
        },
        // {
        //     path: "/retailer/addProduct",
        //     name: "Add Product",
        //     icon: <TiFolderAdd />
        // },
        {
            path: "/retailer/profile",
            name: "Profile",
            icon: <FaUserAlt />
        },
        {
            path: "/login/callback",
            name: "logout",
            icon: <FiLogOut />
        }
    ]

    // useEffect(() => {
    //     dispatch(getAllProducts({ retailerId: user._id }))
    // }, [user])

    useEffect(() => {
        if (!authState) {
            return;
        }


        if (!authState?.isAuthenticated) {
            const originalUri = toRelativeUrl(window.location.href, window.location.origin);
            oktaAuth.setOriginalUri(originalUri);
            oktaAuth.signInWithRedirect();
        }
        else {
            dispatch(registerRetailer({ email: authState.idToken.claims.email, name: authState.idToken.claims.name, role: "retailer" }))
        }
    }, [oktaAuth, !!authState, authState?.isAuthenticated]);

    if (!authState || !authState?.isAuthenticated) {
        return (<Loading />);
    }
    return <div className="retailer-container">
        <div style={{ width:"250px" }} className="sidebar">
            <div className="top-section">
            <h1 className="site-title" style={{ display:"display",margin:"auto"}}>fashion</h1>
                {/* <div style={{ marginLeft: isOpen ? "50px" : "-10px", textDecoration: "none" }} className="bars">
                    <FaBars onClick={toggle} />
                </div> */}
            </div>
            {
                menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" >
                        <div className="icon mt-1">
                            {item.icon}
                        </div>
                        <div style={{ display:"block"}} className="retailer-panel-link">
                            {item.name}
                        </div>
                    </NavLink>
                ))
            }
        </div>
        <main 
        style={{marginLeft:"250px"}}
        >
            <Outlet />
        </main>
    </div>
}

export default Retailer
