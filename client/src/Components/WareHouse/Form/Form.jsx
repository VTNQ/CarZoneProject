import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import Swal from 'sweetalert2';
import Pagination from 'react-paginate';
import axios from "axios";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
function Form() {
    const [FromData, setFromData] = useState({
        Name: '',
        id: '',
        UpdateName: ''
    })
    const [loading,setloading]=useState(true);
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState(null);
  const getUserSession=()=>{
    const UserSession=Cookies.get("UserSession");
    if(UserSession){
        return JSON.parse(UserSession);
    }
    return null;
}

useEffect(() => {
    const data = getUserSession();
    
    if (data && data.role=='WareHouse') {
        setSessionData(data);
    } else {
        // If no session data, redirect to login
        navigate('/login');
    }
}, [navigate]);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
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
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {

            setFromData({
                id: '',
                UpdateName: ''
            })

            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const [Form, setForm] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Form/ShowForm");
                setForm(response.data.result)
            } catch (error) {
                console.log(error)
            }finally{
                setloading(false)
            }
        }
        fetchdata();
    }, [])
    const handleEditClick = (ID) => {
        const SelectForm = Form.find(form => form.id == ID)
        if (SelectForm) {
            FromData.id = SelectForm.id;
            FromData.UpdateName = SelectForm.name;
        }
        setPopupVisibility(true)
    }
    const handleUpdateForm = async (event) => {
        event.preventDefault();
        if (FromData.UpdateName == '') {
            Swal.fire({
                icon: 'error',
                title: 'Name is required',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Form/UpdateForm/${FromData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FromData.UpdateName })
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Update Form success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setFromData({
                        id: '',
                        UpdateName: ''
                    })
                    setPopupVisibility(false)
                    const response = await axios.get("http://localhost:5278/api/Form/ShowForm");
                    setForm(response.data.result)
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
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (FromData.Name == '') {
            Swal.fire({
                icon: 'error',
                title: 'Name is required',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch("http://localhost:5278/api/Form/AddForm", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FromData.Name })
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Form success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setFromData({
                        Name: ''
                    })
                    const response = await axios.get("http://localhost:5278/api/Form/ShowForm");
                    setForm(response.data.result)
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
    const DeleteSubmit = async (ID) => {
        try {
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Delete it',
            });
            if (confirmation.isConfirmed) {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Form/DeleteForm/${ID}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion Form successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get("http://localhost:5278/api/Form/ShowForm");
                    setForm(response.data.result)
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
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const FilterForm = Form.filter(form =>
        form.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const IndexoflastForm = (currentPage + 1) * perPage;
    const indexOfFirtSupplier = IndexoflastForm - perPage;
    const CurrentForm = FilterForm.slice(indexOfFirtSupplier, IndexoflastForm)
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
                                        <h4 class="card-title">Form</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={handleSubmit}>

                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Name </label>
                                                <input type="text" class="form-control" id="exampleInputEmail1" value={FromData.Name} onChange={(e) => setFromData({ ...FromData, Name: e.target.value })} placeholder="Enter Name" />
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
                                        <h4 class="card-title">Form</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter Name Form" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th>Name</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentForm.map((form, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{form.name}</td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(form.id)}>Edit</button></td>
                                                            <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => DeleteSubmit(form.id)}>Delete</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>



                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterForm.length / perPage)}
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

                            <h3 className="box-title1">Edit Form</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdateForm}>
                            <div className="box-body">


                                <div class="form-group">
                                    <label className='float-left'>Name</label>
                                    <input type="text" class="form-control" value={FromData.UpdateName} onChange={(e) => setFromData({ ...FromData, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Enter Name" />
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
export default Form;