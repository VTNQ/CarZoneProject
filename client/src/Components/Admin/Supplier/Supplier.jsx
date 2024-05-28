import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import Select from "react-select"
import axios from "axios";
import Swal from 'sweetalert2';
import Pagination from 'react-paginate';
function Supplier() {
    const [Country, setCountry] = useState([])
    const options = [
        { value: 0, label: "Enterprise" },
        { value: 1, label: "individual" }
    ]
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [FromData, setFromData] = useState({
        name: '',
        id: '',
        UpdateName: '',
        Email:'',
        UpdateEmail:'',
    })
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
            setFromData({
                id: '',
                UpdateName: ''
            })
            setUpdateSelectCountry(null);
            setUpdateSelectType(null);


            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const [UpdateSelectCountry, setUpdateSelectCountry] = useState(null);
    const [UpdateSelectType, setUpdateSelectType] = useState(null)
    const handleEditClick = (id) => {
        const SelctSsupplier = Supplier.find(Sul => Sul.id == id)
        if (SelctSsupplier) {
            FromData.UpdateName = SelctSsupplier.name;
            FromData.id = SelctSsupplier.id;
            FromData.UpdateEmail=SelctSsupplier.email;
            setUpdateSelectCountry(SelctSsupplier.idCountry)
            setUpdateSelectType(SelctSsupplier.type)

        }


        setPopupVisibility(true)
    }
    const handleUpdateSelectCountry = (event) => {
        setUpdateSelectCountry(event.target.value)
    }
    const HandleUpdateType = (event) => {
        setUpdateSelectType(event.target.value)
    }
    const [Supplier, setSupplier] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Supplier/ShowSupplier")
                setSupplier(response.data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const FilterSupplier = Supplier.filter(Sup =>
        Sup.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastSupplier = (currentPage + 1) * perPage;
    const indexOfFirtSupplier = indexOflastSupplier - perPage;
    const currentSupplier = FilterSupplier.slice(indexOfFirtSupplier, indexOflastSupplier)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const [SelectCountry, setSelectCountry] = useState(null);
    const [SelectType, SetSelectType] = useState(null);
    const HandleSelectType = (SelectType) => {
        SetSelectType(SelectType)
    }
    const HandleSelectCountry = (SelectCountry) => {
        setSelectCountry(SelectCountry)
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Supplier/ShowCountry");
                setCountry(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const DeleteSuppier = async (IDsuppier) => {
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
                const response = await fetch(`http://localhost:5278/api/Supplier/DeleteSupplier/${IDsuppier}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get("http://localhost:5278/api/Supplier/ShowSupplier")
                    setSupplier(response.data)

                }else{
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
    const SubmitSupplier = async (event) => {
        event.preventDefault();
        if (FromData.name == '' || SelectType?.label == null || SelectCountry?.value == null  || FromData.Email=='') {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                const response = await fetch("http://localhost:5278/api/Supplier/AddSupplier", {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: FromData.name,
                        type: SelectType?.label,
                        idCountry: SelectCountry?.value,
                        email:FromData.Email
                    })
                })
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Supplier Success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setFromData({
                        name: '',
                        Email:''
                    })
                    setSelectCountry(null)
                    SetSelectType(null)
                    const response = await axios.get("http://localhost:5278/api/Supplier/ShowSupplier")
                    setSupplier(response.data)
                } else {
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
    const handleUpdate = async (event) => {
        event.preventDefault();
        if (FromData.UpdateName == '' || FromData.UpdateEmail=='') {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                const response = await fetch(`http://localhost:5278/api/Supplier/UpdateSupplier/${FromData.id}`, {
                    method: 'Put',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: FromData.UpdateName,
                        type: UpdateSelectType,
                        idCountry: UpdateSelectCountry,
                        email:FromData.UpdateEmail
                    })

                })
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Supplier Success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setFromData({
                        id: '',
                        UpdateName: ''
                    })
                    setPopupVisibility(false)
                    setUpdateSelectCountry(null);
                    setUpdateSelectType(null);
                    const response = await axios.get("http://localhost:5278/api/Supplier/ShowSupplier")
                    setSupplier(response.data)
                    
                } else {
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
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card" style={{ height: 'auto' }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Supplier</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={SubmitSupplier}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Name</label>
                                                <input type="text" class="form-control" value={FromData.name} onChange={(e) => setFromData({ ...FromData, name: e.target.value })} id="exampleInputUsername1" placeholder="Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Email</label>
                                                <input type="text" class="form-control" value={FromData.Email} onChange={(e) => setFromData({ ...FromData, Email: e.target.value })} id="exampleInputUsername1" placeholder="Email" />
                                            </div>
                                            <div class="form-group" >
                                                <label for="exampleInputUsername1">Type</label>
                                                <Select options={options.map(type => ({ value: type.id, label: type.label }))}
                                                    value={SelectType}
                                                    onChange={(SelectedOption) => HandleSelectType(SelectedOption)}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Country</label>
                                                <Select options={Country.map(Countries => ({ value: Countries.id, label: Countries.name }))}
                                                    onChange={(SelectedOption) => HandleSelectCountry(SelectedOption)}
                                                    value={SelectCountry}
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
                                        <h4 class="card-title">Supplier</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter  Name" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Type</th>
                                                        <th>Country</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentSupplier.map((supplier, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{supplier.name}</td>
                                                            <td>{supplier.email}</td>
                                                            <td>{supplier.type}</td>
                                                            <td>{supplier.country}</td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(supplier.id)}>Edit</button></td>
                                                            <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => DeleteSuppier(supplier.id)}>Delete</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterSupplier.length / perPage)}
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

                            <h3 className="box-title1">Edit Supplier</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdate}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Name</label>
                                    <input type="text" class="form-control" value={FromData.UpdateName} onChange={(e) => setFromData({ ...FromData, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>
                                <div class="form-group">
                                    <label className='float-left'>Email</label>
                                    <input type="text" class="form-control" value={FromData.UpdateEmail} onChange={(e) => setFromData({ ...FromData, UpdateEmail: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>

                                <div class="form-group">
                                    <label className='float-left'>Country</label>
                                    <br />
                                    <select className="form-select" aria-label="Default select example" value={UpdateSelectCountry} onChange={handleUpdateSelectCountry}>
                                        {Country.map((country, index) => (
                                            <option value={country.id} selected={country.id == UpdateSelectCountry}>{country.name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div class="form-group">
                                    <label className='float-left'>Type</label>
                                    <br />
                                    <select className="form-select" aria-label="Default select example" value={UpdateSelectType} onChange={HandleUpdateType}>
                                        {options.map((country, index) => (
                                            <option value={country.label} selected={country.label == UpdateSelectType}>{country.label}</option>
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



        </>
    )
}
export default Supplier;