import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select"
import LayoutAdmin from "../Layout/Layout";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from "react-router-dom";
function InOrder() {
    const [car, setCar] = useState([]);
    const [SelectCars, setSelectCars] = useState([])
    const [carTaxes, setcarTaxes] = useState({})
    const [WareHouse, setWareHouse] = useState([]);
    const[SelectWareHouse,setSelectWareHouse]=useState(null)
    const [SelectSupply,setSelectSupply]=useState(null);
    const [Supply, setSupply] = useState([]);
    const [SelectCash,setSelectCash]=useState(null)
    const options = [
        { value: 0, label: "cash payment" },
        { value: 1, label: "transfer payments" }
    ]
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.ID || '';
    const username = location.state?.fullName || '';
    const email = location.state?.email || '';
    const idShowroom = location.state?.idShowroom || '';
    const handleSelectCash=(SelectCash)=>{
        setSelectCash(SelectCash)
    }
    const handleSelectSupply=(SelectSupply)=>{
        setSelectSupply(SelectSupply)
    }
    const handleSelectWareHouse=(SelectWareHouse)=>{
        setSelectWareHouse(SelectWareHouse)
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/InOrder/ShowSupply");
                setSupply(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/InOrder/ShowWareHouse");
                setWareHouse(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get("http://localhost:5278/api/InOrder/ShowCar");
            setCar(response.data)
        }
        fetchdata();
    }, [])
    const handleCarChange = (SelectedOptions) => {
        setSelectCars(SelectedOptions);
        const newCarTaxes = { ...carTaxes };
        SelectedOptions.forEach(option => {
            if (!newCarTaxes[option.value]) {
                newCarTaxes[option.value] = { id: option.value, name: option.label, tax: '', price: option.price,delivery:null }
            }
        })
        setcarTaxes(newCarTaxes)
    }
    const handleTaxChange = (carId, TaxValue) => {
        setcarTaxes({
            ...carTaxes,
            [carId]: {
                ...carTaxes[carId],
                tax: TaxValue
            }
        })
    }
    const handleDeliveryChange=(carId,deliveryDate)=>{
        setcarTaxes(prevCarTaxes=>({
            ...prevCarTaxes,
            [carId]:{
                ...carTaxes[carId],
                delivery:deliveryDate
            }
        }))
    }
    const SubmitCar = async (event) => {
        event.preventDefault();
        let totalAmount=0;
        let totalTax=0;
        Object.keys(carTaxes).forEach((carId)=>{
            const price=Number(carTaxes[carId].price||0) ;
            const tax=Number(carTaxes[carId].tax || 0);
            totalAmount+=price;
            totalTax+=tax;
        })
   
        const formData = new FormData();
       
        formData.append("IdWarehouse",SelectWareHouse?.value)
        formData.append("IdEmployee",ID)
        formData.append("IdSuplier",SelectSupply?.value)
        formData.append("TotalAmount",totalAmount);
        formData.append("TotalTax",totalTax);
        formData.append("Payment",SelectCash?.value)
        Object.keys(carTaxes).forEach((carId,index) => {
            const offsetInMilliseconds = 7 * 60 * 60 * 1000; // Vietnam's timezone offset from UTC in milliseconds (7 hours ahead)
            const vietnamStartDate = new Date(carTaxes[carId].delivery.getTime() + offsetInMilliseconds);
        formData.append(`DetailInOrders[${index}].idCar`,carTaxes[carId].id)
        formData.append(`DetailInOrders[${index}].deliveryDate`,vietnamStartDate.toISOString().split('T')[0])
        formData.append(`DetailInOrders[${index}].price`,carTaxes[carId].price)
        formData.append(`DetailInOrders[${index}].tax`,carTaxes[carId].tax)

       })
       const response=await fetch("http://localhost:5278/api/InOrder/AddInorder",{
        method:'POST',
        body: formData
       })
       if (response.ok) {
        Swal.fire({
            icon: 'success',
            title: 'Add Lecture Success',
            showConfirmButton: false,
            timer: 1500,
        });
       }
    }
    return (
        <>
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card" style={{ height: 'auto' }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Customer</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={SubmitCar}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Supply</label>
                                                <Select options={Supply.map(type => ({ value: type.id, label: type.name }))}
                                                    value={SelectSupply}
                                                    onChange={(SelectedOption)=>handleSelectSupply(SelectedOption)}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Ware House</label>
                                                <Select options={WareHouse.map(type => ({ value: type.id, label: type.name }))}
                                                value={SelectWareHouse}
                                                onChange={(SelectedOption)=>handleSelectWareHouse(SelectedOption)}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Car</label>
                                                <Select options={car.map(type => ({ value: type.id, label: type.name, price: type.price }))}
                                                    isMulti
                                                    onChange={handleCarChange}
                                                />
                                            </div>
                                            {SelectCars.map(car => (
                                                <>
                                                  <div key={car.value} className="form-group">
                                                    <label htmlFor={`tax-${car.value}`}>Tax for {car.label}</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id={`tax-${car.value}`}
                                                        value={carTaxes[car.value]?.tax || ''}
                                                        onChange={e => handleTaxChange(car.value, e.target.value)}
                                                    />
                                                </div>
                                                <div key={car.value} className="form-group">
                                                    <label htmlFor={`tax-${car.value}`}>Delivery Date for {car.label}</label>
                                                    <DatePicker
                                                    selected={carTaxes[car.value]?.delivery || null}
                                                    onChange={date => handleDeliveryChange(car.value, date)}
                                                    dateFormat="dd/MM/yyyy"
                                                    className="form-control"
                                                />
                                                </div>
                                                </>
                                              
                                                
                                            ))}
                                             <div class="form-group">
                                                <label for="exampleInputUsername1">Payment</label>
                                                <Select options={options.map(type => ({ value: type.label, label: type.label }))}
                                                    value={SelectCash}
                                                    onChange={(SelectedOption)=>handleSelectCash(SelectedOption)}
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
export default InOrder;