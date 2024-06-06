import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Pagination from "react-paginate";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

export const ModelSpm = () => {
    const [Model, setModel] = useState([]);
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const indexOflastEmployee = (currentPage + 1) * perPage;
    const indexOfFirstEmployee = indexOflastEmployee - perPage;
    const currentModel = Model.slice(indexOfFirstEmployee, indexOflastEmployee);
    const [loading, setloading] = useState(true);
    const navigate=useNavigate();

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const fetchDataModel = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5278/api/Warehouse/ShowModel`);
            setModel(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    };

    useEffect(() => {
        fetchDataModel();
    }, []);

    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [SelectBrand, setSelectBrand] = useState(null);
    const [isPopupVisible, setPopupVisibility] = useState(false);

    const handleClosePopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setFormData({
                id: '',
                Name: '',
                IdBrand: ''
            });
            setSelectBrand(null);
            setPopupVisibility(false);
            setIsClosingPopup(false);
        }, 500);
    };

    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s',
        zIndex: '1000000' // Default animation
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
    const [FormData, setFormData] = useState({
        id: '',
        Name: '',
        IdBrand: ''
    });

    const [idModel, setIdModel] = useState(null);

    const handleEditClick = (ID) => {
        const SelectModel = Model.find(model => model.id === ID);
        if (SelectModel) {
            setFormData({
                id: SelectModel.id,
                Name: SelectModel.name,
                IdBrand: SelectModel.idBrand
            });
            setSelectBrand({ value: SelectModel.idBrand, label: SelectModel.nameBrand });
        }
        setPopupVisibility(true);
    };

    // Fetch data brand
    const [Brand, setBrand] = useState([]);
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };

    useEffect(() => {
        axios.get('http://localhost:5278/api/Brand/GetBrand')
            .then(response => {
                const ModelOptions = response.data.map(brand => ({
                    value: brand.id,
                    label: brand.name
                }));
                setBrand(ModelOptions);
                console.log(ModelOptions);
            })
            .catch(error => {
                console.error('Error fetching brands:', error);
            });
    }, []);

    const handleUpdateBrand = async (e) => {
        e.preventDefault();
        if (FormData.Name === '' || FormData.IdBrand === '') {
            Swal.fire({
                icon: 'error',
                title: 'empty field !!',
                timer: 1500
            });
            return;
        }
        setloading(true)
        
        const response = await fetch(`http://localhost:5278/api/Warehouse/updateModel/${FormData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:FormData.Name,idBrand:FormData.IdBrand})
        });

        if (response.ok) {
            setloading(false)
          setPopupVisibility(false)
            Swal.fire({
                icon: 'success',
                title: 'Update Success',
                timer: 1500
            });
            fetchDataModel();
            
        } else {
            setloading(false)
            Swal.fire({
                icon: 'error',
                title: 'Update Fail',
                timer: 1500
            });
        }
    };


    const handleSelectBrand = (optionValue) => {
        setSelectBrand(optionValue);
        setFormData({ ...FormData, IdBrand: optionValue.value });
    };

    const handleInputNameChange = (event) => {
        setFormData({ ...FormData, Name: event.target.value });
    };
    const DeleteSubmit = async (ID) => {
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
                const response = await fetch(`http://localhost:5278/api/Model/DeleModel/${ID}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion Form successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get("http://localhost:5278/api/Model/ShowModel");
                    setModel(response.data.result)
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
    return (
        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title">MODEL LIST</h4>
                    <p
                        className="card-description"></p>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th> # </th>
                                    <th> Name </th>
                                    <th>Brand</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentModel.map((brand, index) => (
                                    <tr key={brand.id}>
                                        <td>{index + 1}</td>
                                        <td>{brand.name}</td>
                                        <td>{brand.nameBrand}</td>
                                        <td>
                                            <button className="btn btn-dark btn-icon-text" onClick={() => handleEditClick(brand.id)}>
                                                Edit <i className="ti-file btn-icon-append"></i>
                                            </button>
                                        </td>
                                        <td><button className='bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded ' onClick={()=>DeleteSubmit(brand.id)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <Pagination
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            pageCount={Math.ceil(Model.length / perPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
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
                                <button onClick={handleClosePopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                            <div style={{ marginTop: '16px' }}>
                                <h3 className="box-title1">Edit Model</h3>
                            </div>
                            <form role="form" onSubmit={handleUpdateBrand}>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label className='float-left'>Name</label>
                                        <input type="text" className="form-control" value={FormData.Name} onChange={handleInputNameChange} placeholder="Full Name" />
                                    </div>
                                    <div className="form-group">
                                        <label className='float-left'>Brand</label>
                                        <br />
                                        <Select value={SelectBrand} onChange={handleSelectBrand} options={Brand} />
                                    </div>

                                </div>
                                <div className="box-footer">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>

    );
};
