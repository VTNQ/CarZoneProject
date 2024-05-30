import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-paginate';
import Cookies from 'js-cookie'
import axios from "axios";
function DetailOutOrders() {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [searchTerm, setSearchtem] = useState('');
   
    const [DetailOutOrder, setDetailOutOrder] = useState([]);
    const[Invoice,SetInvoice]=useState([]);
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [Contract,setContract]=useState([])
    const [index,setindex]=useState(1);
    const getUserSession=()=>{
        const UserSession=Cookies.get("UserSession");
        if(UserSession){
            return JSON.parse(UserSession);
        }
        return null;
    }
    const [sessionData, setSessionData] = useState(null);
    useEffect(() => {
        const data = getUserSession();
        
        if (data) {
            setSessionData(data);
        } else {
            // If no session data, redirect to login
            navigate('/login');
        }
    }, [navigate]);

    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get(`http://localhost:5278/api/OutOrder/ShowContract/${sessionData.IDOutOrder}`);
                setContract(response.data)
            }catch(error){
                console.log(error)
            }
        }
        if(sessionData && sessionData.IDOutOrder){
            fetchdata();
        }
        
    },[sessionData])
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get(`http://localhost:5278/api/OutOrder/ShowInvoice/${sessionData.IDOutOrder}`);
                SetInvoice(response.data)
            }catch(error){
                console.log(error)
            }
        }
        if(sessionData && sessionData.IDOutOrder){
            fetchdata();
        }
        
    },[sessionData])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/DetailOutOrder/${sessionData.IDOutOrder}`)
                setDetailOutOrder(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.IDOutOrder){
            fetchdata();
        }
        
    }, [sessionData])
    const FilterDetailOrder = DetailOutOrder.filter(Detail =>
        Detail.car.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const IndexoflastDetail = (currentPage + 1) * perPage;
    const IndexOfFirtDetail = IndexoflastDetail - perPage;
    const CurrentDetail = FilterDetailOrder.slice(IndexOfFirtDetail, IndexoflastDetail)
    const handleBackClick=()=>{
        const{IDOutOrder,...restSessionData } = sessionData;
        Cookies.set('UserSession',JSON.stringify(restSessionData), { expires: 0.5, secure: true, sameSite: 'strict' });
        navigate("/Outorder",{state:restSessionData});
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
                                    <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                        onClick={handleBackClick}
                                        >Back
                                        </button>
                                        <h4 class="card-title">Detail Out Order</h4>
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
                                                        <th> Car </th>

                                                        <th> Delivery Date </th>
                                                        <th> Price</th>
                                                        <th> Tax </th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentDetail.map((Detail, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{Detail.car}</td>
                                                            <td>{new Date(Detail.deliveryDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{Detail.price}</td>
                                                            <td>{Detail.tax}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterDetailOrder.length / perPage)}
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

                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                   
                                        <h4 class="card-title">Invoice</h4>
                                     
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                      <th>Date Create</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                               
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>{new Date(Invoice.dateCreate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    </tr>
                                        
                                                </tbody>
                                            </table>

                                           

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                   
                                        <h4 class="card-title">Contract</h4>
                                     
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                      <th>Condition</th>
                                                      <th>create Date</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                               
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>{Contract.condition}</td>
                                                        <td>{new Date(Contract.createDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    </tr>
                                        
                                                </tbody>
                                            </table>

                                           

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
export default DetailOutOrders;