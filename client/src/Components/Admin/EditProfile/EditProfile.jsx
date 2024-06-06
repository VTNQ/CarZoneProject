import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie'
function EditProfile() {
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState(null);
    const [loading, setloading] = useState(true);
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession);
        }
        return null;
    }

    useEffect(() => {
        const data = getUserSession();

        if (data && data.role == 'Admin') {
            setSessionData(data);
        } else {
            navigate('/login');
        }
    }, [navigate]);
    const location = useLocation();


    const [FromData, setFromData] = useState({
        FullName: '',
        Email: '',
        Address: '',
        Phone: '',
        IdentityCode: ''
    })
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/Account/ShowEmployee/${sessionData.ID}`)
                setFromData({
                    FullName: response.data.fullName,
                    Email: response.data.email,
                    Address: response.data.address,
                    Phone: response.data.phone,
                    IdentityCode: response.data.identityCode
                })
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        if (sessionData && sessionData.ID) {
            fetchdata();
        }

    }, [sessionData])
    const handleUpdate = async (event) => {
        event.preventDefault();
        if (FromData.FullName == '' || FromData.Email == '' || FromData.Address == '' || FromData.Phone == '' || FromData.IdentityCode == '') {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else if (FromData.IdentityCode.length != 12) {
            Swal.fire({
                icon: 'error',
                title: 'ID card requires 12 digits',
                showConfirmButton: false,
                timer: 1500,
            })
        } else if (FromData.Phone.length != 10) {
            Swal.fire({
                icon: 'error',
                title: 'Phone requires 10 digits',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Account/UpdateProfile/${sessionData.ID}`, {
                    method: 'Put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fullName: FromData.FullName, email: FromData.Email, address: FromData.Address, phone: FromData.Phone, identityCode: FromData.IdentityCode })

                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Update success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    const response = await axios.get(`http://localhost:5278/api/Account/ShowEmployee/${sessionData.ID}`)
                    setFromData({
                        FullName: response.data.fullName,
                        Email: response.data.email,
                        Address: response.data.address,
                        Phone: response.data.phone,
                        IdentityCode: response.data.identityCode
                    })
                } else {
                    setloading(false)
                    const responseBody = await response.json();
                    if (responseBody.message) {
                        Swal.fire({
                            icon: 'error',
                            title: responseBody.message || 'Failed to add genre',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card" style={{ height: 'auto' }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Employee</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={handleUpdate}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Full Name</label>
                                                <input type="text" class="form-control" value={FromData.FullName} onChange={(e) => setFromData({ ...FromData, FullName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Email</label>
                                                <input type="text" class="form-control" value={FromData.Email} onChange={(e) => setFromData({ ...FromData, Email: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Address</label>
                                                <input type="text" class="form-control" value={FromData.Address} onChange={(e) => setFromData({ ...FromData, Address: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Phone</label>
                                                <input type="text" class="form-control" value={FromData.Phone} onChange={(e) => setFromData({ ...FromData, Phone: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Identity Code</label>
                                                <input type="text" class="form-control" value={FromData.IdentityCode} onChange={(e) => setFromData({ ...FromData, IdentityCode: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                            </div>


                                            <button type="submit" class="btn btn-primary me-2">Submit</button>

                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <footer class="footer">
                        <div class="d-sm-flex justify-content-center justify-content-sm-between">
                            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023. Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="ti-heart text-danger ms-1"></i></span>
                        </div>
                    </footer>

                </div>


            </LayoutAdmin>




        </>
    )
}
export default EditProfile;