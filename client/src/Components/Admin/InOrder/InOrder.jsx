import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select"
import LayoutAdmin from "../Layout/Layout";
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import Pagination from 'react-paginate';
import Cookies from 'js-cookie'
import { useLocation, useNavigate } from "react-router-dom";
function InOrder() {
    const [car, setCar] = useState([]);
    const [SelectCars, setSelectCars] = useState([])
    const [carTaxes, setcarTaxes] = useState({})
    const [loading, setloading] = useState(true)


    const [SelectSupply, setSelectSupply] = useState(null);
    const [Supply, setSupply] = useState([]);
   
    const [IDWareHouse, setIDWareHouse] = useState([]);
    const options = [
        { value: 0, label: "cash payment" },
        { value: 1, label: "transfer payments" }
    ]
    const navigate = useNavigate();
    const location = useLocation();

    const [InOrder, setInOrder] = useState([]);

    const [sessionData, setSessionData] = useState(null);
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession);
        }
        return null;
    }

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
                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowInOrder/${sessionData.ID}`)
                setInOrder(response.data.result)
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
                const response = await axios.get(`http://localhost:5278/api/OutOrder/GetWareHouse/${sessionData.idShowroom}`)
                setIDWareHouse(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (sessionData && sessionData.idShowroom) {
            fetchdata();
        }

    }, [sessionData])
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);

    const handleSelectSupply = (SelectSupply) => {
        setSelectSupply(SelectSupply)
    }

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/InOrder/ShowSupply");
                setSupply(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])

    useEffect(() => {
        const fetchdata = async () => {
            const response = await axios.get(`http://localhost:5278/api/InOrder/ShowCar/${sessionData.idShowroom}`);
            setCar(response.data.result)
        }
        if (sessionData && sessionData.idShowroom) {
            fetchdata();
        }

    }, [sessionData])
    const[totalTax,settotalTax]=useState(0);
    const[totalprice,settotalprice]=useState(0);
    const handleCarChange = (SelectedOptions) => {
        setSelectCars(SelectedOptions);
        const newCarTaxes = { ...carTaxes };
        SelectedOptions.forEach(option => {
            if (!newCarTaxes[option.value]) {
                newCarTaxes[option.value] = { id: option.value, name: option.label, tax: option.price * 0.2, price: option.price, delivery: null, Quantity: 1 }
            }
        })
        setcarTaxes(newCarTaxes)
        updateTotalPrice(newCarTaxes);
    }
        const updateTotalPrice = (carTaxes) => {
        
            let totalTax = 0;
            let totalPriceorder=0;
        
            Object.keys(carTaxes).forEach(key => {
                const car = carTaxes[key];
    
                totalTax += car.tax * car.Quantity;
                totalPriceorder+=car.price*car.Quantity;
            });
        
    settotalTax(totalTax)
    settotalprice(totalPriceorder)
        };
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
            if (carTaxes[carId].tax == '' || carTaxes[carId].delivery == null || carTaxes[carId].Quantity<1) {
                hasInvalidInput = true;
            }
        });

        const IsSelectCars = SelectCars.length <= 0 ? false : true;
     
        if (hasInvalidInput == true || IsSelectCars == false  ) {
            Swal.fire({
                icon: 'error',
                title: 'Please enter complete information',
                showConfirmButton: false,
                timer: 1500,
            })
        } else {
            setloading(true)
            Object.keys(carTaxes).forEach((carId) => {
                const price = Number(carTaxes[carId].price || 0);
                const tax = Number(carTaxes[carId].tax || 0);
                const quantity = Number(carTaxes[carId].Quantity || 0);
                totalAmount += price*quantity;
                totalTax += tax*quantity;
                
            })

            const formData = new FormData();

            formData.append("IdWarehouse", IDWareHouse.id)
            formData.append("IdEmployee", sessionData.ID)
        
            formData.append("TotalAmount", totalAmount);
            formData.append("TotalTax", totalTax);
            formData.append("IdShowroom",sessionData.idShowroom)
     
            Object.keys(carTaxes).forEach((carId, index) => {
                const offsetInMilliseconds = 7 * 60 * 60 * 1000; // Vietnam's timezone offset from UTC in milliseconds (7 hours ahead)
                const vietnamStartDate = new Date(carTaxes[carId].delivery.getTime() + offsetInMilliseconds);
                formData.append(`DetailInOrders[${index}].idCar`, carTaxes[carId].id)
                formData.append(`DetailInOrders[${index}].deliveryDate`, vietnamStartDate.toISOString().split('T')[0])
                formData.append(`DetailInOrders[${index}].price`, carTaxes[carId].price)
                formData.append(`DetailInOrders[${index}].tax`, carTaxes[carId].tax)
                formData.append(`DetailInOrders[${index}].quantity`,carTaxes[carId].Quantity)

            })
            const response = await fetch("http://localhost:5278/api/InOrder/AddInorder", {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Add Lecture Success',
                    showConfirmButton: false,
                    timer: 1500,
                });

                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowInOrder/${sessionData.ID}`)
                setInOrder(response.data.result)
                const responsedata = await axios.get(`http://localhost:5278/api/InOrder/ShowCar/${sessionData.idShowroom}`);
            setCar(responsedata.data.result)
                setSelectSupply(null)
                settotalTax(0)
                setSelectCars([]);
                settotalprice(0)
              
            }
        }

    }
    const handleDetailClick = (inorder) => {
        const updatedSessionData = { ...sessionData, IDInorder: inorder.id };
        Cookies.set('UserSession', JSON.stringify(updatedSessionData), { expires: 0.5, secure: true, sameSite: 'strict' });
        navigate(`/DetailInOrder/${inorder.id}`, { state: updatedSessionData })
    }
    const handleQuantityChange = (carId, newQuantity) => {

        setcarTaxes(prevCarTaxes => {
            const updatedCarTaxes = {
                ...prevCarTaxes,
                [carId]: {
                    ...prevCarTaxes[carId],
                    Quantity: newQuantity // Use consistent naming for quantity
                }
            };

            updateTotalPrice(updatedCarTaxes);
            return updatedCarTaxes;
        });
    };
    const approveOrder=async(ID,IDWareHouse)=>{
        try{
            setloading(true)
            const response=await fetch(`http://localhost:5278/api/InOrder/ApproveOrder/${ID}/${sessionData.idShowroom}/${IDWareHouse}`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Approve successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowInOrder/${sessionData.ID}`)
                setInOrder(response.data.result)
            }
        }catch(error){
            console.log(error)
        }
    }
    const getTomorrow = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
    };
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
                                        <h4 class="card-title">In Order</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={SubmitCar}>
                                          

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
                                                            minDate={getTomorrow()}
                                                        />
                                                    </div>
                                                    <div key={car.value} className="form-group">
                                                        <label htmlFor={`tax-${car.value}`}>Quantity for {car.label}</label>
                                                        <input
                                                            key={car.value}
                                                            type="number"
                                                            className="form-control"
                                                            id={`tax-${car.value}`}
                                                            value={carTaxes[car.value]?.Quantity || ''}
                                                            min={1}
                                                            onChange={(e) => handleQuantityChange(car.value, e.target.value)}
                                                        />
                                                    </div>
                                                </>


                                            ))}
                                         
                                            <div className="form-group">
                                                <label htmlFor="">Total Tax Order</label>
                                                <input type="text" value={totalTax} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Total Price Order</label>
                                                <input type="text" value={totalprice} />
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
                                                       
                                                        <th>Supplier</th>
                                                        <th> Date of Sale </th>
                                                        <th> Total Amount</th>
                                                        <th> Total Tax </th>
                                                      
                                                        <th>Status</th>
                                                        <th>Order confirmation</th>
                                                        <th>Detail</th>
                                                    

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentOrder.map((inorder, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                           
                                                            <td>{inorder.supplier}</td>
                                                            <td>{new Date(inorder.dateofSale).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>{inorder.totalAmount}</td>
                                                            <td>{inorder.toTalTax}</td>
                         
                                                            <td>{inorder.status==true ?"received":"not received"}</td>
                                                            <td><button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                disabled={inorder.status==true} style={{
                                                                    opacity: inorder.status==true ? 0.5 : 1,
                                                                    cursor: inorder.status==true ? 'not-allowed' : 'pointer'
                                                                }}
                                                             onClick={()=>approveOrder(inorder.id,inorder.idWareHouse)}
                                                            >Approve
                                                            </button></td>
                                                            <td><button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                                                onClick={() => handleDetailClick(inorder)}
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