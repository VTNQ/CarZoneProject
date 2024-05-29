import React, { useEffect, useState } from "react";
import Pagination from 'react-paginate';
import LayoutEmployee from "../Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function DetailWareHousewarehouse() {
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState(null);
    const location = useLocation();
    const [sessionData, setSessionData] = useState(null);
    useEffect(() => {
        const data = sessionStorage.getItem('sessionData');
        if (data) {
            setSessionData(JSON.parse(data));
        }
    }, [])
    console.log(sessionData)
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [IsCloginImage, setIsClosingImage] = useState(false)
    const [WareHouse, setWareHouse] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/DetailWareHouseCar/${sessionData.IDCarWareHouse}`);
                setWareHouse(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.IDCarWareHouse){
            fetchdata();
        }
       
    }, [sessionData])
    const FilterCar = WareHouse.filter(car =>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexoflastCar = (currentPage + 1) * perPage;
    const indexOfFirtCar = indexoflastCar - perPage;
    const CurrentCar = FilterCar.slice(indexOfFirtCar, indexoflastCar)
    const handleImageClick = (imageUrl) => {
        setPreviewImage(imageUrl)
    }
    const handleClosePreview = () => {


        setIsClosingImage(true);

        setTimeout(() => {

            setPreviewImage(null)


            setIsClosingImage(false)
        }, 500);
    }
    const handleZoomIn = () => {
        const image = document.getElementById('preview-image');
        if (image) {
            image.style.width = (image.clientWidth * 1.2) + 'px';
        }
    };
    const handleZoomOut = () => {
        const image = document.getElementById('preview-image');
        if (image) {
            image.style.width = (image.clientWidth / 1.2) + 'px'
        }
    }
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const handleBackClick=()=>{
        const{idOrder,...restSessionData } = sessionData;
        sessionStorage.setItem('sessionData',JSON.stringify(restSessionData));
        navigate("/WareHouse/ShowWareHouseCar",{state:restSessionData});
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
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mb-3"
                                            onClick={handleBackClick}>Back
                                        </button>
                                        {sessionData ? (
                                            <h4 class="card-title">Detail WareHouse {sessionData.NameWareHouse}</h4>
                                             ) : (
                                                <h4 class="card-title">Detail WareHouse </h4>
                                            )}
                                        
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1"

                                                placeholder="Enter Car" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Name </th>
                                                        <th>Brand</th>
                                                        <th> Model </th>
                                                        <th> ColorInSize</th>
                                                        <th> ColorOutSize </th>
                                                      
                                                        <th>Price</th>
                                                        
                                                        <th>Picture</th>
                                                        <th>Quantity</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentCar.map((warehouse, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{warehouse.name}</td>
                                                            <td>{warehouse.brand}</td>
                                                            <td>{warehouse.model}</td>
                                                            <td><div
                                                                style={{
                                                                    backgroundColor: warehouse.colorInSide,
                                                                    width: '64px',
                                                                    height: '62px',
                                                                    marginTop: '10px',
                                                                    border: '1px solid #000',
                                                                    borderRadius: '40px'
                                                                }}></div></td>
                                                            <td><div
                                                                style={{
                                                                    backgroundColor: warehouse.colorOutSide,
                                                                    width: '64px',
                                                                    height: '62px',
                                                                    marginTop: '10px',
                                                                    border: '1px solid #000',
                                                                    borderRadius: '40px'
                                                                }}></div></td>
                                                          
                                                            <td>{warehouse.price}$</td>
                                                          
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleImageClick(warehouse.picture.pictureLink)}>Preview</button></td>
                                                            <td>{warehouse.totalCar}</td>
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
export default DetailWareHousewarehouse;