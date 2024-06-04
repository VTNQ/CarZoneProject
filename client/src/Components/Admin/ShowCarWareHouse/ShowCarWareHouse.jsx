import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LayoutAdmin from "../Layout/Layout";
import Cookies from 'js-cookie';
import Pagination from 'react-paginate';
import axios from "axios";
function ShowCarWareHouse() {
    const navigate = useNavigate();
    const [loading, setloading] = useState(true)
    const [CarWareHouse, setCarWareHouse] = useState([]);
    const [sessionData, setSessionData] = useState(null);
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession);
        }
        return null;
    }
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const FilterCar = CarWareHouse.filter(Empl =>
        Empl.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastCar = (currentPage + 1) * perPage;
    const indexOfFirtCar = indexOflastCar - perPage;
    const currentCar = FilterCar.slice(indexOfFirtCar, indexOflastCar)
    useEffect(() => {
        const data = getUserSession();

        if (data && data.role == 'Admin') {
            setSessionData(data);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/CarWareHouse/${sessionData.idShowroom}`)
                setCarWareHouse(response.data.result)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        if (sessionData && sessionData.idShowroom) {
            fetchdata();
        }

    }, [sessionData])
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
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
                                        <h4 class="card-title">Car WareHouse</h4>
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
                                                        <th>Name</th>
                                                        <th>Image</th>
                                                        <th>Quanlity</th>



                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentCar.map((Ware, index) => (

                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{Ware.name}</td>
                                                            <td><img src={Ware.picture.pictureLink} width="100" height="100" alt="" style={{ objectFit: 'cover', width: '30%', height: '100%', borderRadius: '0%' }} /></td>
                                                            <td>{Ware.quality}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterCar.length / perPage)}
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
export default ShowCarWareHouse;