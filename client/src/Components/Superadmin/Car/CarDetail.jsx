import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

export const CarDetail = () => {
  const { id } = useParams();
  const [carDetail, setCarDetail] = useState([]);
  const navigate = useNavigate();

  const [loading, setloading] = useState(true)

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
   
    if (data && data.role=='Superadmin') {
        setSessionData(data);
    } else{
      navigate('/login');
    }
}, [navigate]);
  useEffect(() => {
    const fetchCarDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5278/api/Car/findCarById/${id}`);
        setCarDetail(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching car detail:', error);
      } finally {
        setloading(false)
      }
    };

    fetchCarDetail();
  }, [id]);

  if (!carDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {loading && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
        </div>

      )}
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="row">
            <div className="col-md-6 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded mb-6" onClick={() => navigate('/superadmin/carTable')}>Back</button>

                  <div className='w-full flex justify-center'>
                    <h4 className="card-title">DETAIL CAR</h4>
                  </div>

                  <p className="card-description">
                    Information of Car
                  </p>

                  {carDetail.map((Cus, index) => (
                    <div key={Cus.id}>
                      <div className="form-group">
                        <label for="carName">Name Car</label>
                        <input type="text" className="form-control form-control-sm" value={Cus.name} id="carName" readOnly />
                      </div>


                      <div className='flex gap-2'>
                        <div className="form-group">
                          <label for="carName">Price</label>
                          <input type="number" className="form-control form-control-sm" value={Number(Cus.price).toFixed(2)} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Created </label>
                          <input type="text" className="form-control form-control-sm" value={new Date(Cus.dateAccept).toLocaleDateString()} id="dateAccept" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Weight </label>
                          <input type="text" className="form-control form-control-sm" value={Number(Cus.weight).toFixed(2)} id="dateAccept" readOnly />
                        </div>

                      </div>
                      <div className='flex gap-2'>
                        <div className="form-group">
                          <label for="carName">Brand</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.nameBrand} id="carName" readOnly />
                        </div><div className="form-group">
                          <label for="carName">Model</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.nameModel} id="carName" readOnly />
                        </div><div className="form-group">
                          <label for="carName">Version</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.nameVersion} id="carName" readOnly />
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <div className="form-group">
                          <label for="carName">Condition</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.condition} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Engine</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.engine} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Drivertrain</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.drivertrain} id="carName" readOnly />
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <div className="form-group">
                          <label for="carName">Fuel Type</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.fuelType} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">MotorSize</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.motorSize} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Bhp</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.bhp} id="carName" readOnly />
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <div className="form-group">
                          <label for="carName">Number Of Seat</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.numberOfSeat} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Mileage</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.mileage} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Transmission</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.transmission} id="carName" readOnly />
                        </div>

                      </div>
                      <div className='flex gap-2'>
                        <div className="form-group">
                          <label for="carName">Length</label>
                          <input type="text" className="form-control form-control-sm" value={Number(Cus.length).toFixed(2)} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Width</label>
                          <input type="text" className="form-control form-control-sm" value={Number(Cus.width).toFixed(2)} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Height</label>
                          <input type="text" className="form-control form-control-sm" value={Number(Cus.height).toFixed(2)} id="carName" readOnly />
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <div className="form-group">
                          <label for="carName">Fuel Consumption</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.fuelConsumption} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">SpeedAbility</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.speedAbility} id="carName" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">MaxSpeed</label>
                          <input type="text" className="form-control form-control-sm" value={Cus.maxSpeed} id="carName" readOnly />
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <div className="form-group">
                          <label for="carName">Off Road</label>
                          <input type="text" className="form-control form-control-sm" value={carDetail.offRoad ? 'Yes' : 'No'} id="carOffRoad" readOnly />
                        </div>
                        <div className="form-group">
                          <label for="carName">Height Between</label>
                          <input type="text" className="form-control form-control-sm" value={Number(Cus.heightBetween).toFixed(2)} id="carName" readOnly />
                        </div>

                      </div>
                      <div className='flex gap-16'>
                        <div className="form-group">
                          <label for="carName">Exterior Color</label>
                          <div
                            style={{
                              backgroundColor: Cus.idColorOutSide,
                              width: '64px',
                              height: '62px',
                              marginTop: '10px',
                              border: '1px solid #000',
                              borderRadius: '40px'
                            }}></div>
                        </div>
                        <div className="form-group">
                          <label for="carName">Interior Color</label>
                          <div
                            style={{
                              backgroundColor: Cus.idColorInSide,
                              width: '64px',
                              height: '62px',
                              marginTop: '10px',
                              border: '1px solid #000',
                              borderRadius: '40px'
                            }}></div>
                        </div>


                      </div>


                    </div>
                  ))}

                </div>
              </div>
            </div>
            <div class="col-md-6 stretch-card grid-margin">
              <div class="row">
                <div class="col-md-12 grid-margin stretch-card">
                  {carDetail.map((cus, index) => (
                    <div class="card ">
                      <div class="card-body bg-[#4747A1] rounded-[18px]">
                        <p class="card-title text-white">Main Photo</p>
                        <img src={cus.mainPhoto?.link} alt="Main Photo" width="100%" height="200px" style={{ objectFit: 'cover', borderRadius: '10px' }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div class="col-md-12 stretch-card grid-margin grid-margin-md-0">
                  <div class="card data-icon-card-primary">
                    <div className="card-body grid grid-cols-2 gap-4">
                      {carDetail.map((cus) => cus.subPhotos?.map((photo, index) => (
                        <img key={index} src={photo.link} alt="Sub Photo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                      )))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="d-sm-flex justify-content-center justify-content-sm-between">
            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021. Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="ti-heart text-danger ml-1"></i></span>
          </div>
        </footer>
      </div>
    </>
  );
}
