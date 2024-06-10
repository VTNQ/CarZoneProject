import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import Select from "react-select"
import axios from "axios";
import Swal from "sweetalert2";
import Pagination from 'react-paginate';
import DatePicker from 'react-datepicker';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
function OutOrder() {
    const [Customer, setCustomer] = useState([]);
    const [Car, setCar] = useState([]);
    const [SelectCars, setSelectCars] = useState([])
    const [carTaxes, setcarTaxes] = useState({})
    const [loading, setloading] = useState(true)
    const [SelectCustomer, SetSelectCustomer] = useState(null)
    const [SelectDeliveryType, setSelectDeliveryType] = useState(null);
    const [SelectPayment, SetSelectPayment] = useState(null);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    
    
    const [FromData, setFromData] = useState({
        id: '',
        Condition: ''
    })
    const handleContract = (id) => {
        const showout = ShowOutOrder.find(show => show.id == id)
        if (showout) {
            FromData.id = showout.id;
        }
        setPopupVisibility(true)
    }
    const handleSelectCustomer = (SelectCustomer) => {
        SetSelectCustomer(SelectCustomer)
    }
    const handleSelectPayment = (SelectPayment) => {
        SetSelectPayment(SelectPayment)
    }
    const handleSelectDeliveryType = (SelectDeliveryType) => {
        setSelectDeliveryType(SelectDeliveryType)
    }
    const Options = [
        { value: 0, label: 'Fast delivery' },
        { value: 1, label: 'Economical delivery' }
    ]
    const Payment = [
        { value: 0, label: "cash payment" },
        { value: 1, label: "transfer payments" }
    ]
    const navigate = useNavigate();
    const location = useLocation();

    const [searchTerm, setSearchtem] = useState('');

    const [ShowOutOrder, SetShowOutOrder] = useState([]);
    const [sessionData, setSessionData] = useState(null);
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession);
        }
        return null;
    }

    const [TotalPrice,setTotalPrice]=useState(0);
    const[totalTax,settotalTax]=useState(0);
    useEffect(() => {
        const data = getUserSession();

        if (data && data.role == 'Admin') {
            setSessionData(data);
        } else {
            navigate('/login');
        }
    }, [navigate]);
   
   
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowOutOrder/${sessionData.ID}`)
                SetShowOutOrder(response.data.result)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        if (sessionData && sessionData.ID) {
            fetchdata();
        }

    }, [sessionData])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/OutOrder/ShowCustomer")
                setCustomer(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const handleCarChange = (SelectOptions) => {
        setSelectCars(SelectOptions)
        const newCarTaxes = { ...carTaxes };
        SelectOptions.forEach(option => {
            if (!newCarTaxes[option.value]) {
                newCarTaxes[option.value] = { id: option.value, name: option.label, tax: option.price * 0.2, price: option.price, delivery: null }
            }
        })
        setcarTaxes(newCarTaxes)
        updateTotalPrice(newCarTaxes)
   
    }
    const updateTotalPrice = (carTaxes) => {
        let totalTax = 0;
        let totalPrice = 0;

        Object.keys(carTaxes).forEach((carId) => {
            const car = carTaxes[carId];
            const price = Number(car.price || 0);
            const tax = Number(car.tax || 0);

            
            totalPrice += price ;
            totalTax += tax ;
        });

        settotalTax(totalTax);
        setTotalPrice(totalPrice);
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowCar/${sessionData.idShowroom}`)
                setCar(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.idShowroom){
            fetchdata();
        }
     
    }, [sessionData])
    const handleDeliveryChange = (carId, deliveryDate) => {
        setcarTaxes(prevCarTaxes => ({
            ...prevCarTaxes,
            [carId]: {
                ...carTaxes[carId],
                delivery: deliveryDate
            }
        }))
    }
    const popupContentStyle = {
        background: 'white',
        padding: '20px',
        maxWidth: '400px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        animation: 'flipleft 0.5s',
        zindex: '1000000' // Default animation
    };
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const getTomorrow = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    };
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setFromData({
                id: '',
                Condition: ''
            })


            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        let totalAmount = 0;
        let totalTax = 0;
        const formData = new FormData();
        let hasInvalidInput = false;


        Object.keys(carTaxes).forEach((carId) => {
            if (carTaxes[carId].tax == '' || carTaxes[carId].delivery == null) {
                hasInvalidInput = true;
            }
        });
        const IsSelectCars = SelectCars.length <= 0 ? false : true;

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
                formData.append("IdCustomer", SelectCustomer?.value)
                formData.append("IdShowroom", sessionData.idShowroom);
                formData.append("IdEmployee", sessionData.ID);
                Object.keys(carTaxes).forEach((carId) => {
                    const price = Number(carTaxes[carId].price || 0);
                    const tax = Number(carTaxes[carId].tax || 0);
                    totalAmount += price;
                    totalTax += tax;
                })
                formData.append("TotalAmount", totalAmount);
                formData.append("TotalTax", totalTax);
                formData.append("Payment", SelectPayment?.value);
                formData.append("DeliveryType", SelectDeliveryType?.value)
                Object.keys(carTaxes).forEach((carId, index) => {
                    const offsetInMilliseconds = 7 * 60 * 60 * 1000; // Vietnam's timezone offset from UTC in milliseconds (7 hours ahead)
                    const vietnamStartDate = new Date(carTaxes[carId].delivery.getTime() + offsetInMilliseconds);
                    formData.append(`DetailOutOrders[${index}].idCar`, carTaxes[carId].id)
                    formData.append(`DetailOutOrders[${index}].deliveryDate`, vietnamStartDate.toISOString().split('T')[0])
                    formData.append(`DetailOutOrders[${index}].price`, carTaxes[carId].price)
                    formData.append(`DetailOutOrders[${index}].tax`, carTaxes[carId].tax)
                })
                const response = await fetch("http://localhost:5278/api/OutOrder/AddOutOrder", {
                    method: 'POST',
                    body: formData
                })
                if (response.ok) {
                    setloading(false)
                    const responsedata = await axios.get(`http://localhost:5278/api/OutOrder/ShowCar/${sessionData.idShowroom}`)
                    setCar(responsedata.data.result)
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Order Success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setSelectCars([]);
                    const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowOutOrder/${sessionData.ID}`)
                    SetShowOutOrder(response.data.result)
                    
                    SetSelectCustomer(null)
                  
                    SetSelectPayment(null);
                    setcarTaxes({})
                    setSelectDeliveryType(null)
                    settotalTax(0);
                    setTotalPrice(0)
                    console.log(SelectCars)
                    console.log(carTaxes)

                }
            } catch (error) {
                console.log(error)
            }
        }



    }
    const FilterOutOrder = ShowOutOrder.filter(ShowOut =>
        ShowOut.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const IndexOflastOutOrder = (currentPage + 1) * perPage;
    const IndexOfFirtOutOrder = IndexOflastOutOrder - perPage;
    const CurrentOutOrder = FilterOutOrder.slice(IndexOfFirtOutOrder, IndexOflastOutOrder)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const AddContract1 = async (event) => {
        event.preventDefault();
        if (FromData.Condition == '') {
            Swal.fire({
                icon: 'error',
                title: 'Condition is Required',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            try {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/OutOrder/AddContract/${FromData.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: FromData.Condition })
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Add Contract Success',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setFromData({
                        id: '',
                        Condition: ''
                    })
                    setPopupVisibility(false)
                } else {
                    setloading(false)
                    const responseBody = await response.json();
                    if (responseBody.message) {
                        Swal.fire({
                            icon: 'error',
                            title: responseBody.message || 'Failed to add genre',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

    }
    const handleDetailClick = (outorder) => {

        const updatedSessionData = { ...sessionData, IDOutOrder: outorder.id };
        Cookies.set('UserSession', JSON.stringify(updatedSessionData), { expires: 0.5, secure: true, sameSite: 'strict' });
        navigate(`/DetailOutOrder/${outorder.id}`, { state: updatedSessionData })
    }
    return (
        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card" style={{ height: 'auto' }}>
                                    <div class="card-body">

                                        <h4 class="card-title">Out Order</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={handleSubmit}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Cutomer</label>
                                                <Select options={Customer.map(customer => ({ value: customer.id, label: customer.fullName }))}
                                                    value={SelectCustomer}
                                                    onChange={(SelectedOption) => handleSelectCustomer(SelectedOption)}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Car</label>
                                                <Select options={Car.map(Car => ({ value: Car.id, label: Car.name, price: Car.price }))}
                                                    isMulti
                                                    value={SelectCars}
                                                    onChange={handleCarChange}
                                                />
                                            </div>
                                            { SelectCars.map(car => (
                                                <>
                                                <div key={car.value} className="form-group">
                                                        <label htmlFor={`tax-${car.value}`}>Price for {car.label}</label>
                                                        <input type="number"
                                                            className="form-control"
                                                            id={`tax-${car.value}`}
                                                            value={carTaxes[car.value]?.price || ''}

                                                        />
                                                    </div>
                                                    <div key={car.value} className="form-group">
                                                        <label htmlFor={`tax-${car.value}`}>Tax for <b className="underline">{car.label}</b></label>
                                                        <input type="number"
                                                            className="form-control"
                                                            id={`tax-${car.value}`}
                                                            value={carTaxes[car.value]?.tax || ''}

                                                        />
                                                    </div>
                                                    <div key={car.value} className="form-group">
                                                        <label htmlFor={`tax-${car.value}`}>Delivery Date for <b className="underline">{car.label}</b></label>
                                                        <DatePicker
                                                            selected={carTaxes[car.value]?.delivery || null}
                                                            onChange={date => handleDeliveryChange(car.value, date)}
                                                            dateFormat="dd/MM/yyyy"
                                                            minDate={getTomorrow()}
                                                            className="form-control"
                                                        />
                                                    </div>
                                                </>
                                            ))}
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Payment</label>
                                                <Select options={Payment.map(Car => ({ value: Car.label, label: Car.label }))}
                                                    value={SelectPayment}
                                                    onChange={(SelectedOption) => handleSelectPayment(SelectedOption)}
                                                />
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
                                            <div className="form-group">
                                                <label htmlFor="">Total Tax</label>
                                                <input type="text" value={totalTax} />
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
                                        <h4 class="card-title">Out Order</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter Full Name" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Customer </th>

                                                        <th> Date of Sale </th>
                                                        <th> Total Amount</th>
                                                        <th> Total Tax </th>
                                                        <th>Payment</th>
                                                        <th>Delivery type</th>
                                                        <th>Detail</th>

                                                        <th>Add Contract</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {CurrentOutOrder.map((show, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{show.customer}</td>
                                                            <td>{new Date(show.dateofSale).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{show.totalAmount}</td>
                                                            <td>{show.totalTax}</td>
                                                            <td>{show.payment}</td>
                                                            <td>{show.deliveryType}</td>
                                                            <td><button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                onClick={() => handleDetailClick(show)}
                                                            >Detail
                                                            </button></td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded" onClick={() => handleContract(show.id)}>Add Contract</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterOutOrder.length / perPage)}
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

                    <footer class="footer">
                        <div class="d-sm-flex justify-content-center justify-content-sm-between">
                            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023. Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="ti-heart text-danger ms-1"></i></span>
                        </div>
                    </footer>

                </div>


            </LayoutAdmin>

            {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div style={{ marginTop: '16px' }}>

                            <h3 className="box-title1">Add Contract</h3>
                        </div>
                        <form role="form" onSubmit={AddContract1}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Condition</label>
                                    <input type="text" class="form-control" value={FromData.Condition} onChange={(e) => setFromData({ ...FromData, Condition: e.target.value })} id="exampleInputUsername1" placeholder="Condition" />
                                </div>




                            </div>

                            <div className="box-footer">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded ">Add</button>
                            </div>
                        </form>


                    </div>
                </div>
            )}


        </>
    )
}
export default OutOrder;