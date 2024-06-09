import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-paginate';
import Cookies from 'js-cookie'
import axios from "axios";
function ShowCarWareHouse() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setloading] = useState(true)

    const [IsCloginImage, setIsClosingImage] = useState(false)

    const [sessionData, setSessionData] = useState(null);
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession);
        }
        return null;
    }

    useEffect(() => {
        const data = getUserSession();

        if (data && data.role == 'Admin') {
            setSessionData(data);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const [Car, setCar] = useState([])
    const [previewImage, setPreviewImage] = useState(null);
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const handleImageClick = (imageUrl) => {
        setPreviewImage(imageUrl)
    }
    const FilterCar = Car.filter(Empl =>
        Empl.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastCar = (currentPage + 1) * perPage;
    const indexOfFirtCar = indexOflastCar - perPage;
    const currentCar = FilterCar.slice(indexOfFirtCar, indexOflastCar)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const handleZoomOut = () => {
        const image = document.getElementById('preview-image');
        if (image) {
            image.style.width = (image.clientWidth / 1.2) + 'px'
        }
    }
    const handleZoomIn = () => {
        const image = document.getElementById('preview-image');
        if (image) {
            image.style.width = (image.clientWidth * 1.2) + 'px';
        }
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/ShowWareHouse/${sessionData.idShowroom}`)
                setCar(response.data.result)
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
    const handleClosePreview = () => {


        setIsClosingImage(true);

        setTimeout(() => {

            setPreviewImage(null)


            setIsClosingImage(false)
        }, 500);
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
                                        <h4 class="card-title">Car ShowRoom</h4>
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
                                                        <th> Name </th>

                                                        <th> Model </th>
                                                        <th> ColorInSize</th>
                                                        <th> ColorOutSize </th>
                                                        <th>Number Seat</th>
                                                        <th>Version</th>
                                                        <th>Price</th>
                                                        <th>Weight</th>
                                                        <th>Speed Ability</th>
                                                        <th>Max Speed</th>
                                                        <th>Form</th>
                                                        <th>Height Between</th>
                                                        <th>Picture</th>



                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentCar.map((car, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{car.name}</td>
                                                            <td>{car.model}</td>
                                                            <td><div
                                                                style={{
                                                                    backgroundColor: car.colorInSide,
                                                                    width: '64px',
                                                                    height: '62px',
                                                                    marginTop: '10px',
                                                                    border: '1px solid #000',
                                                                    borderRadius: '40px'
                                                                }}></div></td>
                                                            <td><div
                                                                style={{
                                                                    backgroundColor: car.colorOutSide,
                                                                    width: '64px',
                                                                    height: '62px',
                                                                    marginTop: '10px',
                                                                    border: '1px solid #000',
                                                                    borderRadius: '40px'
                                                                }}></div></td>
                                                            <td>{car.numberofSeat}</td>
                                                            <td>{car.version}</td>
                                                            <td>{car.price}$</td>
                                                            <td>{car.weight}</td>
                                                            <td>{car.speedAbillity}</td>
                                                            <td>{car.maxSpeed}</td>
                                                            <td>{car.form}</td>
                                                            <td>{car.heightBetween}</td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleImageClick(car.picture.pictureLink)}>Preview</button></td>

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
                                            {previewImage && (
                                                <div className="preview-modal"      >
                                                    <div className="preview-content" >
                                                        <img src={previewImage} alt="Signature Preview" id="preview-image" />
                                                        <div className="preview-buttons">
                                                            <button onClick={handleClosePreview}>Close</button>
                                                            <button onClick={handleZoomIn}>Zoom In</button>
                                                            <button onClick={handleZoomOut}>Zoom out</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}


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