import React, {useEffect, useState} from "react";

import Pagination from "react-paginate";
import axios from "axios";
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import {useLocation, useNavigate} from "react-router-dom";
import Select from 'react-select';


export const AdminShow = () => {
  const [perPage] = useState(8);
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
    const response = await axios.get(`http://localhost:5278/api/Account/getAdmin`);
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
  
  
  const FilterShowroom = Showroom.filter(Cus =>
    Cus.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
)


  const handlePageclick = (data) => {
      setCurrentPage(data.selected);
  };
  const indexOflastEmployee = (currentPage + 1) * perPage; 
  const indexOfFirtEmployee = indexOflastEmployee - perPage;
  // const currentEmployee = FilterEmployee.slice(indexOfFirtEmployee, indexOflastEmployee);

  const indexOflastCustomer = (currentPage + 1) * perPage;
  const indexOfFirtCustomer = indexOflastCustomer - perPage;

 
  const handleShowroomChange = selectedOption => {
    setSelectedDistrict(selectedOption);
    setFormDataShowroom({... FormDataShowroom, IdDistrict: selectedOption.value})

  };
  
 
 

const FilterCustomer = Showroom.filter(Cus =>
    Cus.fullName.toLowerCase().includes(searchTerm.toLowerCase())
)
const currentShowroom = FilterCustomer.slice(indexOfFirtCustomer, indexOflastCustomer)


  return (
      <>
         
              
                      
                          <div class="col-md-12 grid-margin stretch-card">
                              <div class="card">
                                  <div class="card-body">
                                      <div className="flex justify-between">
                                      <h4 class="card-title">Admin List</h4>
                                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded mb-6" onClick={() => navigate(`/superadmin/admin`)}><i class="mdi mdi-note-plus mr-2"></i>Back</button>

                                      </div>
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
                                                      <th> Name Admin </th>
                                                      <th>Email</th>
                                                      <th>Phone</th>
                                                      <th>Address</th>
                                                      <th>ID Code</th>
                                                      <th>Showroom</th>
                                                      
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  {currentShowroom.map((Cus, index) => (
                                                      <tr>
                                                          <td>{++index}</td>
                                                          <td>{Cus.fullName}</td>
                                                          <td>{Cus.email}</td>
                                                          <td>{Cus.phone}</td>
                                                          <td>{Cus.address}</td>
                                                          <td>{Cus.identityCode}</td>
                                                          <td>{Cus.nameShowroom ? Cus.nameShowroom.nameShowroom : 'No Showroom'}</td>
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
                      
                  

          
      
          
      </>


  )
}

