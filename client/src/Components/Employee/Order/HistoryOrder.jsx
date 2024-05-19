import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-paginate';
import axios from "axios";
function HistoryOrder(){
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.ID || '';
    const username = location.state?.fullName || '';
   
    const email = location.state?.email || '';
    const idShowroom = location.state?.idShowroom || '';
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [Order,setOrder]=useState([]);
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get(`http://localhost:5278/api/OutOrder/ShowOutOrder/${ID}`)
                setOrder(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchdata();
    },[])
    const [searchTerm, setSearchtem] = useState('');
    const FilterOrder=Order.filter(order=>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const IndexoflastOrder=(currentPage+1)*perPage;
    const IndexofFirstOrder=IndexoflastOrder-perPage;
    const CurrentOrder=FilterOrder.slice(IndexofFirstOrder,IndexoflastOrder)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
return(
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
                                    <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)}  placeholder="Enter Full Name" />
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
                                               

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {CurrentOrder.map((order,index)=>(
                                                <tr>
                                                     <td>{++index}</td>
                                                            <td>{order.customer}</td>
                                                            <td>{new Date(order.dateofSale).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{order.totalAmount}</td>
                                                            <td>{order.totalTax}</td>
                                                            <td>{order.payment}</td>
                                                            <td>{order.deliveryType}</td>
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

   


</>
)
}
export default HistoryOrder;