import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import Pagination from "react-paginate";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';


export const CityDistrict = () => {
  const [countries, setCountries] = useState([]);
  const navigate=useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [district, setDistrict] = useState([]);
  const [showDistrict, setShowDistrict] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  //for city form
  const [selectedCountry1, setSelectedCountry1] = useState(null);


  const [selectedCity, setSelectedCity] = useState(null);

  const [cityData, setCityData] = useState({
    Name: '',
    IdCountry: ''
  });
  const [DistrictData, setDistrictData] = useState({
    Name: '',
    IdCity: ''
  })
  const [CityShow, setCityShow] = useState([]);
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


  const handleCountryChange = selectedOption => {
    setSelectedCountry(selectedOption);
    fetchDataCity(selectedOption.value);
    setCityData({ ...cityData, IdCountry: selectedOption.value });
  };
  const handleCountryChange1 = selectedOption => {
    fetchDataCity(selectedOption.value);
    setSelectedCountry1(selectedOption);
  };
  const handleCityChange = selectedCityOption => {
    setSelectedDistrict(selectedCityOption);
    setDistrictData({ ...DistrictData, IdCity: selectedCityOption.value })
  }
  const handleCityNameChange = event => {
    setCityData({ ...cityData, Name: event.target.value });
  };
  const handleDistrictNameChange = event => {
    setDistrictData({ ...DistrictData, Name: event.target.value });
  };

  const handleSubmitCity = async event => {
    event.preventDefault();
    if (!cityData.Name || !cityData.IdCountry) {
      Swal.fire({
        icon: 'error',
        title: 'All fields are required',
        timer: 2000
      });
      return;
    }
    const formData = new FormData();
    formData.append("Name", cityData.Name);
    formData.append("IdCountry", cityData.IdCountry);

    const response = await fetch('http://127.0.0.1:5278/api/City/addCity', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'City added successfully',
        timer: 1500
      });
      setCityData({ Name: '', IdCountry: '' });
      fetchData();
    } else {
      const responseBody = await response.json();
      Swal.fire({
        icon: 'error',
        title: responseBody.message || 'Error adding city',
        timer: 1500
      });
    }
  };
  const [loading, setloading] = useState(true)
  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5278/api/City/showCity');
      setCityShow(response.data);
      console.log(response.data);
    } catch (error) {

    }

  }
  useEffect(() => {
    const fetchAllData = async () => {
      await fetchData();
      await fetchDataDistrict();
      setloading(false);
    };

    fetchAllData();
  }, []);


  const fetchDataDistrict = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5278/api/District/showDistrict');
      setShowDistrict(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleDeleteCity = async (id) => {
    try {
      Swal.fire({
        showCancelButton: true,
        cancelButtonText: 'cancel',
        title: 'Do you want to delete this city',
        denyButtonText: 'Dont save'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`http://127.0.0.1:5278/api/City/deleteCity/${id}`, {
            method: 'DELETE',
          });
          if (!response.ok) {
            const responseBody = await response.json();
            Swal.fire({
              title: 'toang roi ong giao a' || responseBody.message,
              icon: 'error',
              timer: 1500
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Delete City Success',
              timer: 1500
            })
            fetchData();
          }
        }
      })

    } catch (error) {

    }
  }
  const handleDeleteDistrict = async (id) => {
    Swal.fire({
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      title: 'Do you want to delete this district',
      denyButtonText: 'Dont save'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`http://127.0.0.1:5278/api/District/deleteDistrict/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          Swal.fire({
            icon: 'error',
            title: 'fail to delete district',
            timer: 1500
          })
        } else {
          Swal.fire({
            icon: 'success',
            title: 'fail to delete district',
            timer: 1500
          })
          fetchDataDistrict();
        }

      }

    })
  }
  //function to get data of district by idCountry
  const fetchDataCity = async (countryId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5278/api/City/findCityByCountry/${countryId}`)
      const responseOption = response.data.map(city => ({
        value: city.id,
        label: city.name
      }));
      setDistrict(responseOption);
      setSelectedCity(null);
    } catch (error) {
      console.error(error);
    }
  }
  const handleSubmitDistrict = async event => {
    event.preventDefault();
    if (!DistrictData.Name || !DistrictData.IdCity) {
      Swal.fire({
        icon: 'error',
        title: 'All fields are required',
        timer: 2000
      });
      console.log(DistrictData);
      return;
    }
    const formData1 = new FormData();
    formData1.append("Name", DistrictData.Name);
    formData1.append("IdCity", selectedDistrict);
    console.log(formData1);

    const districtData = {
      Name: DistrictData.Name,
      IdCity: selectedDistrict.value // Giả sử rằng bạn muốn gửi ID của city
    };
    const response = await fetch('http://127.0.0.1:5278/api/District/addDistrict', {
      method: 'POST',
      body: JSON.stringify(districtData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'District added successfully',
        timer: 1500
      });
      setDistrictData({ Name: '', IdCity: '' });
      fetchDataDistrict();
    } else {
      const responseBody = await response.json();
      Swal.fire({
        icon: 'error',
        title: responseBody.message || 'Error adding district',
        timer: 1500
      });
    }
  };
  const [perPage, setperPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const indexOflastEmployee = (currentPage + 1) * perPage;
  const indexOfFirtEmployee = indexOflastEmployee - perPage;
  const currentCity = CityShow.slice(indexOfFirtEmployee, indexOflastEmployee);

  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };

  const [perPage1, setperPage1] = useState(5);
  const [currentPage1, setCurrentPage1] = useState(0);
  const indexOflastEmployee1 = (currentPage1 + 1) * perPage1;
  const indexOfFirtEmployee1 = indexOflastEmployee1 - perPage1;
  const currentDistrict = showDistrict.slice(indexOfFirtEmployee1, indexOflastEmployee1);

  const handlePageclick1 = (data) => {
    setCurrentPage1(data.selected);
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
                  <h4 class="card-title">Create City</h4>
                  <p class="card-description">
                    Create Country before create new City
                  </p>
                  <form class="forms-sample" onSubmit={handleSubmitCity}>
                    <div class="form-group">
                      <label for="exampleInputUsername1">City name</label>
                      <input type="text" className="form-control" id="exampleInputUsername1" placeholder="City name" value={cityData.Name} onChange={handleCityNameChange} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Country</label>
                      <Select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        options={countries}
                        placeholder="Select a country"
                      />
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
                  <h4 class="card-title">Create District</h4>
                  <p class="card-description">
                    fill in the empty field all the infomation
                  </p>
                  <form class="forms-sample" onSubmit={handleSubmitDistrict}>
                    <div class="form-group">
                      <label for="exampleInputUsername1">District name</label>
                      <input type="text" className="form-control" id="exampleInputUsername1" placeholder="City name" value={DistrictData.Name} onChange={handleDistrictNameChange} />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail1">Country</label>
                      <Select
                        value={selectedCountry1}
                        onChange={handleCountryChange1}
                        options={countries}
                        placeholder="Select a country"
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleInputUsername1">City Name</label>
                      <Select
                        value={selectedDistrict}
                        onChange={handleCityChange}
                        options={district}
                        placeholder="Select a city"
                        isDisabled={!selectedCountry1}
                      />
                    </div>

                    <div class="form-check form-check-flat form-check-primary">
                      <label class="form-check-label">
                        <input type="checkbox" class="form-check-input" />
                        Remember me
                      </label>
                    </div>
                    <button type="submit" class="btn btn-primary mr-2">Submit</button>
                    <button class="btn btn-light">Cancel</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Table City</h4>
                  <p class="card-description">
                    type all the empty field
                  </p>
                  <div class="table-responsive pt-3">
                    <table class="table table-dark">
                      <thead>
                        <tr>
                          <th>
                            #
                          </th>
                          <th>
                            City Name
                          </th>
                          <th>
                            Country
                          </th>
                          <th>
                            Action
                          </th>

                        </tr>
                      </thead>
                      <tbody>
                        {currentCity.map((city, index) => (
                          <tr key={index}>
                            <td>
                              {index + 1}
                            </td>
                            <td>
                              {city.name}
                            </td>
                            <td>
                              {city.nameCountry}
                            </td>
                            <td>
                              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                onClick={() => handleDeleteCity(city.id)}
                              >Delete</button>
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                    <Pagination
                      previousLabel={'previous'}
                      nextLabel={'next'}
                      breakLabel={'...'}
                      pageCount={Math.ceil(CityShow.length / perPage)}
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
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <h4 class="card-title">Car display</h4>
                  <p class="card-description">
                    Add class <code>.table-dark</code>
                  </p>
                  <div class="table-responsive pt-3">
                    <table class="table table-dark">
                      <thead>
                        <tr>

                          <th>
                            Name District
                          </th>
                          <th>
                            City
                          </th>
                          <th>
                            Country
                          </th>
                          <th>
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        {currentDistrict.map((dis, index) => (
                          <tr key={index}>
                            <td>
                              {dis.name}
                            </td>
                            <td>
                              {dis.nameCity}
                            </td>
                            <td>
                              {dis.nameCountry}
                            </td>
                            <td>
                              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                onClick={() => { handleDeleteDistrict(dis.id) }}
                              >Delete</button>
                            </td>
                          </tr>
                        ))}

                      </tbody>
                    </table>
                    <Pagination
                      previousLabel={'previous'}
                      nextLabel={'next'}
                      breakLabel={'...'}
                      pageCount={Math.ceil(showDistrict.length / perPage1)}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={handlePageclick1}
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
