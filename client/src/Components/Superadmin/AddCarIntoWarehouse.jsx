import React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "react-paginate";
import axios from 'axios';
import Select from 'react-select';

import Cookies from 'js-cookie'

export const AddCarIntoWarehouse = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [CarForm, setCarForm] = useState({
        idWarehouse: '',
        idCar: '',
        Quantity: ''


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
    const [loading, setloading] = useState(true);


    const HandleOnSubmit = async (event) => {
        event.preventDefault();
        if (CarForm.idCar == '' && CarForm.Quantity == '') {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            
            const formData = new FormData();

            formData.append("idCar", CarForm.idCar); // Sửa lại các tham chiếu tới state
            formData.append("idWarehouse", id);
            formData.append("quantity",CarForm.Quantity);
            const response = await fetch("http://127.0.0.1:5278/api/WarehouseAll/addCarIntoWarehouse", {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Add Car into Warehouse Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setCarForm({
                    idCar: '',
                    Quantity: ''
                })
                setSelectedCar(null);
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
            const response = await axios.get(`http://localhost:5278/api/WarehouseAll/getCarIntoWarehouse/${id}`);
            setCountry(response.data);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }

    };
    const[WarehouseSelected,setWarehouseSelected] = useState([]);
    const[nameWarehouseSelected,setNameWarehouseSelected] = useState('');
    const fetchDataNameWarehouse = async () =>{
        try {
            console.log("idWarehouse:" + id);
            const response = await axios.get(`http://localhost:5278/api/WarehouseAll/getWarehouse`);
            setWarehouseSelected(response.data);
            console.log("datawarehouse",response.data);
            const nameWarehouse = response.data.find(warehouse => warehouse.id === parseInt(id));
            if(nameWarehouse){
                setNameWarehouseSelected(nameWarehouse.name)
            }else{
                console.log("ko co");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
        
    }, []);
    useEffect(()=>{
        fetchDataNameWarehouse();
    },[id]);

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
   
    
    const[selectedCar,setSelectedCar] = useState('');
    const[CarData,setCarData] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5278/api/Car/getCar')
          .then(response => {
            const carOptions = response.data.map(car => ({
              value: car.id,
              label: car.name
            }));
            setCarData(carOptions);
          })
          .catch(error => {
            console.error('Error fetching countries:', error);
          });
      }, []);
    const handleSelectedCar = selectedOption => {
        setSelectedCar(selectedOption);
        setCarForm({...CarForm,idCar:selectedOption.value})
        
    }
    const handleInputQuantity = (event) => {
        setCarForm({...CarForm,Quantity:event.target.value});
    }
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
                                        <Select
                                            value={selectedCar}
                                            onChange={handleSelectedCar}
                                            options={CarData}
                                            placeholder="select car to warehouse"
                                        />                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputUsername1">Quantity Car</label>
                                            <input type="number" value={CarForm.Quantity} onChange={handleInputQuantity}  class="form-control" id="exampleInputUsername1" placeholder="Country name" />
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
                                <div className="flex justify-between items-center">
                                {nameWarehouseSelected ? (
                                        <h4 class="card-title">Add Car To {nameWarehouseSelected}  </h4>
                                    ):(
                                        <div>Loading...</div>
                                    )}
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                            onClick={()=>navigate('/superadmin/warehouse')}
                                        >Back
                                        </button>
                                    </div>
                                    <p class="card-description">
                                        Hi Superadmin ! Checking car of each warehouse ?
                                    </p>
                                    <div class="table-responsive">
                                        <table class="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Name Car</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Country.map((Emp, index) => (
                                                    <tr>
                                                        <td>{++index}</td>
                                                        <td>{Emp.nameCar}</td>
                                                        <td>{Emp.quantity}</td>
                                                        {/* <td>
                                                            <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                onClick={() => handleEditClick(Emp.id)}>Edit
                                                            </button>
                                                        </td> */}
                                                       
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
                


            </div>
        </>
    )
}
