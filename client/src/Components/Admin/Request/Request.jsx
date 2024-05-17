import React, { useEffect, useState } from "react";
import Select from "react-select"
import Swal from 'sweetalert2';
import LayoutAdmin from "../Layout/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
function Request(){
    const [WareHouse,setWareHouse]=useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state?.fullName || '';
    const email = location.state?.email || '';
    const idShowroom = location.state?.idShowroom || '';
    const ID = location.state?.ID || '';
    const[SelectWareHouse,setSelectWareHouse]=useState(null)
    const handleSelectWareHouse=(SelectWareHouse)=>{
        setSelectWareHouse(SelectWareHouse);
    }
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get("http://localhost:5278/api/Request/ShowWareHouse");
                setWareHouse(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchdata();
    },[])
    const handleSubmit=async(event)=>{
        event.preventDefault();
        try{
            const response=await fetch("http://localhost:5278/api/Request/AddRequest",{
                method:'Post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({to:username,from:SelectWareHouse?.value})
            })
            if(response.ok){
                Swal.fire({
                    icon: 'success',
                    title: 'Add success',
                    showConfirmButton: false,
                    timer: 1500,
                })
                setSelectWareHouse(null)
            }
        }catch(error){
            console.log(error)
        }
    }
return(
    <>
    <LayoutAdmin>
        <div class="main-panel">
            <div class="content-wrapper">
            <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card" style={{ height: 'auto' }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Request WareHouse</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={handleSubmit}>
                                           
                                        <div class="form-group" >
                                                <label for="exampleInputUsername1">Ware House</label>
                                               <Select options={WareHouse.map(ware=>({value:ware.name,label:ware.name}))}
                                               value={SelectWareHouse}
                                               onChange={(SelectedOption) => handleSelectWareHouse(SelectedOption)}
                                               />
                                            </div>

                                            <button type="submit" class="btn btn-primary me-2">Submit</button>

                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                <div className="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                      
                                <h4 class="card-title">Contact</h4>
                                <form class="forms-sample" >
                                    <label for="exampleInputUsername1">Search</label>
                                    <input type="text" class="form-control" id="exampleInputUsername1"   placeholder="Enter Name Or Email" />
                                </form>
                                <p class="card-description">
                                </p>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th> # </th>
                                                <th> Name Customer </th>

                                                <th> Email Customer </th>
                                                <th> Description</th>
                                             


                                            </tr>
                                        </thead>
                                        <tbody>
                                    
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


    </LayoutAdmin>




</>
)
}
export default Request;