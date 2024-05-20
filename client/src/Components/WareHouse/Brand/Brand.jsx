import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import Select from "react-select"
import LayoutAdmin from "../Layout/Layout";
function Brand() {
    const [Country, setCountry] = useState([]);
    const [SelectCountry, setSelectCountry] = useState(null);
    const HandleSelectCountry = (event) => {
        setSelectCountry(event.target.value);
    }
    const [FromData, setFromData] = useState({
        Name: '',
        Logo: null,
        HeadQuartes: '',
    })
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFromData({
                ...FromData,
                Logo: file,
            });
        }
    }
    const AddSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append("Name", FromData.Name);
            formData.append("Logo", FromData.Logo);
            formData.append("headquarters", FromData.HeadQuartes);
            formData.append("idCountry", SelectCountry)
            const response = await fetch("http://localhost:5278/api/Brand/AddBrand", {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Add Brand Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                setFromData({
                    Name: '',
                    Logo: null,
                    HeadQuartes: '',
                })
                setSelectCountry(null)
                document.getElementById('Logo').value = '';
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Brand/GetCountry");
                setCountry(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    return (
        <>
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card" style={{ height: 'auto' }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Brand</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={AddSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Country</label>
                                                <select className="form-select" aria-label="Default select example" value={SelectCountry} onChange={HandleSelectCountry}>
                                                    {Country.map((country, index) => (
                                                        <option value={country.id} >{country.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Name</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={FromData.Name} onChange={(e) => setFromData({ ...FromData, Name: e.target.value })} placeholder="Enter Name" />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Logo</label>
                                                <input type="file" class="form-control" id="Logo" placeholder="Enter Head Quarters" onChange={(e) => handleImageChange(e)} />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Head Quarters</label>
                                                <input type="text" class="form-control" id="exampleInputUsername1" value={FromData.HeadQuartes} onChange={(e) => setFromData({ ...FromData, HeadQuartes: e.target.value })} placeholder="Enter Head Quarters" />
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
                                        <h4 class="card-title">Employee</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Enter Full Name" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Full Name </th>
                                                        <th>Dob</th>
                                                        <th> Email </th>
                                                        <th> Address </th>
                                                        <th> Identity Code </th>
                                                        <th>Sign</th>
                                                        <th>Edit</th>

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
export default Brand;