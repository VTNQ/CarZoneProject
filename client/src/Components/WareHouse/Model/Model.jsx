import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import Select from "react-select"
import Swal from 'sweetalert2';
import axios from "axios";
import Pagination from 'react-paginate';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
function Model() {
    const [Brand, setBrand] = useState([]);
    const [SelectBrand, SetSelectBrand] = useState(null)
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

        if (data && data.role == 'WareHouse') {
            setSessionData(data);
        } else {
            // If no session data, redirect to login
            navigate('/login');
        }
    }, [navigate]);
    const handleSelectBrand = (SelectBrand) => {
        SetSelectBrand(SelectBrand)
    }
    const [Model, setModel] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Model/ShowModel");
                setModel(response.data.result)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchdata();
    }, [])
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const filterModel = Model.filter(model =>
        model.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexoflastModel = (currentPage + 1) * perPage;
    const indexOfFirtModel = indexoflastModel - perPage;
    const CurrentModel = filterModel.slice(indexOfFirtModel, indexoflastModel)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Model/ShowBrand");
                setBrand(response.data.result);
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const SubmitBrand = async (event) => {
        event.preventDefault();
        if (FromData.name == '' || SelectBrand?.value == null) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch("http://localhost:5278/api/Model/AddModel", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FromData.name, idBrand: SelectBrand?.value })
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Model Success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setFromData({
                        name: ''
                    })

                    SetSelectBrand(null)
                    const response = await axios.get("http://localhost:5278/api/Model/ShowModel");
                    setModel(response.data.result)
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
    const [FromData, setFromData] = useState({
        id: '',
        name: '',
        updateName: ''
    })
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [UpdateBrand, setUpdateBrand] = useState(null);
    const handleEditClick = (ID) => {
        const SelectModel = Model.find(model => model.id == ID);
        if (SelectModel) {
            FromData.id = SelectModel.id;
            FromData.updateName = SelectModel.name;
            setUpdateBrand(SelectModel.idBrand)
        }
        setPopupVisibility(true)
    }
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
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
    const SelectUpdateBrand = (event) => {
        setUpdateBrand(event.target.value);
    }
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {

            setFromData({
                id: '',
                UpdateName: ''
            })
            setUpdateBrand(null)
            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
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
                const response = await fetch(`http://localhost:5278/api/Model/DeleModel/${ID}`, {
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
                    const response = await axios.get("http://localhost:5278/api/Model/ShowModel");
                    setModel(response.data.result)
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
    const handleUpdate = async (event) => {
        event.preventDefault();
        if (FromData.updateName == '' || UpdateBrand == null) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Model/UpdateModel/${FromData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FromData.updateName, idBrand: UpdateBrand })
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Update Model Success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setFromData({
                        id: '',
                        UpdateName: ''
                    })
                    setUpdateBrand(null)
                    setPopupVisibility(false)
                    const response = await axios.get("http://localhost:5278/api/Model/ShowModel");
                    setModel(response.data.result)
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
                                        <h4 class="card-title">Model</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={SubmitBrand}>

                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Name </label>
                                                <input type="text" class="form-control" value={FromData.name} onChange={(e) => setFromData({ ...FromData, name: e.target.value })} id="exampleInputEmail1" placeholder="Enter Name" />
                                            </div>
                                            <div class="form-group" >
                                                <label for="exampleInputUsername1">Brand</label>
                                                <Select options={Brand.map(brand => ({ value: brand.id, label: brand.name }))}
                                                    value={SelectBrand}
                                                    onChange={(SelectedOption) => handleSelectBrand(SelectedOption)}
                                                />
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
                                        <h4 class="card-title">Model</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} id="exampleInputUsername1" placeholder="Enter Name Model" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th>Name</th>
                                                        <th>Brand</th>
                                                        <th>Edit</th>
                                                        <th>Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentModel.map((model, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{model.name}</td>
                                                            <td>{model.brand}</td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(model.id)}>Edit</button></td>
                                                            <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded" onClick={() => DeleteSubmit(model.id)}>Delete</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(filterModel.length / perPage)}
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

                {isPopupVisible && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div style={{ marginTop: '16px' }}>

                                <h3 className="box-title1">Edit Brand</h3>
                            </div>
                            <form role="form" onSubmit={handleUpdate}>
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div class="form-group">
                                        <label className='float-left'>Name</label>
                                        <input type="text" class="form-control" value={FromData.updateName} onChange={(e) => setFromData({ ...FromData, updateName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                    </div>


                                    <div class="form-group">
                                        <label className='float-left'>Brand</label>
                                        <br />
                                        <select className="form-select" aria-label="Default select example" value={UpdateBrand} onChange={SelectUpdateBrand}>
                                            {Brand.map((brand, index) => (
                                                <option value={brand.id} selected={brand.id == UpdateBrand}>{brand.name}</option>
                                            ))}
                                        </select>

                                    </div>


                                </div>

                                <div className="box-footer">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded ">Update</button>
                                </div>
                            </form>


                        </div>
                    </div>
                )}



            </LayoutAdmin>




        </>
    )
}
export default Model;