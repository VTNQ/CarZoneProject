import { useLocation, useNavigate } from "react-router-dom";
import Pagination from 'react-paginate';
import Select from "react-select"
import Swal from "sweetalert2";
import { LayoutSuperadmin } from "../LayoutSuperadmin";
import DatePicker from 'react-datepicker';

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';

export const InOrder=() =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [SelectCars, setSelectCars] = useState([])
    const [carTaxes, setcarTaxes] = useState({})
    const [loading,setloading]=useState(false);
    const options = [
        { value: 0, label: "cash payment" },
        { value: 1, label: "transfer payments" }
    ]
   
    const [sessionData, setSessionData] = useState(null);

    const handleSelectCash = (SelectCash) => {
        setSelectCash(SelectCash)
    }
  const getUserSession=()=>{
    const UserSession=Cookies.get("UserSession");
    if(UserSession){
        return JSON.parse(UserSession);
    }
    return null;
}
const[totalTax,settotalTax]=useState(0);
const[totalprice,settotalprice]=useState(0);
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
        const response = await axios.get(`http://localhost:5278/api/InOrder/ShowCarWareHouse/${sessionData.idWarehouse}`);
        setCar(response.data.result)
    }
    if (sessionData && sessionData.idWarehouse) {
        fetchdata();
    }

}, [sessionData])
const getTomorrow = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
};
useEffect(() => {
    const data = getUserSession();
    
    if (data && data.role=='Superadmin') {
        setSessionData(data);
    } else {
        // If no session data, redirect to login
        navigate('/login');
    }
}, [navigate]);
    const [Inorder, setInOrder] = useState([]);
    const [car, setCar] = useState([]);
    const [Supply, setSupply] = useState([]);
    const [SelectSupply, setSelectSupply] = useState(null);
    const [SelectCash, setSelectCash] = useState(null)
    const [IDWareHouse, setIDWareHouse] = useState([]);
    const [searchTerm, setSearchtem] = useState('');
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const handleSelectSupply = (SelectSupply) => {
        setSelectSupply(SelectSupply)
    }
    const filterOrder=Inorder.filter(inorder=>
        inorder.employee.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastOrder=(currentPage + 1) * perPage;
    const IndexofFirstOrder=indexOflastOrder - perPage;
    const CurrentOrder=filterOrder.slice(IndexofFirstOrder,indexOflastOrder)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowOrderWareHouse/${sessionData.idWarehouse}`)
                setInOrder(response.data.result)
            } catch (error) {
                console.log(error)
            }finally{
                setloading(false)
            }
        }
        if(sessionData && sessionData.idWarehouse){
            fetchdata();
        }
       
    }, [sessionData])
    const DetailInorder=(InOrder)=>{
        const updatedSessionData={...sessionData,IDInorder:InOrder.id};
        Cookies.set('UserSession', JSON.stringify(updatedSessionData), { expires: 0.5, secure: true, sameSite: 'strict' });
        navigate(`/WareHouse/DetaiInOrder/${InOrder.id}`,{state:updatedSessionData});
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

        if (hasInvalidInput == true || IsSelectCars == false || SelectSupply?.value == null || SelectCash?.value == null) {
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

            formData.append("IdWarehouse", sessionData.idWarehouse)
            formData.append("IdEmployee", sessionData.ID)
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

                const response = await axios.get(`http://localhost:5278/api/InOrder/ShowOrderWareHouse/${sessionData.idWarehouse}`)
                setInOrder(response.data.result)
                const responsedata = await axios.get(`http://localhost:5278/api/InOrder/ShowCarWareHouse/${sessionData.idWarehouse}`);
                setCar(responsedata.data.result)
                setSelectSupply(null)
                settotalTax(0)
                settotalprice(0)
                setSelectCars([]);
                setSelectCash(null)
            }
        }

    }
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
     const handleDeliveryChange = (carId, deliveryDate) => {
        setcarTaxes(prevCarTaxes => ({
            ...prevCarTaxes,
            [carId]: {
                ...carTaxes[carId],
                delivery: deliveryDate
            }
        }))
    }
    return (
        <>
       
        {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
          <div class="main-panel">
                <div class="content-wrapper">
                    <div class="row">
                        <div class="col-md-6 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Create Countries</h4>
                                    <p class="card-description">
                                        you need to create city and district before create new countries
                                    </p>
                                   
                                </div>
                            </div>
                        </div>

                       
                    </div>
                </div>
              


            </div>


        


        </>
    )
}
export default InOrder;