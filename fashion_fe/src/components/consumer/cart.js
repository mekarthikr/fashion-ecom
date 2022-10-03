import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCart } from '../../action/action';
import { Close } from '@material-ui/icons';

const Cart = () => {
  
  const dispatch = useDispatch();

  const toggleCartDisplay = () => {
    dispatch(toggleCart(!togglecart))
  }

  const { cart } = useSelector((state) => state.productData)
  const { togglecart } = useSelector((state) => state.userData);
  const { user } = useSelector((state) => state.userData)

  console.log("length : -----------", cart.length);

  useEffect(() => {
    console.log("----------------------cart----------------------------------------")
  },[cart.length,user])


  return (

    <div style={{ width: togglecart ? "200px" : "0px", transition: "width 1s" }}>
      <button className="nav-link remove-button" onClick={toggleCartDisplay} >

        <Close style={{ fontSize: "28px", color: "black" }} color="action" />

      </button>
      <div className="row" style={{ borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0" }}>
        <h1 style={{ textAlign: "center" }}>CART</h1>
      </div>
      <hr />
      <button style={{ position: "absolute", bottom: "0", width: "60%", margin: "5% 20%", borderRadius: "10px", border: "0", color: "white", backgroundColor: "black"}} >Check Out</button>
    </div>
  );
}

export default Cart;
