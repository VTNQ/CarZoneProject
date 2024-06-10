import React, { useEffect, useState } from "react";
import LayoutEmployee from "../Layout/Layout";
import axios from "axios";
import Swal from 'sweetalert2';
import Select from "react-select"
import Pagination from "react-paginate";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function CreateCarWareHouse() {
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession)
        }
        return null;
    }
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [sessionData, setSessionData] = useState(null);


    useEffect(() => {
        const data = getUserSession();

        if (data && data.role == 'WareHouse') {
            setSessionData(data);
        } else {
            // If no session data, redirect to login
            navigate('/login');
        }
    }, [navigate]);


    const [Showroom, setShowroom] = useState([]);
   
    const [SelectCars, setSelectCars] = useState([]);
    const [SelectShowRoom, setSelectShowRoom] = useState(null);
    const [Car, setCar] = useState([]);
    const handleChangeSelectShowRoom = (SelectShowRoom) => {
        setSelectShowRoom(SelectShowRoom)
    }

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
        if (sessionData && sessionData.idWarehouse) {
            fetchdata();
        }

    }, [sessionData])
    const AddSubmit = async (event) => {
        event.preventDefault();
        if (SelectCars.length == 0 || SelectShowRoom?.value == null) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
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
                    setloading(false)
                   
                   
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Card to ShowRoom success',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    const responsedata = await axios.get(`http://localhost:5278/api/WareHouse/GetCarToWareHouse/${sessionData.idWarehouse}`);
                    setCar(responsedata.data.result)
                    setSelectCars([]);
                    setSelectShowRoom(null)
                   
                }
            } catch (error) {
                console.log(error)
            }
        }



    }
    const [perPage] = useState(5);

    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchtem] = useState('');
   
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/WareHouse/GetShowroom/${sessionData.idWarehouse}`);
                setShowroom(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        if (sessionData && sessionData.idWarehouse) {
            fetchData();
        }

    }, [sessionData])
    const DetailWareHouse = (ShowRoom) => {
        const updatedSessionData = { ...sessionData, IDCarShowroom: ShowRoom.id, NameShowroom: ShowRoom.name };
        Cookies.set("UserSession", JSON.stringify(updatedSessionData), { expires: 0.5, secure: true, sameSite: 'strict' })

        navigate(`/WareHouse/DetailCreateCarShowRoom/${ShowRoom.id}`, { state: updatedSessionData });
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