import React, { useEffect, useState } from "react";

import Pagination from "react-paginate";
import axios from "axios";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import Cookies from 'js-cookie'


export const CarTable = () => {
    const [perPage] = useState(10);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [FormDataShowroom, setFormDataShowroom] = useState({
        Id: '',
        Name: '',
        IdDistrict: ''
    })
    const [selectedDistrict, setSelectedDistrict] = useState(null);

    const [District, setDistrict] = useState([]);


    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.fullName || '';
    const email = location.state?.email || '';
    const ID = location.state?.ID || '';
    const [Showroom, setShowroom] = useState([]);
    const [loading, setloading] = useState(true)

    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showDistrict, setShowDistrict] = useState([]);
    //for city form
    const [selectedCountry1, setSelectedCountry1] = useState(null);


    const [selectedCity, setSelectedCity] = useState(null);


    const [DistrictData, setDistrictData] = useState({
        Name: '',
        IdCity: ''
    })
    const [CityShow, setCityShow] = useState([]);

    const fetchdata = async () => {
        try {
            const response = await axios.get(`http://localhost:5278/api/Car/getCar`);
            setShowroom(response.data)
            console.log(response.data);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {

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
    const FilterShowroom = Showroom.filter(Cus =>
        Cus.Name?.toLowerCase().includes(searchTerm.toLowerCase())
    )


    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const indexOflastEmployee = (currentPage + 1) * perPage;
    const indexOfFirtEmployee = indexOflastEmployee - perPage;
    // const currentEmployee = FilterEmployee.slice(indexOfFirtEmployee, indexOflastEmployee);

    const indexOflastCustomer = (currentPage + 1) * perPage;
    const indexOfFirtCustomer = indexOflastCustomer - perPage;
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [FromData, setFromData] = useState({
        id: '',
        UpdateName: '',
        UpdatePrice: ''
    })
    const DeleteCar = async (ID) => {
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
                const response = await fetch(`http://127.0.0.1:5278/api/Car/DeleteCar/${ID}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete Car Success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get(`http://localhost:5278/api/Car/getCar`);
                    setShowroom(response.data)
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
    const handleEditClick = (ID) => {
        const SelectCar = Showroom.find(cardata => cardata.id == ID);

        if (SelectCar) {
            FromData.id = SelectCar.id;
            FromData.UpdateName = SelectCar.name;
            FromData.UpdatePrice = SelectCar.price;
        }
        setPopupVisibility(true)
    }
    const handleShowroomChange = selectedOption => {
        setSelectedDistrict(selectedOption);
        setFormDataShowroom({ ...FormDataShowroom, IdDistrict: selectedOption.value })

    };
    useEffect(() => {
        axios.get('http://localhost:5278/api/District/showDistrict')
            .then(response => {
                const districtOptions = response.data.map(district => ({
                    value: district.id,
                    label: district.name
                }));
                setDistrict(districtOptions);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);
    const handleSubmitShowroom = async event => {
        event.preventDefault();
        if (!FormDataShowroom.Name || !FormDataShowroom.IdDistrict) {
            Swal.fire({
                icon: 'error',
                title: 'name and district empty, please insert all the information',
                timer: 1500
            })
            return false;
        }
        const formData = new FormData();
        formData.append("Name", FormDataShowroom.Name);
        formData.append("IdDistrict", FormDataShowroom.IdDistrict);
        console.log("formdata" + formData.Name);
        console.log("formdata" + formData.IdDistrict);
        const response = await fetch('http://localhost:5278/api/WarehouseAll/addWarehouse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Name: FormDataShowroom.Name,
                IdCountry: FormDataShowroom.IdDistrict
            })
        });
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'create new warehouse success',
                timer: 1500
            })
            fetchdata();
        } else {
            const responseBody = await response.json();
            console.log("responseBody" + responseBody);
            Swal.fire({
                icon: 'error',
                title: responseBody.message || 'Error adding city',
                timer: 1500
            });
            setFormDataShowroom({
                Name: '',
                IdDistrict: ''
            })

        }

    }
    const handleInputNameChange = event => {
        setFormDataShowroom({ ...FormDataShowroom, Name: event.target.value });
    };


    const handleCountryChange1 = selectedOption => {

        setSelectedCountry1(selectedOption);
        setFormDataShowroom({ ...FormDataShowroom, IdDistrict: selectedOption.value })

    };




    const FilterCustomer = Showroom.filter(Cus =>
        Cus.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const currentShowroom = FilterCustomer.slice(indexOfFirtCustomer, indexOflastCustomer)
    const handleRowClick = (id) => {
        navigate(`/superadmin/carDetail/${id}`);

    }
    const handleUpdate = async (event) => {
        event.preventDefault();
        if (FromData.UpdateName == '' || FromData.UpdatePrice == '') {
            Swal.fire({
                icon: 'error',
                title: 'Name And Price is required',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch(`http://127.0.0.1:5278/api/Car/UpdateCar/${FromData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FromData.UpdateName, price: FromData.UpdatePrice })
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Update Car Success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    const response = await axios.get(`http://localhost:5278/api/Car/getCar`);
                    setShowroom(response.data)
                    setPopupVisibility(false)
                    setFromData({
                        id: '',
                        UpdateName: '',
                        UpdatePrice: ''
                    })

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
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded mb-6" onClick={() => navigate('/superadmin/car')}>Create new car</button>
                                    <h4 class="card-title">Car List</h4>
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
                                                    <th> Name Car </th>
                                                    <th>Price</th>
                                                    <th>Main Image</th>
                                                    <th>Brand</th>
                                                    <th>Model</th>
                                                    <th>Seat Num</th>
                                                    <th>Created</th>
                                                    <th>Detail</th>
                                                    <th>Update</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentShowroom.map((Cus, index) => (
                                                    <tr key={index} >
                                                        <td>{++index}</td>

                                                        <td>{Cus.name}</td>
                                                        <td>{Cus.price}</td>
                                                        <td>
                                                            <img src={Cus.mainPhoto?.link} alt="Main Photo" width="200px" height="200px" style={{ objectFit: 'cover' }} />
                                                        </td>

                                                        <td>{Cus.nameBrand}</td>
                                                        <td>{Cus.nameModel}</td>

                                                        <td>{Cus.numberOfSeat}</td>
                                                        <td>{new Date(Cus.dateAccept).toLocaleDateString()}</td>

                                                        <td><button className="btn btn-dark btn-icon-text" onClick={() => navigate(`/superadmin/carDetail/${Cus.id}`)}  >Detail<i class="ti-file btn-icon-append"></i></button></td>
                                                        <td><button className='btn btn-dark btn-icon-text' onClick={() => handleEditClick(Cus.id)}>Edit</button></td>
                                                        <td><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded' onClick={() => DeleteCar(Cus.id)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <Pagination
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            pageCount={Math.ceil(FilterShowroom.length / perPage)}
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


            {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div style={{ marginTop: '16px' }}>

                            <h3 className="box-title1">Edit Car</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdate}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Name</label>
                                    <input type="text" class="form-control" value={FromData.UpdateName} onChange={(e) => setFromData({ ...FromData, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>


                                <div class="form-group">
                                    <label className='float-left'>Price</label>
                                    <br />

                                    <input type="number" class="form-control" value={FromData.UpdatePrice} onChange={(e) => setFromData({ ...FromData, UpdatePrice: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
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

