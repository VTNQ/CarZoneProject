import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function AddCustomer() {
    const [Dob, setDob] = useState('');
    const [sessionData, setSessionData] = useState(null);
    const HandleDob = (event) => {
        setDob(event.target.value);
    };
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession);
        }
        return null;
    }

    useEffect(() => {
        const data = getUserSession();

        if (data &&  data.role=='Superadmin') {
            setSessionData(data);
        } else {
            navigate('/login');
        }
    }, [navigate]);
    const [FromData, setFromData] = useState({
        FullName: '',
        Email: '',
        Phone: '',
        Address: '',
        IdentityCode: '',
        Sign: null

    })
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFromData({
                ...FromData,
                Sign: file,
            });
        }
    }
    const HandleOnSubmit = async (event) => {
        event.preventDefault();
        if (FromData.FullName == '' || FromData.Phone == '' || FromData.Address == '' || FromData.Email == '' || FromData.IdentityCode == '' || FromData.Sign == null || Dob == '') {
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
            setloading(true)
            const formData = new FormData();
            const vietnamStartDate = new Date(Dob);
            console.log(vietnamStartDate.toISOString().split('T')[0]);
            formData.append("fullName", FromData.FullName);
            formData.append("Dob", vietnamStartDate.toISOString().split('T')[0])
            formData.append("Phone", FromData.Phone);
            formData.append("Email", FromData.Email);
            formData.append("Address", FromData.Address);
            formData.append("IndentityCode", FromData.IdentityCode);
            formData.append("Sign", FromData.Sign);

            const response = await fetch("http://localhost:5278/api/Customer/AddCustomer", {
                method: 'POST',

                body: formData
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Add Customer Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFromData({
                    FullName: '',
                    Email: '',
                    Phone: '',
                    Address: '',
                    IdentityCode: '',
                    Sign: null

                })
                setDob('')
                document.getElementById('Sign').value = '';
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
        }
    }
    const today = new Date();

    const MaxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    const maxDateString = MaxDate.toISOString().split('T')[0];
    return (
        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
       
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card" style={{ height: 'auto' }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Add Customer</h4>
                                        <form className="forms-sample" onSubmit={HandleOnSubmit}>
                                            <div classname="form-group">
                                                <label htmlFor="exampleInputIndentity1">Indentity Code</label>
                                                <input type="text" className="form-control" id="exampleInputIndentity1"
                                                    placeholder="Indentity Code" value={FromData.IdentityCode} onChange={(e) => setFromData({ ...FromData, IdentityCode: e.target.value })} /></div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputFullName1">Full Name</label>
                                                <input type="text" className="form-control" value={FromData.FullName} onChange={(e) => setFromData({ ...FromData, FullName: e.target.value })} id="exampleInputFullName1"
                                                    placeholder="Full Name" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input type="email" className="form-control" value={FromData.Email} onChange={(e) => setFromData({ ...FromData, Email: e.target.value })} id="exampleInputEmail1"
                                                    placeholder="Email" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleInputPhone1">Phone</label>
                                                <input type="tel" className="form-control"
                                                    id="exampleInputPhone1" placeholder="Phone" value={FromData.Phone} onChange={(e) => setFromData({ ...FromData, Phone: e.target.value })} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputAddress1">Address</label>
                                                <input type="text" className="form-control"
                                                    id="exampleInputAddress1" placeholder="Address" value={FromData.Address} onChange={(e) => setFromData({ ...FromData, Address: e.target.value })} />
                                            </div>
                                            <div>
                                                <label htmlFor="exampleInputDate1">Date Of BirthDay</label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="exampleInputDate1"
                                                    value={Dob}
                                                    onChange={HandleDob}
                                                    max={maxDateString}
                                                />
                                            </div>
                                            <br />
                                            <div>
                                                <label htmlFor="exampleInputDate1">Sign</label>
                                                <input type="file" className="form-control" id="Sign" onChange={(e) => handleImageChange(e)} />
                                            </div>
                                            <br />
                                            <button type="submit" className="btn btn-primary me-2">Submit</button>
                                            <button className="btn btn-light">Cancel</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <footer className="footer">
                        <div className="d-sm-flex justify-content-center justify-content-sm-between">
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023. Premium <a
                                href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i
                                className="ti-heart text-danger ms-1"></i></span>
                        </div>
                    </footer>

                </div>


          
        </>
    )
}

export default AddCustomer;
