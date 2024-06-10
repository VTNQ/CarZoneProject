import React, {useEffect, useState} from "react";

import Pagination from "react-paginate";
import axios from "axios";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import {useLocation, useNavigate} from "react-router-dom";
import Select from 'react-select';
import Cookies from 'js-cookie'


export const Showroom = () => {
  const [perPage] = useState(5);
  const [searchTerm, setSearchtem] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [FormDataShowroom, setFormDataShowroom] = useState({
    Id: '',
    Name: '',
    IdDistrict: ''
  })
  const [FormDataUpdate,setFormDataUpdate] = useState({
    Name: ''
  })
  const [loading,setloading]=useState(true)
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [District,setDistrict] = useState([]);


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
     
      if (data && data.role=='Superadmin') {
          setSessionData(data);
      } else{
        navigate('/login');
      }
  }, [navigate]);
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
  try{
    const response = await axios.get(`http://localhost:5278/api/Showroom/showShowroom`);
    setShowroom(response.data)
    console.log(response.data);
  }catch(error){
    console.log(error)
  }finally{
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
  const handleClosepopup1 = () => {
      setIsClosingPopup(true);
      setTimeout(() => {
          setPopupVisibility1(false)
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
  const [isPopupVisible1, setPopupVisibility1] = useState(false);
  const [idUpdateShowroom,setIdUpdateShowroom] = useState(null);
  const handleEditClick = (id) => {
    setIdUpdateShowroom(id);
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
    const response = await fetch('http://localhost:5278/api/Showroom/addShowroom',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: FormDataShowroom.Name,
            IdDistrict: FormDataShowroom.IdDistrict
        })
    });
    if(response.ok){
        Swal.fire({
            icon: 'success',
            title: 'create new showroom success',
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
  const handleInputNameChange1  = event => {
    setFormDataUpdate({ ...FormDataUpdate, Name: event.target.value });
  };


  const handleCountryChange1 = selectedOption => {
    fetchDataCity(selectedOption.value);
    setSelectedCountry1(selectedOption);
  };
  const handleCityChange = selectedCityOption => {
    setSelectedCity(selectedCityOption);
    // setDistrictData({... DistrictData, IdCity: selectedCityOption.value})
    fetchDataDistrict(selectedCityOption.value);
  }
  useEffect(() => {
    axios.get('http://localhost:5278/api/Countries/ShowCountry')
      .then(response => {
        const countryOptions = response.data.map(country => ({
          value: country.id,
          label: country.name
        }));
        setCountries(countryOptions);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);
  const fetchDataCity = async (countryId) => {
    try {
        console.log("Fetching cities for country ID:", countryId); // Debug log
        const response = await axios.get(`http://127.0.0.1:5278/api/City/findCityByCountry/${countryId}`);
        const responseOption = response.data.map(city => ({
            value: city.id,
            label: city.name
        }));
        console.log("Cities received:", responseOption); // Debug log
        setCityShow(responseOption);
        setSelectedCity(null); // Ensure selected city is reset when country changes
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
}
  const fetchDataDistrict = async (cityId) => {
    try {
        console.log("Fetching districts for city ID:", cityId); // Debug log
        const response = await axios.get(`http://127.0.0.1:5278/api/District/findDistrictByCity/${cityId}`);
        const responseOption = response.data.map(district => ({
            value: district.id,
            label: district.name
        }));
        console.log("district received:", responseOption); // Debug log
        setDistrict(responseOption);
        setSelectedDistrict(null); // Ensure selected city is reset when country changes
    } catch (error) {
        console.error("Error fetching cities:", error);
    }
}

const FilterCustomer = Showroom.filter(Cus =>
    Cus.name.toLowerCase().includes(searchTerm.toLowerCase())
)
const currentShowroom = FilterCustomer.slice(indexOfFirtCustomer, indexOflastCustomer)
const handleEditShowroom = () => {
    setPopupVisibility1(true);
}
const handleSubmitUpdateName = async (event,id) => {
   event.preventDefault();
    if(FormDataUpdate.Name === ''){
        Swal.fire({
            icon:'error',
            title: 'Insert Name',
            timer: 1500
        })
    }
    const idShowroom = idUpdateShowroom;
    const formData = new FormData();
    formData.append("Name", FormDataUpdate.Name);
    const response = await fetch(`http://127.0.0.1:5278/api/Showroom/updateShowroom/${idShowroom}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Name: FormDataUpdate.Name,
            
        })
    });
    if(response.ok){
        Swal.fire({
            icon:'success',
            title: 'edit name showroom success',
            timer: 1500
        })
        setIdUpdateShowroom('');
        fetchdata();
    }else{
        const bodyResponse = await response.json();
        Swal.fire({
            icon:'error',
            title: 'edit name showroom fail' + bodyResponse.message,
            timer: 1500
        })
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
              <div className="main-panel">
                  <div className="content-wrapper">
                      <div className="row">
                          <div class="col-lg-12 grid-margin stretch-card">
                              <div class="card">
                                  <div class="card-body">
                                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded mb-6" onClick={() => handleEditClick()}><i class="mdi mdi-note-plus mr-2"></i>Add Showroom</button>
                                      <h4 class="card-title">ShowRoom</h4>
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
                                                      <th> Name Showroom </th>
                                                      <th>District</th>
                                                      <th>Edit</th>
                                                      
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {currentShowroom.map((Cus, index) => (
                                                      <tr>
                                                          <td>{++index}</td>
                                                          <td>{Cus.name}</td>
                                                          <td>{Cus.nameDistrict}</td>
                                                          <td><button className="btn btn-dark btn-icon-text" onClick={()=>handleEditShowroom(Cus.id)} >Edit<i class="ti-file btn-icon-append"></i></button></td>
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
                          <h3 className="box-title1 mb-9"><i class="mdi mdi-note-plus"></i>Create New Showroom</h3>
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
                              <div class="form-group">
                                  
                              <Select
                                    value={selectedCity}
                                    onChange={handleCityChange}
                                    options={CityShow}
                                    placeholder="Select a city"
                                    isDisabled={!selectedCountry1}
                                />
                              </div>
                              <div class="form-group">
                                  
                                  <Select
                                    value={selectedDistrict}
                                    onChange={handleShowroomChange}
                                    options={District}
                                    placeholder="Select a district"

                                    isDisabled={!selectedCity}
                                    />
                              </div>
                              
                          </div>
                          <div className="box-footer">
                              <button className="btn btn-primary btn-icon-text" ><i class="ti-file btn-icon-prepend"></i>Add</button>
                          </div>
                      </form>
                  </div>
              </div>
          )}
          {isPopupVisible1 && (
              <div className="popup-container">
                  <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                      <div className='flex justify-end'>
                          <button onClick={handleClosepopup1} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                      </div>
                      <div style={{ marginTop: '16px' }}>
                          <h3 className="box-title1 mb-9">Update Name Showroom</h3>
                      </div>
                      <form role="form" onSubmit={handleSubmitUpdateName}>
                          <div className="box-body">
                              {/* Form fields go here */}
                              <div class="form-group">
                                  <label className='float-left'>Name Showroom</label>
                                  <input type="text" class="form-control" value={FormDataUpdate.Name} onChange={handleInputNameChange1} id="exampleInputUsername1" placeholder="Showroom Name" />
                              </div>
                              
                              
                          </div>
                          <div className="box-footer">
                              <button className="btn btn-primary btn-icon-text " ><i class="ti-file btn-icon-prepend"></i>Add</button>
                          </div>
                      </form>
                  </div>
              </div>
          )}
      </>


  )
}

