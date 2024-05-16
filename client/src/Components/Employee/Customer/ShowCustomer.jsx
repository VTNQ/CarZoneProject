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
    UpdateDOB:'',
})
const navigate = useNavigate();
const location = useLocation();
const username = location.state?.fullName || '';
const email = location.state?.email || '';
const idShowroom = location.state?.idShowroom || '';
const [Employee, setEmployee] = useState([]);
useEffect(() => {
    const fetchdata = async () => {
        const response = await axios.get(`http://localhost:5278/api/Employee/GetEmployee/${idShowroom}`);
        setEmployee(response.data)
    }
    fetchdata()
}, [])
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
            const response = await fetch(`http://localhost:5278/api/Employee/ResetPassword/${IdEmployee}`,{
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
const currentEmployee = FilterEmployee.slice(indexOfFirtEmployee, indexOflastEmployee)
const handlePageclick = (data) => {
    setCurrentPage(data.selected);
};
const indexOflastEmployee = (currentPage + 1) * perPage;
const indexOfFirtEmployee = indexOflastEmployee - perPage;
const [isPopupVisible, setPopupVisibility] = useState(false);
const handleEditClick = (id) => {
    const SelectCustomer = Customer.find(Customer => Customer.id == id)
    if (SelectCustomer) {
        FromData.id = SelectCustomer.id;
        FromData.UpdateName = SelectCustomer.name;
        FromData.UpdateAdress = SelectCustomer.address;
        FromData.UpdateEmail = SelectCustomer.email;
        FromData.UpdatePhone = SelectCustomer.phone;
        FromData.IdentityCode = SelectCustomer.IdentityCode;
        FromData.Sign = SelectCustomer.Sign
        FromData.DOB = SelectCustomer.DOB;
    }
    setPopupVisibility(true)
}
    return (
        <LayoutEmployee>
            <div className="row">
                <div class="col-lg-12 grid-margin stretch-card">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Employee</h4>
                            <form class="forms-sample">
                                <label for="exampleInputUsername1">Search</label>
                                <input type="text" class="form-control" value={searchTerm}
                                       onChange={(e) => setSearchtem(e.target.value)} id="exampleInputUsername1"
                                       placeholder="Enter Full Name"/>
                            </form>
                            <p class="card-description">
                            </p>
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th> #</th>
                                        <th> Full Name</th>
                                        <th> Email</th>
                                        <th> Address</th>
                                        <th> Identity Code</th>
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
                                            <td>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                    onClick={() => handleEditClick(Emp.id)}>Edit
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                    onClick={() => handleResetPassword(Emp.id)}>Reset
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
        </LayoutEmployee>
    )
}

export default ShowCustomer;