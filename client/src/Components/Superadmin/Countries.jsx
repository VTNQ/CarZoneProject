import React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "react-paginate";
import axios from 'axios';
import Cookies from 'js-cookie'

export const Countries = () => {
    const navigate = useNavigate();
    const [CountryData, setCountryData] = useState({
        Name: '',
        UpdateName: '',


    })
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
     
      if (data && data.role=='Superadmin') {
          setSessionData(data);
      } else{
        navigate('/login');
      }
  }, [navigate]);
    const [loading, setloading] = useState(true)
    const HandleOnSubmit = async (event) => {
        event.preventDefault();
        if (CountryData.Name == '') {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            const formData = new FormData();

            formData.append("Name", CountryData.Name); // Sửa lại các tham chiếu tới state
            const response = await fetch("http://127.0.0.1:5278/api/Countries/AddCountries", {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Add Country Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setCountryData({
                    Name: '',
                })
                fetchData();

            } else {
                const responseBody = await response.json();
                if (responseBody.message) {
                    Swal.fire({
                        icon: 'error',
                        title: responseBody.message || 'Failed to add countries',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        }
    }
    //show countries
    const [perPage, setperPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [FromDataUpdate, setFromDataUpdate] = useState({
        id: '',
        Name: ''

    })
    
    const location = useLocation();
    const [Country, setCountry] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5278/api/Countries/ShowCountry`);
            setCountry(response.data);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }

    };

    useEffect(() => {
        fetchData();
    }, []);

    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s',
        zindex: '1000000'
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
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const indexOflastEmployee = (currentPage + 1) * perPage;
    const indexOfFirtEmployee = indexOflastEmployee - perPage;
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const handleEditClick = (id) => {
        const selectedCountry = Country.find(country => country.id === id);
        if (selectedCountry) {
            setFromDataUpdate({
                id: selectedCountry.id,
                UpdateName: selectedCountry.Name
            });
            setPopupVisibility(true);
        }
    };
    const handleDeleteClick = async (id) => {
        try {
            Swal.fire({
                title: "Do you want to save the changes?",

                showCancelButton: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't save`,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await fetch(`http://127.0.0.1:5278/api/Countries/DeleteCountry/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        const responseBody = await response.json();
                        Swal.fire({
                            icon: 'error',
                            title: responseBody.message || 'Failed to delete country',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Delete Country Success',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        fetchData();
                    }
                }
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEditCountry = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:5278/api/Countries/UpdateCountry/${FromDataUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: FromDataUpdate.UpdateName }),
            });

            if (!response.ok) {
                const responseBody = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: responseBody.message || 'Failed to update country',
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                const updatedCountry = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Update Country Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                fetchData();
                setFromDataUpdate({
                    Name: '',
                    UpdateName: '',
                    id: null
                });
                setPopupVisibility(false);

            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-md-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Create Countries</h4>
                                    <p class="card-description">
                                        you need to create city and district before create new countries
                                    </p>
                                    <form class="forms-sample" onSubmit={HandleOnSubmit}>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Country name</label>
                                            <input type="text" value={CountryData.Name} onChange={(e) => setCountryData({ ...CountryData, Name: e.target.value })} class="form-control" id="exampleInputUsername1" placeholder="Country name" />
                                        </div>

                                        <div class="form-check form-check-flat form-check-primary">
                                            <label class="form-check-label">
                                                <input type="checkbox" class="form-check-input" />
                                                Remember me
                                            </label>
                                        </div>
                                        <button type="submit" class="btn btn-primary mr-2">Create</button>
                                        <button class="btn btn-light">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Countries Table</h4>
                                    <p class="card-description">
                                        Hi Superadmin ! how ya doing ?
                                    </p>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Country Name</th>
                                                    <th>Edit</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Country.map((Emp, index) => (
                                                    <tr>
                                                        <td>{++index}</td>
                                                        <td>{Emp.name}</td>

                                                        <td>
                                                            <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                onClick={() => handleEditClick(Emp.id)}>Edit
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                onClick={() => handleDeleteClick(Emp.id)}>Delete
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
                                            pageCount={Math.ceil(Country.length / perPage)}
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
                {isPopupVisible && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div style={{ marginTop: '16px' }}>

                                <h3 className="box-title1">Edit Country</h3>
                            </div>
                            <form role="form" >
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div class="form-group" onSubmit={handleEditCountry}>
                                        <label className='float-left'>Country Name</label>
                                        <input type="text" className="form-control" value={FromDataUpdate.UpdateName} onChange={(e) => setFromDataUpdate({ ...FromDataUpdate, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Country Name" />
                                    </div>
                                </div>

                                <div className="box-footer">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " >Update</button>
                                </div>
                            </form>


                        </div>
                    </div>
                )}


            </div>
        </>
    )
}
