import React, { useEffect, useState } from "react";
import LayoutEmployee from "../Layout/Layout";
import Pagination from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
function DetailCreateCarWareHouse() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionData, setSessionData] = useState(null);
    useEffect(() => {
        const data = sessionStorage.getItem('sessionData');
        if (data) {
            setSessionData(JSON.parse(data));
        }
    }, [])
    const [Car,setCar]=useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [IsCloginImage, setIsClosingImage] = useState(false)
    const handleImageClick=(imageUrl)=>{
        setPreviewImage(imageUrl)
    }
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
 
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get(`http://localhost:5278/api/WareHouse/DetailCartoShowRoom/${sessionData.IDCarShowroom}`);
                setCar(response.data.result)
            }catch(error){
                console.log(error)
            }
        }
        if(sessionData && sessionData.IDCarShowroom){
            fetchdata();
        }
        
    },[sessionData])
    const FilterCar=Car.filter(car=>
        car.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexoflastCar=(currentPage + 1) * perPage;
    const indexOfFirtCar=indexoflastCar - perPage;
    const CurrentCar=FilterCar.slice(indexOfFirtCar,indexoflastCar)
    const handleZoomIn = () => {
        const image = document.getElementById('preview-image');
        if (image) {
            image.style.width = (image.clientWidth * 1.2) + 'px';
        }
    };
    const handleClosePreview = () => {


        setIsClosingImage(true);

        setTimeout(() => {

            setPreviewImage(null)


            setIsClosingImage(false)
        }, 500);
    }
    const handleZoomOut = () => {
        const image = document.getElementById('preview-image');
        if (image) {
            image.style.width = (image.clientWidth / 1.2) + 'px'
        }
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
                                            onClick={() => navigate("/WareHouse/CreateCarWareHouse")}>Back
                                        </button>
                                        {sessionData ? (
                                              <h4 class="card-title">Detail {sessionData.NameShowroom}</h4>
                                             ) : (
                                                <h4 class="card-title">Detail </h4>
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
                                                        <th>Quantity</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentCar.map((Car,index)=>(
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{Car.name}</td>
                                                            <td>{Car.model}</td>
                                                            <td><div
                                                                style={{
                                                                    backgroundColor: Car.colorInSide,
                                                                    width: '64px',
                                                                    height: '62px',
                                                                    marginTop: '10px',
                                                                    border: '1px solid #000',
                                                                    borderRadius: '40px'
                                                                }}></div></td>
                                                                 <td><div
                                                                style={{
                                                                    backgroundColor: Car.colorOutSide,
                                                                    width: '64px',
                                                                    height: '62px',
                                                                    marginTop: '10px',
                                                                    border: '1px solid #000',
                                                                    borderRadius: '40px'
                                                                }}></div></td>
                                                                 <td>{Car.numberofSeat}</td>
                                                                 <td>{Car.version}</td>
                                                                <td>{Car.price}$</td>
                                                                <td>{Car.weight}</td>
                                                                <td>{Car.speedAbillity}</td>
                                                                <td>{Car.maxSpeed}</td>
                                                                <td>{Car.form}</td>
                                                                <td>{Car.heightBetween}</td>
                                                                <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>handleImageClick(Car.picture.pictureLink)}>Preview</button></td>
                                                                <td>{Car.totalCar}</td>
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
export default DetailCreateCarWareHouse;