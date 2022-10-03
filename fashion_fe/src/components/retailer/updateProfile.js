import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { updateUser } from "../../action/action";


const UpdateProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.userData);
  const [state, setState] = useState({
    name: "",
    // id: "1",
    email: "",
    phone: "",
    address: ""
  })


  const { name, id, email, phone, address } = state;
  let [nameError, setnameError] = useState("");
  let [phoneError, setphoneError] = useState("");

  const validate = () => {
    console.log("validation check");

    let nameError = "";
    let phoneError = "";

    const nameRegex = /^[a-zA-Z ]{2,15}$/;
    const phoneRegex = /^[6-9]{1}[0-9]{9}$/;

    const nameField = document.getElementById('name');
    const phoneField = document.getElementById('phone');

    if (name === "") {
      nameError = "Name field is required";
      setnameError(nameError);
      nameField.classList.add('is-invalid')
    }
    else if (!nameRegex.test(name)) {
      nameError = "Please provide a valid name";
      setnameError(nameError);
      nameField.classList.add('is-invalid');
    }
    else {
      nameField.classList.remove('is-invalid')
    }

    if (phone === "") {
      phoneError = "Phone Number field is required";
      setphoneError(phoneError);
      phoneField.classList.add('is-invalid')
    }
    else if (!phoneRegex.test(phone)) {
      phoneError = "Please provide a valid Phone Number";
      setphoneError(phoneError);
      phoneField.classList.add('is-invalid');
    }
    else {
      phoneField.classList.remove('is-invalid')
    }
    if (nameError || phoneError) {
      return false;
    }
    else {
      return true
    }

  }

  useEffect(() => {
    if (user) {
      setState({ ...user });
      // console.log(state)
    }
  }, [user]);

  const handleChange = (e) => {
    let { name, value } = e.target
    setState({ ...state, [name]: value })
  }


  const SubmitData = e => {
    e.preventDefault();

    const isValid = validate();

    if (isValid) {
      e.preventDefault();
      console.log("state")
      dispatch(updateUser(state,user._id))
      navigate('..')
      // console.log(state);
    }

  }

  console.log(state)
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Update Profile
                    </p>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="name">Your Name<sup style={{ color: "red" }}>*</sup></label>
                          <input type="text" id="name" className="form-control" name="name" value={state.name} onChange={handleChange} readOnly={true} />
                          <strong className='invalid-feedback' >{nameError}</strong>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="email"> Your Email<sup style={{ color: "red" }}>*</sup></label>
                          <input type="email" id="email" className="form-control" name="email" value={state.email} onChange={handleChange} readOnly={true} />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="phone"> Your Phone</label>
                          <input type="number" id="phone" className="form-control" name="phone" value={state.phone} onChange={handleChange} required />
                          <strong className='invalid-feedback' >{phoneError}</strong>

                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="address"> Your Address</label>
                          <input type="text" id="address" className="form-control" name="address" value={state.address} onChange={handleChange} required />

                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button className="btn btn-primary btn-lg" type="button" onClick={() => navigate(-1)}>Back</button> &nbsp;
                        <button type="button" className="btn btn-primary btn-lg" onClick={SubmitData}>
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>)
}

export default UpdateProfile