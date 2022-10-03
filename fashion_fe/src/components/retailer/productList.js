// import { useSelect } from '@mui/base';
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { changeStatus, individualProduct } from '../../action/action';
// // // useNavigate
// // useSelector

// const ProductList = (value,key) => {
//     const { user } = useSelector(state => state.userData)

//     const naviagte = useNavigate()

//     const dispatch = useDispatch();
//     const getSingleProduct = (id) => {
//         dispatch(individualProduct(id))
//     }

//     const toggleProduct = (productid) => {
//         dispatch(changeStatus(productid, { retailerId: user._id }))
//         // dispatch(filterProducts({ stock: filterStock, category: categoryFilter, search: searchFilter ,sort: sort }, { retailerId: user._id }))
//     }
//     console.log(value.value)
//     return (
//         // <div>
//             <tr>
//                 <td style={{ width: "10px" }}>
//                     <div class="form-check" >
//                         <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
//                     </div>
//                 </td>
//                 <td ><img src={value.value.productImage} style={{ marginLeft: "40px" }} width={50} className="rounded" /></td>
//                 <td className="fs-5 text-left align-middle" >{value.value.productName}</td>
//                 <td className="fs-5 text-left align-middle" >{value && value.value.category}</td>
//                 <td className="fs-5 text-center align-middle" >
//                     <button type="button" class="btn btn-primary ml-1 mr-1 " data-toggle="modal" data-target="#inventoryModal" onClick={() => { getSingleProduct(value.value._id) }}>
//                         Manage Inventory
//                     </button>
//                     <button type="button" class="btn btn-primary ml-1 mr-1" onClick={() => { naviagte(`/retailer/product/${value.value._id}`) }}>
//                         Edit
//                     </button>
//                 </td>
//                 <td className="align-middle">
//                     <div class="form-check form-switch">
//                         <label class="form-check-label" style={{ width: "0px" }} for={`activationSwitch${key.key}`} >{value.value.status ? "Active" : "Inactive"}</label>
//                         <input class="form-check-input" type="checkbox" role="switch" onClick={() => { toggleProduct(value.value._id) }} checked={value.value.status} id={`activationSwitch${key.key}`} />
//                     </div>
//                 </td>
//             </tr>
//         // </div>
//     );
// }

// export default ProductList;
