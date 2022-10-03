import React, { useEffect } from "react";
import "../../src/assets/style/search.css"
import { useState } from "react";
import { searchProducts } from "../action/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Search = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [items, setItems] = useState([]);
    const searchProduct = (e) => {
        e.preventDefault();
        console.log("Item : ", items)
        dispatch(searchProducts({ search: items }))
        navigate('/products', {state: {items: items}})
    }
    
    return (
        <form className="example">
            <input type="text" placeholder="Enter Product Name" name="search" value={items} onChange={(e) => setItems(e.target.value)} />
            <button onClick={(e) => searchProduct(e)}><i className="fa fa-search"></i></button>
        </form>


    )
}
export default Search;