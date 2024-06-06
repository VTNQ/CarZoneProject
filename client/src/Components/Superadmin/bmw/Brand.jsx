import React from 'react'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Select from "react-select"
import Pagination from "react-paginate";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
export const BrandSpm = () => {
    const [Brand, setBrand] = useState([]);
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const indexOflastEmployee = (currentPage + 1) * perPage;
    const navigate=useNavigate();
    const indexOfFirtEmployee = indexOflastEmployee - perPage;
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [loading, setloading] = useState(true)
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
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
    const [FromData, setFromData] = useState({
        id: '',
        UpdateName: '',
        UpdateHeadQuaters: ''
    })
    const [UpdateSelectCountry, setUpdateSelectCountry] = useState(null);

    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setFromData({
                id: '',
                UpdateName: '',
                c: ''
            })
            setUpdateSelectCountry(null);


            setPopupVisible(false)
            setIsClosingPopup(false)
        }, 500);
    }
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

    const currentBrand = Brand.slice(indexOfFirtEmployee, indexOflastEmployee);

    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };

    const fetchDataBrand = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5278/api/Brand/GetBrand`);
            setBrand(response.data.result);
            console.log(response.data)
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        fetchDataBrand();
    }, [])

    const handleDeleteBrand = async (id) => {
        Swal.fire({
            title: "Do you want to delete this brand ?",
            showCancelButton: true,
            denyButtonText: "dont delete",
            confirmButtonText: "Delete",
            timer: 1500
        }).then(async (result) => {
            if (result.isConfirmed) {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Brand/DeleteBrand/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete Success',
                        timer: 1500
                    })
                    fetchDataBrand();
                } else {
                    const responseBody = await response.json();
                if (responseBody.message) {
                    Swal.fire({
                        icon: 'error',
                        title: responseBody.message || 'Failed to Delete',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                }
            }
        })
    }
    const handleUpdateSelectCountry = (event) => {
        setUpdateSelectCountry(event.target.value)
    }
    const handleUpdateBrand = async (event) => {
        event.preventDefault();
        console.log(FromData)
        try {
            setloading(true)
            const response = await fetch(`http://localhost:5278/api/Brand/UpdateBrand/${FromData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: FromData.UpdateName,
                    headquarters: FromData.UpdateHeadQuaters,
                    idCountry: UpdateSelectCountry
                })
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Update Brand Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFromData({
                    id: '',
                    UpdateName: '',
                    UpdateHeadQuaters: ''
                })
                setUpdateSelectCountry(null);
                setPopupVisible(false);
                const response = await axios.get("http://localhost:5278/api/Brand/GetBrand");
                setBrand(response.data.result)
            } else {
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
    const [Country, setCountry] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Brand/GetCountry");
                setCountry(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const handleEditClick = (ID) => {
        const SelectBrand = Brand.find(brand => brand.id == ID)
        if (SelectBrand) {
            FromData.id = SelectBrand.id;
            FromData.UpdateHeadQuaters = SelectBrand.headQuaters;
            FromData.UpdateName = SelectBrand.name;
            setUpdateSelectCountry(SelectBrand.idCountry)
        }
        setPopupVisible(true)
    }

    return (
        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">BRAND LIST</h4>

                    <p class="card-description">
                    </p>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Name </th>
                                    <th>Logo</th>
                                    <th> Head Quaters </th>
                                    <th> Country </th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                    {/* <th>Delete</th> */}


                                </tr>
                            </thead>
                            <tbody>
                                {currentBrand.map((brand, index) => (
                                    <tr>
                                        <td>{++index}</td>
                                        <td>{brand.name}</td>
                                        <td><img src={brand.logo} width="100px" height="100px" style={{ objectFit: 'cover', borderRadius: '0%' }}
                                            alt="" /></td>
                                        <td>{brand.headQuaters}</td>
                                        <td>{brand.country}</td>
                                        <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(brand.id)}>Edit</button></td>
                                        <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>handleDeleteBrand(brand.id)}>Remove</button></td>
                                        {/* <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>{handleDeleteBrand(brand.id)}}>Delete</button></td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(Brand.length / perPage)}
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
                {isPopupVisible && (
                    <div className="popup-container">

                        <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                            <div className='flex justify-end'>
                                <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                            </div>

                            <div style={{ marginTop: '16px' }}>

                                <h3 className="box-title1">Edit Brand</h3>
                            </div>
                            <form role="form" onSubmit={handleUpdateBrand}>
                                <div className="box-body">
                                    {/* Form fields go here */}
                                    <div class="form-group">
                                        <label className='float-left'>Name</label>
                                        <input type="text" class="form-control" value={FromData.UpdateName} onChange={(e) => setFromData({ ...FromData, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                    </div>

                                    <div class="form-group">
                                        <label className='float-left'>Country</label>
                                        <br />
                                        <select className="form-select" aria-label="Default select example" value={UpdateSelectCountry} onChange={handleUpdateSelectCountry}>
                                            {Country.map((country, index) => (
                                                <option value={country.id} selected={country.id == UpdateSelectCountry}>{country.name}</option>
                                            ))}
                                        </select>

                                    </div>
                                    <div class="form-group">
                                        <label className='float-left'>Head Quaters</label>
                                        <input type="text" class="form-control" value={FromData.UpdateHeadQuaters} onChange={(e) => setFromData({ ...FromData, UpdateHeadQuaters: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                    </div>


                                </div>

                                <div className="box-footer">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded ">Update</button>
                                </div>
                            </form>


                        </div>
                    </div>
                )}
            </div>
        </>

    )
}
