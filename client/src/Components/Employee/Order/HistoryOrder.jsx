import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-paginate';
import Swal from "sweetalert2";
import axios from "axios";
function HistoryOrder() {
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.ID || '';
    const username = location.state?.fullName || '';

    const email = location.state?.email || '';
    const idShowroom = location.state?.idShowroom || '';
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [Order, setOrder] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowOutOrder/${ID}`)
                setOrder(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const [FromData, setFromData] = useState({
        id: '',
        Condition: '',
    })
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
            setFromData({
                id: '',
                Condition: '',
            })


            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const [searchTerm, setSearchtem] = useState('');
    const FilterOrder = Order.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const IndexoflastOrder = (currentPage + 1) * perPage;
    const IndexofFirstOrder = IndexoflastOrder - perPage;
    const CurrentOrder = FilterOrder.slice(IndexofFirstOrder, IndexoflastOrder)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const AddContract = async (event) => {
        event.preventDefault();
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
                    Condition: '',
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
    const handleAddContract = (ID) => {
        const SelectOrder = Order.find(order => order.id == ID);
        if (SelectOrder) {
            FromData.id = SelectOrder.id;
        }
        setPopupVisibility(true)
    }
    return (
        <>
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">

                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">History Order</h4>
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
                                                        <th>Add Contract</th>
                                                        <th>Show Contract</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentOrder.map((order, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{order.customer}</td>
                                                            <td>{new Date(order.dateofSale).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{order.totalAmount}</td>
                                                            <td>{order.totalTax}</td>
                                                            <td>{order.payment}</td>
                                                            <td>{order.deliveryType}</td>
                                                            <td><button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleAddContract(order.id)}

                                                            >Add
                                                            </button></td>
                                                            <td><button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => navigate(`/Employee/ShowContract/${order.id}`, {
                                                                    state: {
                                                                        ID: ID,
                                                                        fullName: username,
                                                                        email: email,
                                                                        idShowroom: idShowroom,
                                                                        idOrder: order.id
                                                                    }
                                                                })}

                                                            >View
                                                            </button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterOrder.length / perPage)}
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

                            <h3 className="box-title1">Add Contract</h3>
                        </div>
                        <form role="form" onSubmit={AddContract}>
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
export default HistoryOrder;