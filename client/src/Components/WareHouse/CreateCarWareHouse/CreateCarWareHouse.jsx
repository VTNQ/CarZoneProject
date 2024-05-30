import React, { useEffect, useState } from "react";
import LayoutEmployee from "../Layout/Layout";
import axios from "axios";
import Swal from 'sweetalert2';
import Select from "react-select"
import Pagination from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function CreateCarWareHouse() {
    const getUserSession=()=>{
        const UserSession=Cookies.get("UserSession");
        if(UserSession){
            return JSON.parse(UserSession)
        }
        return null;
    }
  
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionData, setSessionData] = useState(null);
    useEffect(() => {
        const data = getUserSession();
        
        if (data) {
            setSessionData(data);
        } else {
            // If no session data, redirect to login
            navigate('/login');
        }
    }, [navigate]);
   
   
    const [Showroom, setShowroom] = useState([]);
    const [ShowCreateCar, setShowCreateCar] = useState([]);
    const [SelectCars, setSelectCars] = useState([]);
    const [SelectShowRoom, setSelectShowRoom] = useState(null);
    const [Car, setCar] = useState([]);
    const handleChangeSelectShowRoom = (SelectShowRoom) => {
        setSelectShowRoom(SelectShowRoom)
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/GetCartoShowRoom/${sessionData.idWarehouse}`);
                setShowCreateCar(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.idWarehouse){
            fetchdata();
        }
       
    }, [sessionData])
    const handleChange = (SelectedValue) => {
        setSelectCars(SelectedValue);
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/GetCarToWareHouse/${sessionData.idWarehouse}`);
                setCar(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.idWarehouse){
            fetchdata();
        }
        
    }, [sessionData])
    const AddSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            SelectCars.forEach((Selectcar) => {
                formData.append("idCar", Selectcar?.value)
                formData.append("IdShowRoom", SelectShowRoom?.value)
            })
            const response = await fetch("http://localhost:5278/api/WareHouse/AddCarShowRoom", {
                method: 'POST',
                body: formData,
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Add Card to ShowRoom success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setSelectCars([]);
                setSelectShowRoom(null)
                const response = await axios.get(`http://localhost:5278/api/WareHouse/GetCartoShowRoom/${sessionData.idWarehouse}`);
                setShowCreateCar(response.data.result)
            }
        } catch (error) {
            console.log(error)
        }


    }
    const [perPage] = useState(5);

    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchtem] = useState('');
    const filterCarWareHouse = ShowCreateCar.filter(Show =>
        Show.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const indexOflastCarWareHouse = (currentPage + 1) * perPage;
    const indexofFirtCarWareHouse = indexOflastCarWareHouse - perPage;
    const CurrentCarWareHouse = filterCarWareHouse.slice(indexofFirtCarWareHouse, indexOflastCarWareHouse)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/GetShowroom/${sessionData.idWarehouse}`);
                setShowroom(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.idWarehouse){
            fetchData();
        }
       
    }, [sessionData])
    const DetailWareHouse=(ShowRoom)=>{
        const updatedSessionData={...sessionData,IDCarShowroom:ShowRoom.id,NameShowroom:ShowRoom.name};
        Cookies.set("UserSession",JSON.stringify(updatedSessionData),{ expires: 0.5, secure: true, sameSite: 'strict' })
      
        navigate(`/WareHouse/DetailCreateCarShowRoom/${ShowRoom.id}`,{state:updatedSessionData});
    }
    return (
        <>
            <LayoutEmployee>
                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin stretch-card">
                                <div className="card" style={{ height: 'auto' }}>
                                    <div className="card-body">
                                        <h4 className="card-title">Car Showroom</h4>
                                        <form className="forms-sample" onSubmit={AddSubmit}>
                                            <div classname="form-group">
                                                <label htmlFor="exampleInputIndentity1">ShowRoom</label>
                                                <Select options={Showroom.map(show => ({ value: show.id, label: show.name }))}
                                                    value={SelectShowRoom}
                                                    onChange={handleChangeSelectShowRoom}
                                                />
                                            </div>
                                            <br />
                                            <div classname="form-group">
                                                <label htmlFor="exampleInputIndentity1">Car</label>
                                                <Select options={Car.map(car => ({ value: car.id, label: car.name }))}
                                                    isMulti
                                                    value={SelectCars}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <br />



                                            <button type="submit" className="btn btn-primary me-2">Submit</button>

                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Car ShowRoom</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm}
                                                onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter Show Room" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th>Show Room </th>

                                                        <th> Total Car </th>
                                                        <th>Detail</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentCarWareHouse.map((car, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{car.name}</td>
                                                            <td>{car.totalCar}</td>
                                                            <td><button disabled={car.totalCar<=0}  style={{opacity:car.totalCar<=0 ? 0.5:1,
                                                                    cursor:car.totalCar<=0? 'not-allowed':'pointer'
                                                                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>DetailWareHouse(car)}>Detail</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(filterCarWareHouse.length / perPage)}
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
export default CreateCarWareHouse;