import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import axios from "axios";
import Select from "react-select"
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
function AddOrder() {
    const [Customer, setCustomer] = useState([]);
    const [carArray, setcarArray] = useState({})
    const [SelectCustomer, SetSelectCustomer] = useState(null)
    const [Car, setCar] = useState([]);
    const [SelectCars, SetSelectCars] = useState([])
    const [SelectPayment, SetSelectPayment] = useState(null);
    const [SelectDeliveryType, setSelectDeliveryType] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState(null);
    const getUserSession=()=>{
        const UserSession=Cookies.get("UserSession");
        if(UserSession){
            return JSON.parse(UserSession);
        }
        return null;
    }
    const [loading, setloading] = useState(false);
    useEffect(() => {
        const data = getUserSession();
        
        if (data && data.role=='Employee') {
            setSessionData(data);
        } else{
          navigate('/login');
        }
    }, [navigate]);
    const handleSelectDeliveryType = (SelectDeliveryType) => {
        setSelectDeliveryType(SelectDeliveryType)
    }
    const handleSelectPayment = (SelectPayment) => {
        SetSelectPayment(SelectPayment)
    }
    const handleSelectCustomer = (SelectCustomer) => {
        SetSelectCustomer(SelectCustomer)
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowCar/${sessionData.idShowroom}`);
                setCar(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.idShowroom){
            fetchdata();
        }

    }, [sessionData])
    const handleSubmit = async (event) => {
        event.preventDefault();
        let totalAmount = 0;
        let totalTax = 0;
        const formData = new FormData();
        let hasInvalidInput = false;
        Object.keys(carArray).forEach((carId) => {
            if (carArray[carId].tax == '' || carArray[carId].delivery == null) {
                hasInvalidInput = true;
            }
        });
       
        const IsSelectCars = SelectCars.length <= 0 ? false : true;
        console.log(SelectCustomer?.value)
        if (hasInvalidInput == true || IsSelectCars == false || SelectCustomer?.value == null || SelectPayment?.value == null || SelectDeliveryType?.value == null) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                formData.append("IdCustomer", SelectCustomer?.value);
                formData.append("IdShowroom", sessionData.idShowroom);
                formData.append("IdEmployee", sessionData.ID);
                Object.keys(carArray).forEach((carId) => {
                    const price = Number(carArray[carId].price || 0);
                    const tax = Number(carArray[carId].tax || 0);
                    totalAmount += price;
                    totalTax += tax;
                })
                formData.append("TotalAmount", totalAmount);
                formData.append("TotalTax", totalTax);
                formData.append("Payment", SelectPayment?.value);
                formData.append("DeliveryType", SelectDeliveryType?.value)
                Object.keys(carArray).forEach((carId, index) => {
                    const offsetInMilliseconds = 7 * 60 * 60 * 1000; // Vietnam's timezone offset from UTC in milliseconds (7 hours ahead)
                    const vietnamStartDate = new Date(carArray[carId].delivery.getTime() + offsetInMilliseconds);
                    formData.append(`DetailOutOrders[${index}].idCar`, carArray[carId].id)
                    formData.append(`DetailOutOrders[${index}].deliveryDate`, vietnamStartDate.toISOString().split('T')[0])
                    formData.append(`DetailOutOrders[${index}].price`, carArray[carId].price)
                    formData.append(`DetailOutOrders[${index}].tax`, carArray[carId].tax)
                })
                const response = await fetch("http://localhost:5278/api/OutOrder/AddOutOrder", {
                    method: 'POST',
                    body: formData
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Order Success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    SetSelectCustomer(null)
                    SetSelectCars([]);
                    SetSelectPayment(null);
                    setSelectDeliveryType(null)
                    setcarArray({})
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    const [TotalPrice,setTotalPrice]=useState(0);
    const handleCarChange = (SelectCar) => {
        SetSelectCars(SelectCar)
        const newCarTaxes = { ...carArray };
        SelectCar.forEach(option => {
            if (!newCarTaxes[option.value]) {
                newCarTaxes[option.value] = { id: option.value, name: option.label, tax: option.price * 0.2, price: option.price, delivery: null }
            }
        })
        setcarArray(newCarTaxes)
        const newTotalPrice=Object.values(newCarTaxes).reduce((acc,car)=>acc+car.price+car.tax,0);
    
        setTotalPrice(newTotalPrice);
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/OutOrder/ShowCustomer");
                setCustomer(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const Payment = [
        { value: 0, label: "cash payment" },
        { value: 1, label: "transfer payments" }
    ]
    const Options = [
        { value: 0, label: 'Fast delivery' },
        { value: 1, label: 'Economical delivery' }
    ]
    const handleDeliveryChange = (carId, deliveryDate) => {
        setcarArray(prevCarTaxes => ({
            ...prevCarTaxes,
            [carId]: {
                ...carArray[carId],
                delivery: deliveryDate
            }
        }))
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
                                        <h4 class="card-title">Order</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={handleSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Customer</label>
                                                <Select options={Customer.map(customer => ({ value: customer.id, label: customer.fullName }))} 
                                                 value={SelectCustomer}
                                                 onChange={(SelectedOption) => handleSelectCustomer(SelectedOption)}
                                                />

                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Car</label>
                                                <Select options={Car.map(car => ({ value: car.id, label: car.name, price: car.price }))}
                                                value={SelectCars}
                                                    isMulti
                                                    onChange={handleCarChange}
                                                />

                                            </div>
                                            {SelectCars.map(car => (
                                                <>
                                                    <div key={car.value} className="form-group">
                                                        <label htmlFor={`'price-${car.value}`}>Price
                                                            for {car.label}</label>
                                                        <input type="number"
                                                               className="form-control"
                                                               id={`price-${car.value}`}
                                                               value={carArray[car.value]?.price || ''}
                                                        />
                                                    </div>
                                                    <div key={car.value} className="form-group">
                                                        <label htmlFor={`tax-${car.value}`}>Tax for {car.label}</label>
                                                        <input type="number"
                                                               className="form-control"
                                                               id={`tax-${car.value}`}
                                                               value={carArray[car.value]?.tax || ''}
                                                        />
                                                    </div>
                                                    <div key={car.value} className="form-group">
                                                        <label htmlFor={`totalPrice-${car.value}`}>Total Price for {car.label}</label>
                                                        <input type="number"
                                                               className="form-control total-price"
                                                               id={`totalPrice-${car.value}`}
                                                               value={carArray[car.value]?.tax+carArray[car.value]?.price || ''}
                                                        />
                                                    </div>
                                                    <div key={car.value} className="form-group">
                                                        <label htmlFor={`tax-${car.value}`}>Delivery Date
                                                            for {car.label}</label>
                                                        <DatePicker
                                                            selected={carArray[car.value]?.delivery || null}
                                                            onChange={date => handleDeliveryChange(car.value, date)}
                                                            dateFormat="dd/MM/yyyy"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </>
                                            ))}
                                            <div class="form-group">
                                                <label for="">Total Price</label>
                                                <input type="number"  className="form-control" value={TotalPrice} disabled/>
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Payment</label>
                                                <Select
                                                    options={Payment.map(car => ({value: car.label, label: car.label}))}
                                                    value={SelectPayment}
                                                    onChange={(SelectedOption) => handleSelectPayment(SelectedOption)}/>

                                            </div>
                                            <div class="form-group">
                                            <label for="exampleInputUsername1">Delivery Type</label>
                                                <Select options={Options.map(Car => ({ value: Car.label, label: Car.label }))}
                                                    value={SelectDeliveryType}
                                                    onChange={(SelectedOption) => handleSelectDeliveryType(SelectedOption)}
                                                />

                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Total Price</label>
                                                <input type="text" value={TotalPrice} />
                                            </div>


                                            <button type="submit" class="btn btn-primary me-2">Submit</button>

                                        </form>
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
export default AddOrder;