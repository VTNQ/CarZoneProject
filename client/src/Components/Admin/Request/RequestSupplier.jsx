import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import Swal from 'sweetalert2';
import Select from "react-select"
import axios from "axios";
import Pagination from 'react-paginate';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function RequestSupplier() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(true)
    const location = useLocation();
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [sessionData, setSessionData] = useState(null);
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession);
        }
        return null;
    }

    useEffect(() => {
        const data = getUserSession();

        if (data && data.role == 'Admin') {
            setSessionData(data);
        } else {
            navigate('/login');
        }
    }, [navigate]);
    const [Request, setReQuest] = useState([]);
    const [IsDescriptionChange, setIsDescriptionChange] = useState(false)
    const [Supplier, setSupplier] = useState([]);
    const [SelectSupplier, SetSelectSupplier] = useState(null);
    const handleSupplier = (SelectSupplier) => {
        SetSelectSupplier(SelectSupplier)
    }
    const [FromData, setFromData] = useState({
        Description: '',
        ShowDescription: ''
    })
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/Request/ShowRequestSupplier/${sessionData.fullName}`);
                setReQuest(response.data.result)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        if (sessionData && sessionData.fullName) {
            fetchdata();
        }

    }, [sessionData])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Request/ShowSupplier");
                setSupplier(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (SelectSupplier?.value == null || FromData.Description == '') {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch("http://localhost:5278/api/Request/AddRequest", {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ to: SelectSupplier?.value, from: sessionData.fullName, type: false, description: FromData.Description })
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Add success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    const response = await axios.get(`http://localhost:5278/api/Request/ShowRequestSupplier/${sessionData.fullName}`);
                    setReQuest(response.data.result)
                    setFromData({
                        Description: '',
                        ShowDescription: ''
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    const handleDescriptionChange = (value) => {
        setFromData({
            ...FormData,
            Description: value
        })
    }
    const handleClosepopup = () => {
        setIsDescriptionChange(true);
        setTimeout(() => {

            setFromData({
                ShowDescription: ''
            })

            setPopupVisibility(false)
            setIsDescriptionChange(false)
        }, 500);
    }
    const handleShowDescription = (ID) => {
        const RequestFilter = Request.find(re => re.id == ID)

        if (RequestFilter) {
            FromData.ShowDescription = RequestFilter.decription;
        }

        setPopupVisibility(true)
    }
    const DescriptionType = {
        animation: 'flipleft 0.5s',
        zindex: '1000000'
    }
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };

    const [searchTerm, setSearchtem] = useState('');
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const filterRequest = Request.filter(Re =>
        Re.to.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastRequest = (currentPage + 1) * perPage;
    const indexOfFirtRequest = indexOflastRequest - perPage;
    const currentRequest = filterRequest.slice(indexOfFirtRequest, indexOflastRequest);
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
                                        <h4 class="card-title">Request Supplier</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={handleSubmit}>
                                            <div class="form-group" >
                                                <label for="exampleInputUsername1">Supplier</label>
                                                <Select options={Supplier.map(ware => ({ value: ware.name, label: ware.name }))}
                                                    value={SelectSupplier}
                                                    onChange={(SelectedOption) => handleSupplier(SelectedOption)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label for="exampleInputUsername1">Descrtion</label>
                                                <ReactQuill
                                                    theme="snow"
                                                    value={FromData.Description}
                                                    onChange={handleDescriptionChange}
                                                    placeholder='Enter Description'



                                                />
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

                                        <h4 class="card-title">Request Supplier</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter Name Or Email" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> To </th>


                                                        <th> Create Day</th>
                                                        <th>Description</th>



                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {currentRequest.map((request, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{request.to}</td>

                                                            <td>{new Date(request.creadate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>  <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleShowDescription(request.id)}

                                                            >Description
                                                            </button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(filterRequest.length / perPage)}
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

                                            {isPopupVisible && (

                                                <div className="preview-modal"      >


                                                    <div className="preview-content1" style={IsDescriptionChange ? { ...DescriptionType, ...closingAnimation } : DescriptionType}>
                                                        <div className='flex justify-end'>
                                                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right " onClick={handleClosepopup}><i className="fas fa-times"></i></button>
                                                        </div>
                                                        <div style={{ marginTop: '16px', textAlign: 'center' }}>

                                                            <h3 className="box-title1">Description</h3>
                                                        </div>
                                                        <p dangerouslySetInnerHTML={{ __html: FromData.ShowDescription }} />

                                                    </div>
                                                </div>
                                            )}

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




        </>
    )
}
export default RequestSupplier;