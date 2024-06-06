import React, { useEffect, useState } from "react";
import LayoutEmployee from "../Layout/Layout";
import Pagination from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
function DetailCreateCarWareHouse() {
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionData, setSessionData] = useState(null);
    const [loading, setloading] = useState(true);
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
            }finally{
                setloading(false)
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
    const handleBackClick=()=>{
        const {IDCarShowroom,NameShowroom,...restSessionData}=sessionData;
        Cookies.set('UserSession',JSON.stringify(restSessionData), { expires: 0.5, secure: true, sameSite: 'strict' });
        navigate("/WareHouse/CreateCarWareHouse");
    }
    return (
        <>
         {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
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
                                                        <th>Brand</th>
                                                        <th>Engine</th>
                                                       
                                                        <th> Model </th>
                                                        <th> ColorInSize</th>
                                                        <th> ColorOutSize </th>
                                                       
                                                        <th>Price</th>
                                                       
                                                        <th>Picture</th>
                                                        <th>Quantity</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentCar.map((Car,index)=>(
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{Car.name}</td>
                                                            <td>{Car.brand}</td>
                                                            <td>{Car.engine}</td>
                                                          
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
                                                                
                                                                <td>{Car.price}$</td>
                                                              
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