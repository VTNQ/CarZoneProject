import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import Select from "react-select"
import axios from "axios";
function RequestSupplier(){
    const [Supplier,setSupplier]=useState([]);
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get("http://localhost:5278/api/Request/ShowSupplier");
                setSupplier(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchdata();
    },[])
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
                                <form class="forms-sample" >

                                
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

                                <h4 class="card-title">Request WareHouse</h4>
                                <form class="forms-sample" >
                                    <label for="exampleInputUsername1">Search</label>
                                    <input type="text" class="form-control" id="exampleInputUsername1"  placeholder="Enter Name Or Email" />
                                </form>
                                <p class="card-description">
                                </p>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th> # </th>
                                                <th> To </th>


                                                <th> Create Day</th>
                                                <th>Description</th>



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
export default RequestSupplier;