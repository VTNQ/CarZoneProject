import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Select from "react-select"
import axios from 'axios'
import Cookies from 'js-cookie'
import Pagination from 'react-paginate';
function AddEmployee() {

    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [loading, setloading] = useState(true)
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
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {



            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const location = useLocation();
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState(null);
    const[CookieData,setCookieData]=useState(null);
    const EmployeeCookie=()=>{
        const CookieSession=Cookies.get("EmployeeInfo");
     
        if(CookieSession){
            return JSON.parse(CookieSession);
        }
        return null;
    }
    useEffect(()=>{
        const data=EmployeeCookie();
        if(data){
            setCookieData(data);
        }
    },[]);

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

    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);


    const [FromData, setFromData] = useState({
        FullName: '',
        Email: '',
        Address: '',
        Phone: '',
        IdentityCode: '',
        UpdateName: '',
        UpdateEmail: '',
        id: '',
        UpdateAdress: '',
        UpdatePhone: '',
        UpdateIdentityCode: ''
    })
    const [Employee, setEmployee] = useState([]);
    useEffect(() => {
      
            const fetchdata = async () => {
                try {
                const response = await axios.get(`http://localhost:5278/api/Employee/GetEmployee/${sessionData.idShowroom}`);
                setEmployee(response.data.result)
                
            }catch(error){
                console.log(error)
            }finally{
                setloading(false)
            }
        }
            if (sessionData && sessionData.idShowroom) {
                fetchdata()
            }
    
          
        


    }, [sessionData])
    const FilterEmployee = Employee.filter(Empl =>
        Empl.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastEmployee = (currentPage + 1) * perPage;
    const indexOfFirtEmployee = indexOflastEmployee - perPage;
    const currentEmployee = FilterEmployee.slice(indexOfFirtEmployee, indexOflastEmployee)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const handleEditClick = (IdEmployee) => {
        const SelectedEmployee = Employee.find(Employee => Employee.id == IdEmployee)
        if (SelectedEmployee) {
            FromData.UpdateName = SelectedEmployee.fullName;
            FromData.UpdateAdress = SelectedEmployee.address;
            FromData.UpdateEmail = SelectedEmployee.email;
            FromData.id = SelectedEmployee.id;
            FromData.UpdatePhone = SelectedEmployee.phone;
            FromData.IdentityCode = SelectedEmployee.IdentityCode;
        }
        setPopupVisibility(true)
    }
    const handleUpdateEmployee = async (event) => {
        event.preventDefault();
        if(FromData.UpdateName=='' || FromData.UpdateEmail=='' || FromData.UpdateAdress=='' || FromData.UpdatePhone==''){
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        }else{
            try {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Employee/UpdateEmployee/${FromData.id}`, {
                    method: 'Put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName: FromData.UpdateName,
                        email: FromData.UpdateEmail,
                        address: FromData.UpdateAdress,
                        phone: FromData.UpdatePhone
                    })
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Add success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setPopupVisibility(false)
                    setFromData({
                        UpdateEmail: '',
                        id: '',
                        UpdateAdress: '',
                        UpdatePhone: '',
                        UpdateIdentityCode: ''
                    })
                    const response = await axios.get(`http://localhost:5278/api/Employee/GetEmployee/${sessionData.idShowroom}`);
                  
                    setEmployee(response.data.result)
    
                }
            } catch (error) {
                console.log(error)
            }
        }
      
    }
    const handleOnsubmit = async (event) => {
        event.preventDefault();
        try {
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
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Employee/AddEmployee`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName: FromData.FullName,
                        email: FromData.Email,
                        address: FromData.Address,
                        phone: FromData.Phone,
                        identityCode: FromData.IdentityCode,
                        idShowroom: sessionData.idShowroom ,


                    }),
                })
                if (response.ok) {
                    setloading(false)
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Add success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setFromData({
                        FullName: '',
                        Email: '',
                        Address: '',
                        Phone: '',
                        IdentityCode: ''
                    })
                   
                   
                    const response = await axios.get(`http://localhost:5278/api/Employee/GetEmployee/${sessionData.idShowroom}`);
                  
                    setEmployee(response.data.result)
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

        } catch (error) {
            console.log(error)
        }
    }
    const handleResetPassword = async (IdEmployee) => {

        try {
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Reset Password',
            });
            if (confirmation.isConfirmed) {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Employee/ResetPassword/${IdEmployee}`, {
                    method: 'Put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    setloading(false)
                    const existingCookie = document.cookie.replace(/(?:(?:^|.*;\s*)employeeId\s*=\s*([^;]*).*$)|^.*$/, "$1");
                    const ids = existingCookie ? existingCookie.split(',') : [];
                    ids.push(IdEmployee);
                    const updatedCookieValue = ids.join(',');
                    const expirationTime = new Date(new Date().getTime() + 1 * 3600 * 1000).toUTCString();
                    document.cookie = `employeeId=${updatedCookieValue}; expires=${expirationTime}; path=/`;
                    Swal.fire({
                        icon: 'success',
                        title: 'Reset successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get(`http://localhost:5278/api/Employee/GetEmployee/${sessionData.idShowroom}`);
                  
                    setEmployee(response.data.result)
                } else {
                    setloading(false)
                    const responseBody = await response.json();
                    Swal.fire({
                        icon: 'error',
                        title: 'Deletion failed',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    const isEmployeeIdInCookie = (employeeId) => {
        const existingCookie = document.cookie.replace(/(?:(?:^|.*;\s*)employeeId\s*=\s*([^;]*).*$)|^.*$/, "$1");
        const ids = existingCookie.split(',');
        return ids.includes(employeeId.toString());
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
                                        <form class="forms-sample" onSubmit={handleOnsubmit}>

                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Full Name</label>
                                                <input type="text" class="form-control" value={FromData.FullName} onChange={(e) => setFromData({ ...FromData, FullName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Email </label>
                                                <input type="email" class="form-control" value={FromData.Email} onChange={(e) => setFromData({ ...FromData, Email: e.target.value })} id="exampleInputEmail1" placeholder="Email" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Address </label>
                                                <input type="text" class="form-control" value={FromData.Address} onChange={(e) => setFromData({ ...FromData, Address: e.target.value })} id="exampleInputEmail1" placeholder="Address" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Phone</label>
                                                <input type="text" class="form-control" id="exampleInputPassword1" value={FromData.Phone} onChange={(e) => setFromData({ ...FromData, Phone: e.target.value })} placeholder="Phone" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputPassword1">Identity Code</label>
                                                <input type="number" class="form-control" id="exampleInputPassword1" value={FromData.IdentityCode} onChange={(e) => setFromData({ ...FromData, IdentityCode: e.target.value })} placeholder="Entity Code" />
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
                                            <input type="text" class="form-control" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} id="exampleInputUsername1" placeholder="Enter Full Name" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Full Name </th>
                                                        <th> Email </th>
                                                        <th> Address </th>
                                                        <th> Identity Code </th>
                                                        <th>Edit</th>
                                                        <th>Reset</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentEmployee.map((Emp, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{Emp.fullName}</td>
                                                            <td>{Emp.email}</td>
                                                            <td>{Emp.address}</td>
                                                            <td>{Emp.identityCode}</td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(Emp.id)}>Edit</button></td>
                                                            <td><button  disabled={isEmployeeIdInCookie(Emp.id)}   style={{
                                                                        opacity: isEmployeeIdInCookie(Emp.id) ? 0.5 : 1,
                                                                        cursor: isEmployeeIdInCookie(Emp.id) ? 'not-allowed' : 'pointer'
                                                                    }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleResetPassword(Emp.id)}>Reset</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterEmployee.length / perPage)}
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

                            <h3 className="box-title1">Edit Employee</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdateEmployee}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Full Name</label>
                                    <input type="text" class="form-control" value={FromData.UpdateName} onChange={(e) => setFromData({ ...FromData, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
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
                                    <input type="text" class="form-control" value={FromData.UpdatePhone} onChange={(e) => setFromData({ ...FromData, UpdatePhone: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
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
export default AddEmployee;