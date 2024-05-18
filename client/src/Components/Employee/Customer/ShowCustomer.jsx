import React, { useEffect, useState } from "react";
import LayoutEmployee from "../Layout/Layout";
import Pagination from "react-paginate";
import axios from "axios";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from "react-router-dom";
function ShowCustomer() {
    const [Customer, setCustomer] = useState([]);
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
        UpdateIdentityCode: '',
        UpdateDOB: '',
    })
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.fullName || '';
    const email = location.state?.email || '';
    const idShowroom = location.state?.idShowroom || '';
    const [Employee, setEmployee] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(`http://localhost:5278/api/Customer/ShowCustomer`);
            setEmployee(response.data)
        }
        fetchdata()
    }, [])
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
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
    const FilterEmployee = Employee.filter(Empl =>
        Empl.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
                const response = await fetch(`http://localhost:5278/api/Employee/ResetPassword/${IdEmployee}`, {
                    method: 'Put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Reset successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
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

    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };

    const indexOflastEmployee = (currentPage + 1) * perPage;
    const indexOfFirtEmployee = indexOflastEmployee - perPage;
    const currentEmployee = FilterEmployee.slice(indexOfFirtEmployee, indexOflastEmployee)
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const handleEditClick = (id) => {
        const SelectCustomer = Employee.find(Customer => Customer.id == id)
        if (SelectCustomer) {
            FromData.id = SelectCustomer.id;
            FromData.UpdateName = SelectCustomer.fullName;
            FromData.UpdateAdress = SelectCustomer.address;
            FromData.UpdateEmail = SelectCustomer.email;
            FromData.UpdatePhone = SelectCustomer.phone;

            FromData.UpdateDOB = SelectCustomer.dob;
        }
        setPopupVisibility(true)
    }
    return (
        <>
            <LayoutEmployee>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Employee</h4>
                                        <form class="forms-sample">
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" value={searchTerm}
                                                onChange={(e) => setSearchtem(e.target.value)} id="exampleInputUsername1"
                                                placeholder="Enter Full Name" />
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
                                                    {currentEmployee.map((Emp, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{Emp.fullName}</td>
                                                            <td>{new Date(Emp.dob).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{Emp.email}</td>
                                                            <td>{Emp.address}</td>
                                                            <td>{Emp.indentityCode}</td>
                                                            <td><img src={Emp.sign} width="100" height="100" style={{ objectFit: 'cover', width: '77%', height: '100%', borderRadius: '0%' }}
                                                                alt="" />
                                                                <br />

                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                    onClick={() => handleEditClick(Emp.id)}>Edit
                                                                </button>
                                                            </td>

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
                </div>

            </LayoutEmployee>
            {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div style={{ marginTop: '16px' }}>

                            <h3 className="box-title1">Edit Customer</h3>
                        </div>
                        <form role="form" >
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Full Name</label>
                                    <input type="text" class="form-control" value={FromData.UpdateName} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>
                                <div class="form-group">
                                    <label className='float-left'>Birthday</label>
                                    <DatePicker name='Birthday' dateFormat="dd/MM/yyyy"
                                        className="form-control w-[100%]"

                                        selected={FromData.UpdateDOB}
                                        placeholderText="Select Birthday"
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={83}

                                    />
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

export default ShowCustomer;