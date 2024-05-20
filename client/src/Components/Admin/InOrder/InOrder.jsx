import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select"
import LayoutAdmin from "../Layout/Layout";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import Pagination from 'react-paginate';
import { useLocation, useNavigate } from "react-router-dom";
function InOrder() {
    const [car, setCar] = useState([]);
    const [SelectCars, setSelectCars] = useState([])
    const [carTaxes, setcarTaxes] = useState({})
    const [WareHouse, setWareHouse] = useState([]);
    const [SelectWareHouse, setSelectWareHouse] = useState(null)
    const [SelectSupply, setSelectSupply] = useState(null);
    const [Supply, setSupply] = useState([]);
    const [SelectCash, setSelectCash] = useState(null)
    const options = [
        { value: 0, label: "cash payment" },
        { value: 1, label: "transfer payments" }
    ]
    const navigate = useNavigate();
    const location = useLocation();
    const ID = location.state?.ID || '';
    const username = location.state?.fullName || '';
    const [InOrder, setInOrder] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowInOrder/${ID}`)
                setInOrder(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const email = location.state?.email || '';
    const idShowroom = location.state?.idShowroom || '';
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const handleSelectCash = (SelectCash) => {
        setSelectCash(SelectCash)
    }
    const handleSelectSupply = (SelectSupply) => {
        setSelectSupply(SelectSupply)
    }
    const handleSelectWareHouse = (SelectWareHouse) => {
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
                    newCarTaxes[option.value] = { id: option.value, name: option.label, tax:option.price*0.2, price: option.price, delivery: null }
                }
            })
            setcarTaxes(newCarTaxes)
        }
  
    const handleDeliveryChange = (carId, deliveryDate) => {
        setcarTaxes(prevCarTaxes => ({
            ...prevCarTaxes,
            [carId]: {
                ...carTaxes[carId],
                delivery: deliveryDate
            }
        }))
    }
    const [searchTerm, setSearchtem] = useState('');
    const filterOrder = InOrder.filter(Wareh =>
        Wareh.wareHouse.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastInOrder = (currentPage + 1) * perPage;
    const indexOfFirtInOrder = indexOflastInOrder - perPage;
    const currentOrder = filterOrder.slice(indexOfFirtInOrder, indexOflastInOrder)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const SubmitCar = async (event) => {
        event.preventDefault();
        let totalAmount = 0;
        let totalTax = 0;
        let hasInvalidInput = false;
        Object.keys(carTaxes).forEach((carId) => {
            if (carTaxes[carId].tax == '' || carTaxes[carId].delivery == null) {
                hasInvalidInput = true;
            }
        });
       
        const IsSelectCars=SelectCars.length<=0?false:true;

        if (hasInvalidInput==true || IsSelectCars==false  || SelectSupply?.value==null || SelectWareHouse?.value==null  || SelectCash?.value==null) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            Object.keys(carTaxes).forEach((carId) => {
                const price = Number(carTaxes[carId].price || 0);
                const tax = Number(carTaxes[carId].tax || 0);
                totalAmount += price;
                totalTax += tax;
            })

            const formData = new FormData();

            formData.append("IdWarehouse", SelectWareHouse?.value)
            formData.append("IdEmployee", ID)
            formData.append("IdSuplier", SelectSupply?.value)
            formData.append("TotalAmount", totalAmount);
            formData.append("TotalTax", totalTax);
            formData.append("Payment", SelectCash?.value)
            Object.keys(carTaxes).forEach((carId, index) => {
                const offsetInMilliseconds = 7 * 60 * 60 * 1000; // Vietnam's timezone offset from UTC in milliseconds (7 hours ahead)
                const vietnamStartDate = new Date(carTaxes[carId].delivery.getTime() + offsetInMilliseconds);
                formData.append(`DetailInOrders[${index}].idCar`, carTaxes[carId].id)
                formData.append(`DetailInOrders[${index}].deliveryDate`, vietnamStartDate.toISOString().split('T')[0])
                formData.append(`DetailInOrders[${index}].price`, carTaxes[carId].price)
                formData.append(`DetailInOrders[${index}].tax`, carTaxes[carId].tax)

            })
            const response = await fetch("http://localhost:5278/api/InOrder/AddInorder", {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Add Lecture Success',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowInOrder/${ID}`)
                setInOrder(response.data)
                setSelectSupply(null)
                setSelectWareHouse(null)
                setSelectCars([]);
                setSelectCash(null)
            }
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
                                        <h4 class="card-title">In Order</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={SubmitCar}>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Supply</label>
                                                <Select options={Supply.map(type => ({ value: type.id, label: type.name }))}
                                                    value={SelectSupply}
                                                    onChange={(SelectedOption) => handleSelectSupply(SelectedOption)}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Ware House</label>
                                                <Select options={WareHouse.map(type => ({ value: type.id, label: type.name }))}
                                                    value={SelectWareHouse}
                                                    onChange={(SelectedOption) => handleSelectWareHouse(SelectedOption)}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputUsername1">Car</label>
                                                <Select options={car.map(type => ({ value: type.id, label: type.name, price: type.price }))}
                                                    isMulti
                                                    value={SelectCars}
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
                                                    onChange={(SelectedOption) => handleSelectCash(SelectedOption)}
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
                                        <h4 class="card-title">In Order</h4>
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
                                                        <th> WareHouse </th>
                                                        <th>Supplier</th>
                                                        <th> Date of Sale </th>
                                                        <th> Total Amount</th>
                                                        <th> Total Tax </th>
                                                        <th>Payment</th>
                                                        <th>Detail</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentOrder.map((inorder, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{inorder.wareHouse}</td>
                                                            <td>{inorder.supplier}</td>
                                                            <td>{new Date(inorder.dateofSale).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{inorder.totalAmount}</td>
                                                            <td>{inorder.toTalTax}</td>
                                                            <td>{inorder.payment}</td>
                                                            <td><button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                onClick={() => navigate(`/DetailInOrder/${inorder.id}`, { state: { ID: ID, fullName: username, email: email, IDInorder: inorder.id } })}
                                                            >Detail
                                                            </button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>


                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(filterOrder.length / perPage)}
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




        </>
    )
}
export default InOrder;