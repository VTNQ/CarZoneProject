import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Select from "react-select"
import LayoutAdmin from "../Layout/Layout";
import Pagination from 'react-paginate';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function Brand() {
    const [Country, setCountry] = useState([]);
    const [SelectCountry, setSelectCountry] = useState(null);
    const [Brand, setBrand] = useState([]);
    const [sessionData, setSessionData] = useState(null);
    const navigate = useNavigate();
    const [loading,setloading]=useState(true);
  const getUserSession=()=>{
    const UserSession=Cookies.get("UserSession");
    if(UserSession){
        return JSON.parse(UserSession);
    }
    return null;
}

useEffect(() => {
    const data = getUserSession();
    
    if (data && data.role=='WareHouse') {
        setSessionData(data);
    } else {
        // If no session data, redirect to login
        navigate('/login');
    }
}, [navigate]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Brand/GetBrand");
                setBrand(response.data.result)
            } catch (error) {
                console.log(error)
            }finally{
                setloading(false)
            }
        }
        fetchdata();
    }, [])
    const HandleSelectCountry = (event) => {
        setSelectCountry(event.target.value);
    }
    const [FromData, setFromData] = useState({
        Name: '',
        Logo: null,
        HeadQuartes: '',
        id: '',
        UpdateName: '',
        UpdateHeadQuaters: ''
    })
    const [imagePreView, setImagePreView] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const render = new FileReader();
            render.onloadend = () => {
                setImagePreView(render.result);
            }

            render.readAsDataURL(file);
            setFromData({
                ...FromData,
                Logo: file,
            });
        }
    }
    const AddSubmit = async (event) => {
        event.preventDefault();
        try {
            setloading(true)
            const formData = new FormData();
            formData.append("Name", FromData.Name);
            formData.append("Logo", FromData.Logo);
            formData.append("headquarters", FromData.HeadQuartes);
            formData.append("idCountry", SelectCountry)
            const response = await fetch("http://localhost:5278/api/Brand/AddBrand", {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Add Brand Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFromData({
                    Name: '',
                    Logo: null,
                    HeadQuartes: '',
                })
                setSelectCountry("")
                document.getElementById('Logo').value = '';
                setImagePreView(null)
                const response = await axios.get("http://localhost:5278/api/Brand/GetBrand");
                setBrand(response.data.result)
            }else{
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
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [UpdateSelectCountry, setUpdateSelectCountry] = useState(null);
    const handleEditClick = (ID) => {
        const SelectBrand = Brand.find(brand => brand.id == ID)
        if (SelectBrand) {
            FromData.id = SelectBrand.id;
            FromData.UpdateHeadQuaters = SelectBrand.headQuaters;
            FromData.UpdateName = SelectBrand.name;
            setUpdateSelectCountry(SelectBrand.idCountry)
        }
        setPopupVisibility(true)
    }
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setFromData({
                id: '',
                UpdateName: '',
                UpdateHeadQuaters: ''
            })
            setUpdateSelectCountry(null);

            setPopupVisibility(false)
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
    const handleUpdateSelectCountry = (event) => {
        setUpdateSelectCountry(event.target.value)
    }
    const [searchTerm, setSearchtem] = useState('');
    const [perPage, setperPage] = useState(5);

    const [currentPage, setCurrentPage] = useState(0);
    const FilterBrand = Brand.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const IndexoflastBrand = (currentPage + 1) * perPage;
    const IndexofFirstBrand = IndexoflastBrand - perPage;
    const CurrentBrand = FilterBrand.slice(IndexofFirstBrand, IndexoflastBrand)
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
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
                setPopupVisibility(false);
                const response = await axios.get("http://localhost:5278/api/Brand/GetBrand");
                setBrand(response.data.result)
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
    const DeleteBrand = async (IDBrand) => {
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
                const response = await fetch(`http://localhost:5278/api/Brand/DeleteBrand/${IDBrand}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get("http://localhost:5278/api/Brand/GetBrand");
                    setBrand(response.data.result)
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
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    return (
        <>
         {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card" style={{ height: 'auto' }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Brand</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={AddSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Country</label>
                                                <select className="form-select" aria-label="Default select example" value={SelectCountry} onChange={HandleSelectCountry}>
                                                    <option value="">Select Country</option>
                                                    {Country.map((country, index) => (
                                                        <option value={country.id} >{country.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={FromData.Name} onChange={(e) => setFromData({ ...FromData, Name: e.target.value })} placeholder="Enter Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Logo</label>
                                                <input type="file" class="form-control" id="Logo" placeholder="Enter Head Quarters" onChange={(e) => handleImageChange(e)} />
                                                {imagePreView && (
                                                    <div className="image-preview">
                                                        <img src={imagePreView} alt="Preview" className="preview-image" />
                                                    </div>
                                                )}
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Head Quarters</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={FromData.HeadQuartes} onChange={(e) => setFromData({ ...FromData, HeadQuartes: e.target.value })} placeholder="Enter Head Quarters" />
                                            </div>




                                            <button type="submit" class="btn btn-primary me-2">Submit</button>

                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Brand</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Name" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} />
                                        </form>
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


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentBrand.map((brand, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{brand.name}</td>
                                                            <td><img src={brand.logo} width="100" height="100" style={{ objectFit: 'cover', width: '24%', height: '100%', borderRadius: '0%' }}
                                                                alt="" /></td>
                                                            <td>{brand.headQuaters}</td>
                                                            <td>{brand.country}</td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(brand.id)}>Edit</button></td>
                                                            <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => DeleteBrand(brand.id)}>Delete</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterBrand.length / perPage)}
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

                    <footer class="footer">
                        <div class="d-sm-flex justify-content-center justify-content-sm-between">
                            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023. Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="ti-heart text-danger ms-1"></i></span>
                        </div>
                    </footer>

                </div>


            </LayoutAdmin>


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


        </>
    )
}
export default Brand;