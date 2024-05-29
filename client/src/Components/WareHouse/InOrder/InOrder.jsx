import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-paginate';
import LayoutAdmin from "../Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function InOrder() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionData, setSessionData] = useState(null);
    useEffect(() => {
        const data = sessionStorage.getItem('sessionData');
        if (data) {
            setSessionData(JSON.parse(data));
        }
    }, [])
    const [Inorder, setInOrder] = useState([]);
    const [searchTerm, setSearchtem] = useState('');
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const filterOrder=Inorder.filter(inorder=>
        inorder.employee.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastOrder=(currentPage + 1) * perPage;
    const IndexofFirstOrder=indexOflastOrder - perPage;
    const CurrentOrder=filterOrder.slice(IndexofFirstOrder,indexOflastOrder)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowOrderWareHouse/${sessionData.idShowroom}`)
                setInOrder(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.idShowroom){
            fetchdata();
        }
       
    }, [sessionData])
    const DetailInorder=(InOrder)=>{
        const updatedSessionData={...sessionData,IDInorder:InOrder.id};
        sessionStorage.setItem('sessionData',JSON.stringify(updatedSessionData));
        navigate(`/WareHouse/DetaiInOrder/${InOrder.id}`,{state:updatedSessionData});
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
                                        <h4 class="card-title">In Order</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter Employee" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th>Employee</th>
                                                        <th> WareHouse </th>
                                                        <th>Supplier</th>
                                                        <th> Date of Sale </th>
                                                        <th> Total Amount</th>
                                                        <th> Total Tax </th>
                                                        <th>Payment</th>
                                                        <th>Detail</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentOrder.map((inorder, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{inorder.employee}</td>
                                                            <td>{inorder.wareHouse}</td>
                                                            <td>{inorder.supplier}</td>
                                                            <td>{new Date(inorder.dateofSale).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{inorder.totalAmount}$</td>
                                                            <td>{inorder.toTalTax}$</td>
                                                            <td>{inorder.payment}</td>
                                                            <td><button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>DetailInorder(inorder)}

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
                                                pageCount={Math.ceil(filterOrder.length / perPage)}
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
export default InOrder;