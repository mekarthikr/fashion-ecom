import React, { useEffect } from "react";
import '../../assets/style/profile.css'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Profile = () => {

    const navigate = useNavigate()
    const { user } = useSelector((state) => state.userData);
    console.log(user)
    useEffect(()=>{},[user])
    
    return (
        <>
        <div className="section about-section gray-bg" id="about">
            <div className="container">
                <div className="row align-items-center flex-row-reverse">
                    <div className="col-lg-6">
                        <h3 className="dark-color">My Profile</h3>
                        <h6 className="theme-color lead">Fashion User</h6>
                        <div className="row about-list">
                            <div className="col-md-6">
                                <div className="media">
                                    <label>Name</label>
                                    <h5>{user.name}</h5>
                                </div>
                                <div className="media">
                                    <label>E-Mail</label>
                                    <h5>{user.email}</h5>
                                </div>
                               {user.phone && <div className="media">
                                    <label>Phone</label>
                                    <h5>{user.phone}</h5>
                                </div>}
                                {user.address && <div className="media">
                                    <label>Address</label>
                                    <h5>{user.address}</h5>
                                </div>}
                                <div className="mt-5 text-right">
                                    <button className="btn btn-dark btn-lg action-button mb-5" type="button" onClick={() => navigate(`updateProfile/${1}`)}>Update Profile</button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-avatar">
                            <img
                                src="https://thumbs.dreamstime.com/b/user-icon-vector-male-person-symbol-profile-circle-avatar-sign-user-icon-vector-male-person-symbol-profile-circle-avatar-sign-115922528.jpg"
                                width={400}
                                title=""
                                alt="Profile Image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Profile