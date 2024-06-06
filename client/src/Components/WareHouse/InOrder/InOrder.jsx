import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-paginate';
import LayoutAdmin from "../Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

function InOrder() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading,setloading]=useState(true);
   
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
    
    if (data && data.role=='WareHouse') {
        setSessionData(data);
    } else {
        // If no session data, redirect to login
        navigate('/login');
    }
}, [navigate]);
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
                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowOrderWareHouse/${sessionData.idWarehouse}`)
                setInOrder(response.data.result)
            } catch (error) {
                console.log(error)
            }finally{
                setloading(false)
            }
        }
        if(sessionData && sessionData.idWarehouse){
            fetchdata();
        }
       
    }, [sessionData])
    const DetailInorder=(InOrder)=>{
        const updatedSessionData={...sessionData,IDInorder:InOrder.id};
        Cookies.set('UserSession', JSON.stringify(updatedSessionData), { expires: 0.5, secure: true, sameSite: 'strict' });
        navigate(`/WareHouse/DetaiInOrder/${InOrder.id}`,{state:updatedSessionData});
    }
   
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