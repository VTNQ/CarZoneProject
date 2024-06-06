import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-paginate';
import axios from "axios";

export const DetailOrderSpm = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchtem] = useState('');
    const [DetailOutOrder, setDetailOutOrder] = useState([]);
    const [Invoice, SetInvoice] = useState({});
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [Contract, setContract] = useState({});
    const IDOutOrder = location.state?.IDOutOrder;

    useEffect(() => {
        const fetchContract = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowAllContract/`);
                setContract(response.data); // Access the first result object
            } catch (error) {
                console.log(error);
            }
        };
        fetchContract();
    }, [IDOutOrder]);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowInvoice/${IDOutOrder}`);
                SetInvoice(response.data.result[0] || {}); // Access the first result object
            } catch (error) {
                console.log(error);
            }
        };
        fetchInvoice();
    }, [IDOutOrder]);

    useEffect(() => {
        const fetchDetailOutOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/DetailOutOrder/${IDOutOrder}`);
                if (Array.isArray(response.data.result)) {
                    setDetailOutOrder(response.data.result); // Access the result array
                } else {
                    console.error("API response is not an array:", response.data);
                    setDetailOutOrder([]);
                }
            } catch (error) {
                console.log(error);
                setDetailOutOrder([]);
            }
        };
        fetchDetailOutOrder();
    }, [IDOutOrder]);

    const FilterDetailOrder = Array.isArray(DetailOutOrder)
        ? DetailOutOrder.filter(Detail =>
            Detail.car.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };

    const IndexoflastDetail = (currentPage + 1) * perPage;
    const IndexOfFirtDetail = IndexoflastDetail - perPage;
    const CurrentDetail = FilterDetailOrder.slice(IndexOfFirtDetail, IndexoflastDetail);

    const handleBackClick = () => {
        navigate("/superadmin/Order", { state: { ...location.state, IDOutOrder: undefined } });
    };

    return (
        <>
            <div class="main-panel">
                <div class="content-wrapper">
                    <div className="row">
                        <div class="col-lg-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <div className="flex justify-between">
                                        <h4 class="card-title">Detail Out Order</h4>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                            onClick={handleBackClick}
                                        >Back
                                        </button>
                                    </div>
                                    <form class="forms-sample">
                                        <label for="exampleInputUsername1">Search</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            id="exampleInputUsername1"
                                            value={searchTerm}
                                            onChange={(e) => setSearchtem(e.target.value)}
                                            placeholder="Enter Full Name"
                                        />
                                    </form>
                                    <p class="card-description"></p>
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
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
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
                        <div class="col-lg-3 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Invoice</h4>
                                    <p class="card-description"></p>
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Date Create</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{new Date(Invoice.dateCreate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Contract</h4>
                                    <p class="card-description"></p>
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Condition</th>
                                                    <th>create Date</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{Contract.condition || "N/A"}</td> {/* Handle undefined condition */}
                                                    <td>{Contract.createDate ? new Date(Contract.createDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A"}</td>
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
        </>
    );
};
