import React from 'react'
import { useState,useEffect } from 'react'
import Swal from 'sweetalert2'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Pagination from "react-paginate";
import Cookies from 'js-cookie'
import axios from 'axios';

export const Admin = () => {
    const [CountryData, setCountryData] = useState({
        FullName: '',
        Email:'',
        Password: '',
        IdentityCode: '',
        Address: '',
        Phone: '',
        IdShowroom: ''
    })
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
    const HandleOnSubmit = async (event) => {
        event.preventDefault();
       if(CountryData.Name==''){
        Swal.fire({
            icon: 'error',
            title: 'Please enter complete information',
            showConfirmButton: false,
            timer: 1500,
        })
       }else{
        const formData = new FormData();
       
        formData.append("Name", CountryData.Name); // Sửa lại các tham chiếu tới state
        const response = await fetch("http://127.0.0.1:5278/api/Countries/AddCountries", {
            method: 'POST',
            body: formData
        })
        if(response.ok){
            Swal.fire({
                icon: 'success',
                title: 'Add Country Success',
                showConfirmButton: false,
                timer: 1500,
            });
            setCountryData({
                Name: '',      
            })
            
        }else{
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
       }}
//show countries
    const [perPage, setperPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [FromDataUpdate, setFromDataUpdate] = useState({
        id: '',
        Name: ''
        
    })

    const location = useLocation();
    const [Country,setCountry] = useState([]);

    const fetchData = async () => {
    const response = await axios.get(`http://localhost:5278/api/Countries/ShowCountry`);
    setCountry(response.data);
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
    <div class="main-panel">        
    <div class="content-wrapper">
        <div className='row'>
        <div class=" grid-margin stretch-card">
        <div className='flex gap-2 ml-4'>
        <button type="submit" class="btn btn-primary mr-2" onClick={()=>navigate('/superadmin/admin')}>Admin Account</button>
        <button type="submit" class="btn btn-primary mr-2" onClick={()=>navigate('/superadmin/admin/warehouse')}>Warehouse Account</button>
        </div>

        </div>
        </div>
      <Outlet/>
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
                                <div class="form-group">
                                    <label className='float-left'>Country Name</label>
                                    <input type="text" className="form-control" value={FromDataUpdate.UpdateName} onChange={(e) => setFromDataUpdate({ ...FromDataUpdate, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Country Name" />
                                </div>
                            </div>

                            <div className="box-footer">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={(e) => handleEditCountry(e,FromDataUpdate.id)}>Update</button>
                            </div>
                        </form>


                    </div>
                </div>
            )}
   
    
  </div>
  )
}
