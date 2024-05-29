import React, { useEffect, useState } from "react";
import LayoutEmployee from "../Layout/Layout";
import Pagination from 'react-paginate';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
function ShowWareHouseCar() {
    const [WareHouse, setWareHouse] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionData, setSessionData] = useState(null);
    useEffect(() => {
        const data = sessionStorage.getItem('sessionData');
        if (data) {
            setSessionData(JSON.parse(data));
        }
    }, [])

    const [searchTerm, setSearchtem] = useState('');
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/WareHouse/GetWareHouseCar");
                setWareHouse(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const filterWareHouse = WareHouse.filter(ware =>
        ware.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const IndexoflastWareHouse = (currentPage + 1) * perPage;
    const IndexofFirstWareHouse = IndexoflastWareHouse - perPage;
    const CurrentWareHouse = filterWareHouse.slice(IndexofFirstWareHouse, IndexoflastWareHouse)
    const DetailWareHouse=(WareHouse)=>{
        const updatedSessionData={...sessionData,IDCarWareHouse:WareHouse.id,NameWareHouse:WareHouse.name};
        sessionStorage.setItem('sessionData',JSON.stringify(updatedSessionData));
        navigate(`/WareHouse/DetailWareHouseCar/${WareHouse.id}`,{state:updatedSessionData});
    }
    return (
        <>
            <LayoutEmployee>
                <div className="main-panel">
                    <div className="content-wrapper">

                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">

                                    <div class="card-body">

                                        <h4 class="card-title">Car WareHouse</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1"
                                                value={searchTerm} onChange={(e) => setSearchtem(e.target.value)}
                                                placeholder="Enter WareHouse" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Name </th>

                                                        <th>Total Car</th>
                                                        <th>Detail</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentWareHouse.map((warehouse, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{warehouse.name}</td>
                                                            <td>{warehouse.totalCar}</td>
                                                            <td><button disabled={warehouse.totalCar <= 0} style={{
                                                                opacity: warehouse.totalCar <= 0 ? 0.5 : 1,
                                                                cursor: warehouse.totalCar <= 0 ? 'not-allowed' : 'pointer'
                                                            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() =>DetailWareHouse(warehouse) }>Detail</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>


                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(filterWareHouse.length / perPage)}
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

                    <footer className="footer">
                        <div className="d-sm-flex justify-content-center justify-content-sm-between">
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023. Premium <a
                                href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i
                                className="ti-heart text-danger ms-1"></i></span>
                        </div>
                    </footer>

                </div>


            </LayoutEmployee>
        </>
    )
}
export default ShowWareHouseCar;