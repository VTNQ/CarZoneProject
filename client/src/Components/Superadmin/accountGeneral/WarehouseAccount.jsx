import React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Pagination from "react-paginate";
import axios from 'axios';
import Select from 'react-select';
import Cookies from 'js-cookie'


export const WarehouseAccount = () => {
  const [CountryData, setCountryData] = useState({
    FullName: '',
    Email: '',

    IdentityCode: '',
    Address: '',
    Phone: '',
    IdShowroom: ''
  })
  const [loading, setloading] = useState(true)
  const HandleOnSubmit = async (event) => {
    event.preventDefault();
    if (CountryData.FullName === '' || CountryData.Email === '') {
      Swal.fire({
        icon: 'error',
        title: 'Please enter complete information',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const response = await fetch("http://127.0.0.1:5278/api/Account/addWarehouse", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(CountryData)
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Add Warehouse Employee Success',
          showConfirmButton: false,
          timer: 1500,
        });
        fetchData();
        // Reset form data
      } else {
        const responseBody = await response.json();
        Swal.fire({
          icon: 'error',
          title: responseBody.message || 'Failed to add admin',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  //show countries
  const [perPage, setperPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [FromDataUpdate, setFromDataUpdate] = useState({
    id: '',
    Name: ''

  })
  const navigate = useNavigate();
  const [Country, setCountry] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5278/api/Account/getAccountWarehouse`);
      setCountry(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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



  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const handleSelectShowroom = OptionValue => {
    setSelectedShowroom(OptionValue);
    setCountryData({ ...CountryData, IdShowroom: OptionValue.value });
  }
  const [showroom, setShowroom] = useState();
  useEffect(() => {
    axios.get('http://localhost:5278/api/WarehouseAll/getWarehouse')
      .then(response => {
        const countryOptions = response.data.map(showroom => ({
          value: showroom.id,
          label: showroom.name
        }));
        setShowroom(countryOptions);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);
  return (
    <>
      {loading && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
        </div>

      )}
      <div class="row">
        <div class="col-md-4 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Create Warehouse Employee</h4>
              <p class="card-description">
                Hello spm !!
              </p>
              <form class="forms-sample" onSubmit={HandleOnSubmit}>
                <div class="form-group">
                  <label for="exampleInputUsername1">Fullname Warehouse Employee</label>
                  <input type="text" value={CountryData.FullName} onChange={(e) => setCountryData({ ...CountryData, FullName: e.target.value })} class="form-control" id="exampleInputUsername1" placeholder="Admin Full Name" />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Email</label>
                  <input type="text" value={CountryData.Email} onChange={(e) => setCountryData({ ...CountryData, Email: e.target.value })} class="form-control" id="exampleInputUsername1" placeholder="Email" />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Phone</label>
                  <input type="text" value={CountryData.Phone} onChange={(e) => setCountryData({ ...CountryData, Phone: e.target.value })} class="form-control" id="exampleInputUsername1" placeholder="Phone" />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Address</label>
                  <input type="text" value={CountryData.Address} onChange={(e) => setCountryData({ ...CountryData, Address: e.target.value })} class="form-control" id="exampleInputUsername1" placeholder="Address" />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">IdentityCode</label>
                  <input type="text" value={CountryData.IdentityCode} onChange={(e) => setCountryData({ ...CountryData, IdentityCode: e.target.value })} class="form-control" id="exampleInputUsername1" placeholder="ID code" />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Warehouse</label>
                  <Select
                    value={selectedShowroom}
                    onChange={handleSelectShowroom}
                    options={showroom}
                    placeholder="Select a warehouse"
                  />                </div>

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

        <div class="col-md-8 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <div className='flex justify-between'>
                <div>
                  <h4 class="card-title">Warehouse Employee Table</h4>
                  <p class="card-description">
                    Hi Superadmin ! how ya doing ?
                  </p>
                </div>
                <td><button className="btn btn-dark btn-icon-text" onClick={() => navigate(`/superadmin/admin/warehouseShow`)}  >Detail<i class="ti-file btn-icon-append"></i></button></td>

              </div>
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead>
                    <tr>

                      <th>Name</th>
                      <th>Email</th>
                      <th>Warehouse</th>
                      <th>Country</th>

                    </tr>
                  </thead>
                  <tbody>
                    {Country.map((Emp, index) => (
                      <tr>

                        <td>{Emp.fullName}</td>
                        <td>{Emp.email}</td>

                        <td>{Emp.nameWarehouse ? Emp.nameWarehouse.nameWarehouse : 'No Warehouse'}</td>
                        <td>{Emp.nameCountry ? Emp.nameCountry.nameCountry : 'No Country'}</td>

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
    </>
  )
}
