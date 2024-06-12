import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import { ChromePicker } from 'react-color'
import Swal from 'sweetalert2';
import axios from "axios";
import Pagination from 'react-paginate';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function Color() {
    const [color, setColor] = useState('');
    const [UpdateColor, setUpdateColor] = useState('');
    const [loading, setloading] = useState(true)
    const [ShowColor, setShowColor] = useState([]);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
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
    const [FromData, setFromData] = useState({
        id: ''
    })
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
    const handleChangeComplete = (newColor) => {
        setColor(newColor.hex);
    };
    const HandleChangeUpdateComplete = (UpdateColor) => {
        setUpdateColor(UpdateColor.hex)
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Color/ShowColor");
                setShowColor(response.data.result)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchdata();
    }, [])
    const handleDeleteColor = async (ID) => {
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
                
                const response = await fetch(`http://localhost:5278/api/Color/DeleteColor/${ID}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get("http://localhost:5278/api/Color/ShowColor");
                    setShowColor(response.data.result)
                }else{
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
    const handleEditClick = async (id) => {
        const SelectColor = ShowColor.find(color => color.id == id);
        if (SelectColor) {
            setUpdateColor(SelectColor.name)
            FromData.id = SelectColor.id
        }
        setPopupVisibility(true)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (color == '') {
            Swal.fire({
                icon: 'error',
                title: 'Color is required',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch("http://localhost:5278/api/Color/AddColor", {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: color
                    })
                })

                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Color success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    setColor('')
                    const response = await axios.get("http://localhost:5278/api/Color/ShowColor");
                    setShowColor(response.data.result)
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
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setUpdateColor('')
            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setperPage] = useState(5);

    const filterColor = ShowColor.filter(Sup =>
        Sup.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastSupplier = (currentPage + 1) * perPage;
    const indexOfFirtSupplier = indexOflastSupplier - perPage;
    const currentSupplier = filterColor.slice(indexOfFirtSupplier, indexOflastSupplier)
    const handleUpdateColor = async (event) => {
        event.preventDefault();

        try {
            setloading(true)
            const response = await fetch(`http://localhost:5278/api/Color/UpdateColor/${FromData.id}`, {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: UpdateColor
                })
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Update Color success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setUpdateColor('');
                setPopupVisibility(false)
                const response = await axios.get("http://localhost:5278/api/Color/ShowColor");
                setShowColor(response.data.result)
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
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
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
                                        <h4 class="card-title">Color</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={handleSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Color</label>
                                                <ChromePicker
                                                    color={color}
                                                    onChangeComplete={handleChangeComplete}
                                                />
                                                <div style={{
                                                    backgroundColor: color,
                                                    width: '100px',
                                                    height: '100px',
                                                    marginTop: '10px',
                                                    border: '1px solid #000'
                                                }}></div>

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
                                        <h4 class="card-title">Color</h4>
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
                                                        <th>Color</th>
                                                        <th>Edit</th>
                                                        <th>Delete</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentSupplier.map((color, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td><div
                                                                style={{
                                                                    backgroundColor: color.name,
                                                                    width: '64px',
                                                                    height: '62px',
                                                                    marginTop: '10px',
                                                                    border: '1px solid #000',
                                                                    borderRadius: '40px'
                                                                }}></div></td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(color.id)}>Edit</button></td>
                                                            <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded" onClick={() => handleDeleteColor(color.id)}>Delete</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(filterColor.length / perPage)}
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

                            <h3 className="box-title1">Edit Color</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdateColor}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Color</label>
                                    <ChromePicker
                                        color={UpdateColor}
                                        onChangeComplete={HandleChangeUpdateComplete}
                                    />
                                    <label className='float-left'>Preview</label>
                                    <br />
                                    <div style={{
                                        backgroundColor: UpdateColor,
                                        width: '100px',
                                        height: '100px',
                                        marginTop: '10px',
                                        border: '1px solid #000'
                                    }}></div>

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
export default Color;