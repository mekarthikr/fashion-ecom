import React, { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import { productlist } from '../../action/action'
import { useNavigate } from "react-router-dom";

const ProductListing = () => 
{
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { products } = useSelector(state => state.productData)
    const { user } = useSelector(state => state.userData)
    console.log(user._id);

    useEffect(() => {
        products.length===0 && dispatch(productlist())
    },[])
    
    return (
        <main>
            <div className="row  mt-4 mb-4  g-4" style={{backgroundColor: ""}}>
                {
                    products.length > 0 ? products.map(e => {
                        return (
                            <div key={e._id} className="col-md-3">
                                <div className="card mx-auto" style={{ width: "18rem" }}>
                                    <img className="card-img-top" src={e.productImage} alt="Card image cap" onClick={() => navigate(`/view-product/${e._id}`)}/>
                                    <div className="card-body mh-25 border" >
                                        <h5 className="card-title"  style={{height:"50px"}} >{e.productName}</h5>
                                        <button className="btn btn-warning" style={{float:"right"}} onClick={()=>{navigate(`/view-product/${e._id}`)}}>View</button>
                                        <h6 className="mt-2" style={{float:"left"}}>Starting from <CurrencyFormat value={e.variation[0].variation[0].price} displayType={'text'} thousandSeparator={true} prefix={'₹'} /></h6>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : 
                    <h1 style={{textAlign: "center", height: "140px"}} ><strong>Product Not Found!!</strong></h1>
                }
            </div>
        </main>)
}

export default ProductListing