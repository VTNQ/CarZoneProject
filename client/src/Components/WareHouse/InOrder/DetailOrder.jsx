import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import Pagination from 'react-paginate';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function DetailOrder() {
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.ID || '';
    const username = location.state?.fullName || '';
    const email = location.state?.email || '';
    const idShowroom = location.state?.idShowroom || '';
    const IDInorder = location.state?.IDInorder || '';
    const [Detail, setDetail] = useState([]);
    const [searchTerm, setSearchtem] = useState('');
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const FilterDetail = Detail.filter(Deta =>
        Deta.car.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastInDetail = (currentPage + 1) * perPage;
    const indexOfFirtDetail = indexOflastInDetail - perPage;
    const CurrentDetail = FilterDetail.slice(indexOfFirtDetail, indexOflastInDetail)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/InOrder/DetailInOrder/${IDInorder}`)
                setDetail(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
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
                                        onClick={()=>navigate("/WareHouse/InOrder",{state:{ID:ID,fullName:username,email:email,idShowroom:idShowroom}})}
                                        >Back
                                        </button>
                                        <h4 class="card-title">Detail</h4>
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
                                                        <th>Car </th>
                                                        <th>Delivery Date</th>
                                                        <th>Price</th>
                                                        <th>Tax</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentDetail.map((detail, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{detail.car}</td>
                                                            <td>{new Date(detail.deleveryDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{detail.price}$</td>
                                                            <td>{detail.tax}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterDetail.length / perPage)}
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
export default DetailOrder;