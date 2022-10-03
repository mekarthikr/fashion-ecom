import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeStatus, filterProducts, getProductCategory, individualProduct, retailerProductList, updateInventory } from "../../action/action";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { Pagination } from '@mui/material';

const InventoryManagement = () => {

    const variation = { "color": "", "price": "", "stock": "" }
    const value = { "Size": "", "variation": [variation] }

    useEffect(()=>{

        function check(){
            
        }
        check()

    })


    const searchRef = useRef();
    // const [trigger, setTrigger] = useState(false);
    const [filterStock, setFilterStock] = useState(false);
    // const [productFilter, setProductFilter] = useState({})
    const [productVariation, setproductVariation] = useState([value]);
    // const [additionalFilter, setAdditionalFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [searchFilter, setSearchFilter] = useState("")
    const [pageCount, setPageCount] = useState()
    const [productCount, setProductCount] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [productPerPage, setProductPerPage] = useState(5)
    const [skipProducts, setSkipProducts] = useState((currentPage - 1) * productPerPage)
    const [sort, setSort] = useState("productName")
    const [sortOrder, setSortOrder] = useState(1)
    const [selectedProduct, setSelectedProduct] = useState([])

    const dispatch = useDispatch();
    const naviagte = useNavigate()

    const { user } = useSelector(state => state.userData)
    const { products, product ,productCategory ,productSize } = useSelector(state => state.productData)
    
    // const { productCategory } = useSelector(state => state.productData)
    // const { productSize } = useSelector(state => state.productData)


    useEffect(() => {
        user._id && dispatch(retailerProductList({ retailerId: user._id }))
        dispatch(getProductCategory())
    }, [user])


    useEffect(() => {
        product && setproductVariation(product.variation)
    }, [product, productVariation])


    useEffect(() => {
        dispatch(filterProducts({ stock: filterStock, category: categoryFilter, search: searchFilter, sort: sort, order: sortOrder }, { retailerId: user._id }))
    }, [categoryFilter, sortOrder, sort, searchFilter, filterStock])




    const setStockFilter = () => {
        setFilterStock(!filterStock)
    }


    const getSingleProduct = (id) => {
        dispatch(individualProduct(id))
    }

    const navigateToAdd = () => {
        naviagte("/retailer/addProduct")
    }

    const handleInputChange = (event, ind, index) => {
        const { name, value } = event.target
        const values = [...productVariation]
        values[index].variation[ind][name] = value
        // console.log(values)
        setproductVariation(values)
    }

    const change = (index, event) => {
        const value = event.value;
        const values = [...productVariation]
        values[index].Size = value;
        setproductVariation(values)
    }

    const toggleProduct = (productid) => {
        dispatch(changeStatus(productid, { retailerId: user._id }))
        dispatch(filterProducts({ stock: filterStock, category: categoryFilter, search: searchFilter, sort: sort, order: sortOrder }, { retailerId: user._id }))
    }

    const submitInventory = (productId) => {
        dispatch(updateInventory(productId, { variation: productVariation }))
        dispatch(filterProducts({ stock: filterStock, category: categoryFilter, search: searchFilter, sort: sort, order: sortOrder }, { retailerId: user._id }))
    }

    const addSearchFilter = (event) => {
        event.preventDefault()
        setSearchFilter(searchRef.current.value)
        // dispatch(filterProducts({ stock: filterStock, category: categoryFilter, search: searchFilter, sort: sort, order: sortOrder }, { retailerId: user._id }))
    }

    const toggleCheck = (event) => {
        const { value } = event.target
        if (selectedProduct.includes(value)) {

            if (selectedProduct.length === 0) {
                setSelectedProduct([])
            }
            else {

                const index = selectedProduct.indexOf(value)
                setSelectedProduct([...selectedProduct.slice(0, index), ...selectedProduct.slice(index + 1, selectedProduct.length)])
            }
        }
        else {
            setSelectedProduct([...selectedProduct, value])
        }
    }

    const selectAllProduct = (event) => {
        if (selectedProduct.length === products.length) {
            setSelectedProduct([])
        }
        else {
            const allProduct = products.map((product) => product._id)
            setSelectedProduct(allProduct)
        }
    }

    // useEffect(() => {
    //     console.log(selectedProduct)
    // }, [selectedProduct])

    const setSortState = (sort) => {
        setSort(sort)
        if (sortOrder === 1) {
            setSortOrder(-1)
        }
        else {
            setSortOrder(1)
        }
    }



    const resetFilter = (event) => {
        event.preventDefault()
        setCategoryFilter("all")
        setSearchFilter("")
        setSort("productName")
        setSortOrder(1)
        searchRef.current.value = ""
        setSelectedProduct([])
        setFilterStock(false)
    }


    useEffect(() => {
        products && setProductCount(products.length)
    }, [products])

    useEffect(() => {
        productCount && setPageCount(Math.ceil(productCount / productPerPage))
        setSkipProducts((currentPage - 1) * productPerPage)
    }, [productCount, currentPage, productPerPage])



    return (
        <>
            <div className="mt-2 p-3">
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-6 fw-bold fs-3">
                            Product List
                        </div>
                        <div className="col-md-6 fw-bold  text-right">
                            <button className="btn btn-primary" onClick={navigateToAdd}> Add Product </button>
                        </div>
                    </div>

                </div>
                <hr />
                <div className="row mb-3" >
                    <div className="col-md-8  d-flex align-items-center row">
                        <h6 className="col-md-1 mt-1 d-flex align-items-center text-muted">Filter : </h6>
                        <div className="form-check form-switch col-md-2">
                            <label className="form-check-label " >
                                Out of Stock
                                <input className="form-check-input" checked={filterStock} onClick={() => { setStockFilter() }} type="checkbox" role="switch" />
                            </label>
                        </div>
                        <div className="col-md-1 mt-2">
                            <h6>Category</h6>
                        </div>
                        <div className="col-md-3 row">
                            <div className="col-md-10">
                                <select class="form-select " value={categoryFilter} aria-label="Default select example" onChange={(e) => { setCategoryFilter(e.target.value) }}>
                                    <option selected value={"all"}>Select Category</option>
                                    {
                                        productCategory && productCategory.map((option) => (<option value={option.category} >{option.category}</option>))
                                    }
                                </select>
                            </div>
                        </div>
                        {selectedProduct.length !== 0 && <div className="col-md-3">
                            <h6 className="lead text-center align-middle">{selectedProduct.length} Product Selected</h6>
                        </div>}
                    </div>
                    <div className="col-md-3  ml-4 d-flex align-items-center" style={{ marginLeft: "45px" }}>
                        <div className="col-md-1  d-flex align-items-center mt-2 "><h6>Search:</h6></div>
                        <form class="form-inline mx-auto  row" >
                            <div className="col-md-8 ml-4">
                                <input class="form-control mr-sm-2" ref={searchRef} placeholder="Enter product name..." />
                            </div>
                            <button class="btn btn-outline-primary my-2 my-sm-0 col-md-3" type="submit" onClick={(event) => { addSearchFilter(event) }}>Search</button>
                        </form>
                    </div>
                    <button class="btn btn-outline-danger mr-4 my-2 my-sm-0 col-md-1 " style={{ width: "100px" }} onClick={(event) => { resetFilter(event) }}>Reset</button>
                </div>
                <div className="p-3 border border-dark">
                    <table className="table" id="myTableID">
                        <thead>
                            <tr>
                                <th style={{ width: "10px" }}>
                                    <div class="form-check" >
                                        <input class="form-check-input" type="checkbox" checked={selectedProduct.length === products.length ? products.length === 0 ? false : true : false} onClick={(event) => { selectAllProduct(event) }} id="flexCheckChecked" />
                                    </div>
                                </th>
                                <th className="fs-5 text-center " scope="col" >Image</th>
                                <th className="fs-5 text-left" scope="col" style={{ width: "600px" }}>Name <button onClick={() => { setSortState("productName") }} style={{ color: sort !== "productName" && "#C3C3C3" }} >{sortOrder === 1 && sort === "productName" ? <i className="bi bi-sort-down" /> : <i class="bi bi-sort-up " />}</button>  </th>
                                <th className="fs-5 text-left" scope="col">Category <button onClick={() => { setSortState("category") }} className="" style={{ color: sort !== "category" && "#C3C3C3" }} >{sortOrder === 1 && sort === "category" ? <i className="bi bi-sort-down " /> : <i class="bi bi-sort-up " />}</button>     </th>
                                <th className="fs-5 text-center" scope="col">Availability</th>
                                <th className="fs-5 text-center" scope="col">Action</th>
                                <th className="fs-5 text-left" scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.length ?
                                    <>{
                                        products.slice(skipProducts, skipProducts + productPerPage).map((e, index) => {
                                            return (
                                                <tr  >
                                                    <td style={{ width: "10px" }}>
                                                        <div class="form-check" >
                                                            <input class="form-check-input" type="checkbox" checked={selectedProduct.includes(e._id)} value={e._id} id="flexCheckChecked" onClick={(event) => { toggleCheck(event) }} />
                                                        </div>
                                                    </td>
                                                    <td ><img src={e.productImage} width={50} className="rounded mx-auto" /></td>
                                                    <td className="fs-5 text-left align-middle" >{e.productName}</td>
                                                    <td className="fs-5 text-left align-middle" >{e && e.category}</td>
                                                    <td className="fs-5 text-center align-middle" >
                                                        {e && e.variation.some((data) => {
                                                            const value = data.variation.some((data) => {
                                                                return data.stock !== "0"
                                                            })
                                                            return value
                                                        }) ? "In Stock" : "Out of Stock"}
                                                    </td>
                                                    <td className="fs-5 text-center align-middle" >
                                                        <button type="button" class="btn btn-primary ml-1 mr-1 " data-toggle="modal" data-target="#inventoryModal" onClick={() => { getSingleProduct(e._id) }}>
                                                            Manage Inventory
                                                        </button>
                                                        <button type="button" class="btn btn-primary ml-1 mr-1" onClick={() => { naviagte(`/retailer/product/${e._id}`) }}>
                                                            Edit
                                                        </button>
                                                    </td>
                                                    <td className="align-middle">
                                                        <div class="form-check form-switch">
                                                            <label class="form-check-label" style={{ width: "0px" }} for={`activationSwitch${index}`} >{e.status ? "Active" : "Inactive"}</label>
                                                            <input class="form-check-input" type="checkbox" role="switch" onClick={() => { toggleProduct(e._id) }} checked={e.status} id={`activationSwitch${index}`} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <><td className="text-center " colSpan={"7"} ><h2 className="mt-2 mb-2" >No Matching Product Found</h2></td></>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row mb-4 mt-4" >
                    <div className="col-md-2 row"  >
                        <p className="d-inline col-md-3 ml-4 pt-2">Show</p>
                        <select class="form-select col-md-2" value={productPerPage} style={{ width: "80px", height: "40px" }} aria-label="Default select example" onChange={(event) => { setProductPerPage(event.target.value) }}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                        <p className="d-inline col-md-3 pt-2">Products</p>
                    </div>
                    <div className="d-flex justify-content-center  col-md-7">
                        <Pagination count={pageCount} page={currentPage} onChange={(event, value) => { setCurrentPage(value) }} />
                    </div>
                </div>

                {/*  inventory management model  */}

                <div class="modal fade " id="inventoryModal" >
                    <div class="modal-dialog " style={{ maxWidth: "40%" }} role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" style={{ margin: "auto" }} id="inventoryModalLabel">Manage Stock</h5>
                            </div>
                            <div class="modal-body">
                                {
                                    productVariation && productVariation.map((val, index) =>
                                    (
                                        <>
                                            <div className='form-outline row'>
                                                <div className="col-md-12" >
                                                    <label className="form-label" htmlFor="category" >Size Variation</label>
                                                    <Select isDisabled styles={{ border: "1px solid black" }} value={{ label: productVariation[index].Size, value: productVariation[index].Size }} options={productSize && productSize.map((option) => ({ label: option.size, value: option.size }))} onChange={(event) => { change(index, event) }} />
                                                </div>
                                                {
                                                    productVariation[index].variation.map((value, ind) =>
                                                    (
                                                        <>
                                                            <div class="row">
                                                                <div class="col-md-4">
                                                                    <label for="">Color</label>
                                                                    <input disabled type="text" class="form-control" id="productsColorVariant" name='color' placeholder="Color" value={productVariation[index].variation[ind].color} onChange={(event) => { handleInputChange(event, ind, index) }} required />
                                                                </div>
                                                                <div class="col-md-4">

                                                                    <label for="">Price</label>
                                                                    <input disabled type="number" class="form-control" id="" name='price' placeholder="Price" value={productVariation[index].variation[ind].price} onChange={(event) => { handleInputChange(event, ind, index) }} required />
                                                                </div>
                                                                <div class="col-md-4">

                                                                    <label for="">Stock</label>
                                                                    <input type="number" class="form-control" id="" name='stock' placeholder="Stock" value={productVariation[index].variation[ind].stock} onChange={(event) => { handleInputChange(event, ind, index) }} required />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                    )
                                                }
                                            </div>
                                        </>
                                    )
                                    )
                                }
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary mr-auto" data-dismiss="modal" onClick={() => { submitInventory(product._id) }}>Submit</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InventoryManagement