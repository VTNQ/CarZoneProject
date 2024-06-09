import React, { useEffect, useState } from "react";
import Select from "react-select"
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from 'react-paginate';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export const Order = () => {
    const [Customer, setCustomer] = useState([]);
    const [Car, setCar] = useState([]);
    
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [FromData, setFromData] = useState({
        id: '',
        Condition: ''
    })
    const handleContract = (id) => {
        const showout = ShowOutOrder.find(show => show.id == id)
        if (showout) {
            FromData.id = showout.id;
        }
        setPopupVisibility(true)
    }
   
    const Options = [
        { value: 0, label: 'Fast delivery' },
        { value: 1, label: 'Economical delivery' }
    ]
    const Payment = [
        { value: 0, label: "cash payment" },
        { value: 1, label: "transfer payments" }
    ]
    const navigate = useNavigate();
    const location = useLocation();
  
    const [searchTerm, setSearchtem] = useState('');
    const[loading,setloading]=useState(true)
    const [ShowOutOrder, SetShowOutOrder] = useState([]);
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
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowAllOutOrder`)
                SetShowOutOrder(response.data)
            } catch (error) {
                console.log(error)
            }finally{
                setloading(false)
            }
        }
        // if(sessionData && sessionData.ID){
        //     fetchdata();
        // }
        fetchdata();
    }, [sessionData])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/OutOrder/ShowCustomer")
                setCustomer(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/OutOrder/ShowCar")
                setCar(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    
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
            setFromData({
                id: '',
                Condition: ''
            })


            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    
    const FilterOutOrder = ShowOutOrder.filter(ShowOut =>
        ShowOut.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const IndexOflastOutOrder = (currentPage + 1) * perPage;
    const IndexOfFirtOutOrder = IndexOflastOutOrder - perPage;
    const CurrentOutOrder = FilterOutOrder.slice(IndexOfFirtOutOrder, IndexOflastOutOrder)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const AddContract1 = async (event) => {
        event.preventDefault();
        if (FromData.Condition == '') {
            Swal.fire({
                icon: 'error',
                title: 'Condition is Required',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                const response = await fetch(`http://localhost:5278/api/OutOrder/AddContract/${FromData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FromData.Condition })
                })
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Contract Success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setFromData({
                        id: '',
                        Condition: ''
                    })
                    setPopupVisibility(false)
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

    }
    const handleDetailClick=(outorder)=>{
        
        const updatedSessionData = { ...sessionData, IDOutOrder: outorder.id };
        Cookies.set('UserSession', JSON.stringify(updatedSessionData), { expires: 0.5, secure: true, sameSite: 'strict' });
      
        navigate(`/superadmin/DetailOrder/${outorder.id}`,{state:updatedSessionData})
    }
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
                        
                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Order List</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter Full Name" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Customer </th>
                                                        
                                                        <th> Date of Sale </th>
                                                        <th> Total Amount</th>
                                                        <th> Total Tax </th>
                                                        <th>Payment</th>
                                                        <th>Delivery type</th>
                                                        <th>Detail</th>

                                                        

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentOutOrder.map((show, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{show.customer}</td>
                                                            <td>{new Date(show.dateofSale).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{show.totalAmount}</td>
                                                            <td>{show.totalTax}</td>
                                                            <td>{show.payment}</td>
                                                            <td>{show.deliveryType}</td>
                                                            <td><button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                onClick={()=>handleDetailClick(show)}
                                                            >Detail
                                                            </button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterOutOrder.length / perPage)}
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


            

            {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div style={{ marginTop: '16px' }}>

                            <h3 className="box-title1">Add Contract</h3>
                        </div>
                        <form role="form" onSubmit={AddContract1}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Condition</label>
                                    <input type="text" class="form-control" value={FromData.Condition} onChange={(e) => setFromData({ ...FromData, Condition: e.target.value })} id="exampleInputUsername1" placeholder="Condition" />
                                </div>




                            </div>

                            <div className="box-footer">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded ">Add</button>
                            </div>
                        </form>


                    </div>
                </div>
            )}


        </>
    )
}

