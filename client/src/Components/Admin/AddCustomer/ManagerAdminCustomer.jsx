import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import DatePicker from 'react-datepicker';
import Swal from 'sweetalert2';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import Pagination from 'react-paginate';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function ManagerAdminCustomer() {
    const [Dob, setDob] = useState(null);
    const [loading,setloading]=useState(true);
    const [UpdateDob, setUpdateDob] = useState(null);
    const handleDob = (date) => {
        setDob(date);
    }
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState(null);
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
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [IsCloginImage, setIsClosingImage] = useState(false)
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s',
        zindex: '1000000' // Default animation
    };
    const ImageViewstype = {
        animation: 'flipleft 0.5s',
        zindex: '1000000'
    }
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {

            setFromData({
                UpdateName: '',
                UpdateEmail: '',
                id: '',
                UpdateAdress: '',
                UpdatePhone: '',
                UpdateIdentityCode: ''
            })
            setUpdateDob(null)
            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const [imagePreView, setImagePreView] = useState(null);
    const [Customer, setCustomer] = useState([]);
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const fetchdata = async () => {
            try{
                const response = await axios.get("http://localhost:5278/api/Customer/ShowCustomer");
                setCustomer(response.data.result)
            }catch(error){
                console.log(error)
            }finally{
                setloading(false)
            }
     
        }
        fetchdata();
    }, [])
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const render = new FileReader();
            render.onloadend = () => {
                setImagePreView(render.result);
            }

            render.readAsDataURL(file);
            setFromData({
                ...FromData,
                Image: file,
            });
        }
    }

    const handleUpdateChange = (date) => {
        setUpdateDob(date)
    }
    const FilterCustomer = Customer.filter(Empl =>
        Empl.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastCustomer = (currentPage + 1) * perPage;
    const indexOfFirtCustomer = indexOflastCustomer - perPage;
    const currentCustomer = FilterCustomer.slice(indexOfFirtCustomer, indexOflastCustomer)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const [FromData, setFromData] = useState({
        FullName: '',
        Image: null,
        Email: '',
        Address: '',
        IdentityCode: '',
        Phone: '',
        UpdateName: '',
        UpdateEmail: '',
        id: '',
        UpdateAdress: '',
        UpdatePhone: '',
        UpdateIdentityCode: ''

    })
    const [previewImage, setPreviewImage] = useState(null);
    const hanleImageClick = (imageUrl) => {
        setPreviewImage(imageUrl)
    }
    const HandleEditClick = (IdCustomer) => {
        const SelectCustomer = Customer.find(Customer => Customer.id == IdCustomer);
        if (SelectCustomer) {
            FromData.UpdateName = SelectCustomer.fullName;
            FromData.UpdateAdress = SelectCustomer.address;
            FromData.UpdateEmail = SelectCustomer.email;
            FromData.id = SelectCustomer.id;
            FromData.UpdatePhone = SelectCustomer.phone;
            FromData.IdentityCode = SelectCustomer.IdentityCode;
            setUpdateDob(new Date(SelectCustomer.dob))
        }
        setPopupVisibility(true)
    }
    const AddCustomer = async (event) => {
        event.preventDefault();
        if (FromData.FullName == '' || Dob == null || FromData.Phone=='' || FromData.Email == '' || FromData.Address == '' || FromData.IdentityCode == '' || FromData.Image==null) {
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
                const formData = new FormData();
                const offsetInMilliseconds = 7 * 60 * 60 * 1000; // Vietnam's timezone offset from UTC in milliseconds (7 hours ahead)
                const vietnamStartDate = new Date(Dob.getTime() + offsetInMilliseconds);
                formData.append("FullName", FromData.FullName);
                formData.append("Dob", vietnamStartDate.toISOString().split('T')[0]);
                formData.append("Phone", FromData.Phone);
                formData.append("Email", FromData.Email);
                formData.append("Address", FromData.Address);
                formData.append("IndentityCode", FromData.IdentityCode);
                formData.append("Sign", FromData.Image)
                
                console.log("Form Data before sending:", Object.fromEntries(formData.entries()));

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
                        Image: null,
                        Email: '',
                        Address: '',
                        IdentityCode: '',
                        Phone: ''
                    })
                    const response = await axios.get("http://localhost:5278/api/Customer/ShowCustomer");
                    setCustomer(response.data.result)
                    setDob(null)
                    setImagePreView(null)
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
            } catch (error) {
                console.log(error)
            }
        }

    }
    const today = new Date();

    const MaxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    const handleUpdate = async (event) => {
        event.preventDefault();
        if (FromData.UpdateName==''  || FromData.UpdateEmail == '' || FromData.UpdateAdress == '' || FromData.UpdatePhone == '' || UpdateDob == null) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else if (FromData.UpdatePhone.length != 10) {
            Swal.fire({
                icon: 'error',
                title: 'Phone requires 10 digits',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            setloading(true);
            const offsetInMilliseconds = 7 * 60 * 60 * 1000; // Vietnam's timezone offset from UTC in milliseconds (7 hours ahead)
            const vietnamStartDate = new Date(UpdateDob.getTime() + offsetInMilliseconds);

            try {
                const response = await fetch(`http://localhost:5278/api/Customer/UpdateCustomer/${FromData.id}`, {
                    method: 'Put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName: FromData.UpdateName,
                        email: FromData.UpdateEmail,
                        address: FromData.UpdateAdress,
                        phone: FromData.UpdatePhone,
                        dob: vietnamStartDate.toISOString().split('T')[0]
                    })

                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Update Customer Success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setPopupVisibility(false)
                    setFromData({
                        UpdateName: '',
                        UpdateEmail: '',
                        id: '',
                        UpdateAdress: '',
                        UpdatePhone: '',
                        UpdateIdentityCode: ''
                    })
                    const response = await axios.get("http://localhost:5278/api/Customer/ShowCustomer");
                    setCustomer(response.data.result)
                    setUpdateDob(null);
                   
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
    const handleZoomIn = () => {
        const image = document.getElementById('preview-image');
        if (image) {
            image.style.width = (image.clientWidth * 1.2) + 'px';
        }
    };
    const handleClosePreview = () => {


        setIsClosingImage(true);

        setTimeout(() => {

            setPreviewImage(null)


            setIsClosingImage(false)
        }, 500);
    };
    const handleZoomOut = () => {
        const image = document.getElementById('preview-image');
        if (image) {
            image.style.width = (image.clientWidth / 1.2) + 'px'
        }
    }
    return (
        <>
       {loading &&(
         <div
         className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{zIndex:'10000'}}>
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
                                        <h4 class="card-title">Customer</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={AddCustomer}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Full Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={FromData.FullName} onChange={(e) => setFromData({ ...FromData, FullName: e.target.value })} placeholder="Full Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Birthday </label>
                                                <br />
                                                <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                                    className="form-control w-[100%]"
                                                    selected={Dob}
                                                    onChange={handleDob}
                                                    placeholderText="Select Birthday"
                                                    showYearDropdown
                                                    scrollableYearDropdown
                                                    yearDropdownItemNumber={83}

                                                    maxDate={MaxDate}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email </label>
                                                <input type="email" class="form-control" value={FromData.Email} onChange={(e) => setFromData({ ...FromData, Email: e.target.value })} id="exampleInputEmail1" placeholder="Email" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Address </label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" value={FromData.Address} onChange={(e) => setFromData({ ...FromData, Address: e.target.value })} placeholder="Address" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Phone</label>
                                                <input type="tel" class="form-control" id="exampleInputPassword1" placeholder="Phone" value={FromData.Phone} onChange={(e) => setFromData({ ...FromData, Phone: e.target.value })} />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Identity Code</label>
                                                <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Entity Code" value={FromData.IdentityCode} onChange={(e) => setFromData({ ...FromData, IdentityCode: e.target.value })} />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Sign</label>
                                                <input type="file" class="form-control" id="Sign" placeholder="Entity Code" onChange={(e) => handleImageChange(e)} />
                                                {imagePreView && (
                                                    <div className="image-preview">
                                                        <img src={imagePreView} alt="Preview" className="preview-image" />
                                                    </div>
                                                )}
                                            </div>


                                            <button type="submit" class="btn btn-primary me-2">Submit</button>

                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Employee</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter Full Name" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Full Name </th>
                                                        <th>Dob</th>
                                                        <th> Email </th>
                                                        <th> Address </th>
                                                        <th> Identity Code </th>
                                                        <th>Sign</th>
                                                        <th>Edit</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentCustomer.map((customer, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{customer.fullName}</td>
                                                            <td>{new Date(customer.dob).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{customer.email}</td>
                                                            <td>{customer.address}</td>
                                                            <td>{customer.indentityCode}</td>
                                                            <td><img src={customer.sign} width="100" height="100" style={{ objectFit: 'cover', width: '77%', height: '100%', borderRadius: '0%' }}
                                                                alt="" />
                                                                <br />
                                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => hanleImageClick(customer.sign)}>Preview</button>
                                                            </td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => HandleEditClick(customer.id)}>Edit</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterCustomer.length / perPage)}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={5}
                                                onPageChange={handlePageclick}
                                                containerClassName={'pagination'}
                                                activeClassName={'active'}
                                                previousClassName={'page-item'}
                                                previousLinkClassName={'page-link'}
                                                nextClassName={'page-item'}
                                                nextLinkClassName={'page-link'}
                                                breakClassName={'page-item'}
                                                breakLinkClassName={'page-link'}
                                                pageClassName={'page-item'}
                                                pageLinkClassName={'page-link'}

                                            />
                                            {previewImage && (
                                                <div className="preview-modal"      >
                                                    <div className="preview-content" style={IsCloginImage ? { ...ImageViewstype, ...closingAnimation } : ImageViewstype}>
                                                        <img src={previewImage} alt="Signature Preview" id="preview-image" />
                                                        <div className="preview-buttons">
                                                            <button onClick={handleClosePreview}>Close</button>
                                                            <button onClick={handleZoomIn}>Zoom In</button>
                                                            <button onClick={handleZoomOut}>Zoom out</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                        </div>
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


            {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div style={{ marginTop: '16px' }}>

                            <h3 className="box-title1">Edit Customer</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdate}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Full Name</label>
                                    <input type="text" class="form-control" value={FromData.UpdateName} onChange={(e) => setFromData({ ...FromData, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>
                                <div class="form-group">
                                    <label className='float-left'>Birthday</label>
                                    <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                        className="form-control w-[100%]"
                                        selected={UpdateDob}
                                        onChange={handleUpdateChange}
                                        placeholderText="Select Birthday"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={83}

                                        maxDate={MaxDate} />
                                </div>
                                <div class="form-group">
                                    <label className='float-left'>Email</label>
                                    <input type="email" class="form-control" value={FromData.UpdateEmail} onChange={(e) => setFromData({ ...FromData, UpdateEmail: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>
                                <div class="form-group">
                                    <label className='float-left'>Address</label>
                                    <input type="text" class="form-control" value={FromData.UpdateAdress} onChange={(e) => setFromData({ ...FromData, UpdateAdress: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>
                                <div class="form-group">
                                    <label className='float-left'>Phone</label>
                                    <input type="tel" class="form-control" value={FromData.UpdatePhone} onChange={(e) => setFromData({ ...FromData, UpdatePhone: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>


                            </div>

                            <div className="box-footer">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded ">Update</button>
                            </div>
                        </form>


                    </div>
                </div>
            )}


        </>
    )
}
export default ManagerAdminCustomer;