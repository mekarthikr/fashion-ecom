import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate()

    return (
        <div className="container-fluid bg-dark text-white pt-2 pb-3">
            <div className="row text-center text-md-start mt-5">
                <div className="col-md-3 col-lg-3 col-xl-4 mx-auto mt-3 ">
                    <h5 className="text-Uppercasse mb-4 font-weight-bold text-warning">Company Name</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Aliquam vulputate elit at neque lobortis, non ullamcorper dolor posuere. 
                        Morbi finibus consequat velit vitae malesuada. 
                        Aliquam quis augue velit.
                    </p>
                </div>
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                    <h5 className="text-Uppercasse mb-4 font-weight-bold text-warning">Location</h5>
                    <p><i className="bi bi-house-fill"></i> Chennai, TN</p>
                    <h6 className="text-Uppercasse mb-4 font-weight-bold text-warning">Make Money with Us</h6>
                    <p onClick={() => navigate('/retailer/product')} style={{cursor: "pointer"}} > Sell on Fashion</p>
                </div>
                <div className="col-md-4 col-lg-3 col-xl-2 mx-auto mt-3">
                            
                    <h5 className="text-Uppercasse mb-4 font-weight-bold text-warning">contacts</h5>
                    <p>
                        <a href="#" style={{color:"white",textDecoration:"none"}}><i className="bi bi-envelope-fill"></i> fashion@gmail.com</a>
                    </p>
                    <p>
                        <a style={{color:"white",textDecoration:"none"}}><i className="bi bi-telephone-fill"></i> +91 9876543210</a>
                    </p>
                </div>
                <div className="d-flex justify-content-center p-1 border-top">
                    <a className="btn btn-primary  mt-5 btn-floating m-1" style={{backgroundColor:" #3b5998",borderRadius:"50%",textDecoration:"none"}} href="#!" role="button"><i className="bi bi-facebook"></i></a>
                    <a className="btn btn-primary  mt-5 btn-floating m-1" style={{backgroundColor:" #55acee",borderRadius:"50%",textDecoration:"none"}} href="#!" role="button"><i className="bi bi-twitter"></i></a>
                    <a className="btn btn-primary  mt-5 btn-floating m-1" style={{backgroundColor:" #dd4b39",borderRadius:"50%",textDecoration:"none"}} href="#!" role="button"><i className="bi bi-google"></i></a>
                    <a className="btn btn-primary  mt-5 btn-floating m-1" style={{backgroundColor:" #ac2bac",borderRadius:"50%",textDecoration:"none"}} href="#!" role="button"><i className="bi bi-instagram"></i></a>                
                </div>
            </div>
        </div>     
    )
}

export default Footer