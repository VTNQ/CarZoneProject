import React, {useEffect, useState} from "react";

import Pagination from "react-paginate";
import axios from "axios";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import {useLocation, useNavigate} from "react-router-dom";
import Select from 'react-select';


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

  const [District,setDistrict] = useState([]);


  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.fullName || '';
  const email = location.state?.email || '';
  const ID=location.state?.ID||'';
  const [Showroom, setShowroom] = useState([]);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDistrict,setShowDistrict] = useState([]);
  //for city form
  const [selectedCountry1,setSelectedCountry1] = useState(null);


  const [selectedCity,setSelectedCity] = useState(null);

 
  const [DistrictData,setDistrictData] = useState({
    Name: '',
    IdCity: ''
  })
  const [CityShow,setCityShow] = useState([]);

  const fetchdata = async () => {
    const response = await axios.get(`http://localhost:5278/api/Car/getCar`);
    setShowroom(response.data)
    console.log(response.data);
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
  const handleEditClick = () => {
    
      setPopupVisibility(true)
  }
  const handleShowroomChange = selectedOption => {
    setSelectedDistrict(selectedOption);
    setFormDataShowroom({... FormDataShowroom, IdDistrict: selectedOption.value})

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
    if(!FormDataShowroom.Name || !FormDataShowroom.IdDistrict ) {
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
    const response = await fetch('http://localhost:5278/api/WarehouseAll/addWarehouse',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: FormDataShowroom.Name,
            IdCountry: FormDataShowroom.IdDistrict
        })
    });
    if(response.ok){
        Swal.fire({
            icon: 'success',
            title: 'create new warehouse success',
            timer: 1500
        })
        fetchdata();
    }else{
        const responseBody = await response.json();
        console.log("responseBody"+responseBody);
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
  const handleInputNameChange  = event => {
    setFormDataShowroom({ ...FormDataShowroom, Name: event.target.value });
  };


  const handleCountryChange1 = selectedOption => {
    
    setSelectedCountry1(selectedOption);
        setFormDataShowroom({... FormDataShowroom, IdDistrict: selectedOption.value})

  };
  
  
  

const FilterCustomer = Showroom.filter(Cus =>
    Cus.name.toLowerCase().includes(searchTerm.toLowerCase())
)
const currentShowroom = FilterCustomer.slice(indexOfFirtCustomer, indexOflastCustomer)

  return (
      <>
         
              <div className="main-panel">
                  <div className="content-wrapper">
                      <div className="row">
                          <div class="col-lg-12 grid-margin stretch-card">
                              <div class="card">
                                  <div class="card-body">
                                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded mb-6" onClick={()=>navigate('/superadmin/car')}>Create new car</button>
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
                                                      <th>Number Of Seat</th>  
                                                      <th>Created</th>
                                                      <th>Update</th>  
                                                      <th>Delete</th>  
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {currentShowroom.map((Cus, index) => (
                                                      <tr>
                                                          <td>{++index}</td>
                                                          
                                                          <td>{Cus.name}</td>
                                                          <td>{Cus.price}</td>
                                                          <td>
                                                            <img src={Cus.mainPhoto?.link} alt="Main Photo" width="200px" height="200px" style={{ objectFit: 'cover' }} />
                                                            </td>
                                                            <td>brand</td>
                                                            <td>{Cus.nameBrand}</td>
                                                            <td>{Cus.numberOfSeat}</td>
                                                            <td>{Cus.dateAccept}</td>
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
                          <h3 className="box-title1 mb-9">Create New Showroom</h3>
                      </div>
                      <form role="form" onSubmit={handleSubmitShowroom}>
                          <div className="box-body">
                              {/* Form fields go here */}
                              <div class="form-group">
                                  <label className='float-left'>Name Showroom</label>
                                  <input type="text" class="form-control" value={FormDataShowroom.Name} onChange={handleInputNameChange} id="exampleInputUsername1" placeholder="Showroom Name" />
                              </div>
                              <div class="form-group">
                                  
                              <Select
                                    value={selectedCountry1}
                                    onChange={handleCountryChange1}
                                    options={countries}
                                    placeholder="Select a country"
                                />
                              </div>
                              
                              
                          </div>
                          <div className="box-footer">
                              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " >Add</button>
                          </div>
                      </form>
                  </div>
              </div>
          )}
      </>


  )
}

