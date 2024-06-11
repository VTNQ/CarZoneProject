import React, { useEffect, useState } from "react";
import Img from '../assets/images/dashboard/people.svg'
import { useLocation, useNavigate } from "react-router-dom";
import LayoutAdmin from "../Layout/Layout";
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import the Chart object from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CategoryScale, LinearScale, BarController, Title } from 'chart.js';
import Cookies from 'js-cookie'
import axios from "axios";
function HomePage(){
    const location=useLocation();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedMonthInorder, setSelectedMonthInorder] = useState(new Date().getMonth() + 1);
  const navigate = useNavigate();
  const [Color,setColor]=useState(null)
  const [Supplier,setSupplier]=useState(null);
  const [customer,setCustomer]=useState(null);
  const[OrderData,setOrderData]=useState([]);
  Chart.register(ChartDataLabels)
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get("http://localhost:5278/api/Supplier/CountSupplier");
        setSupplier(response.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchdata();
  },[])
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get("http://localhost:5278/api/Customer/CountCustomer");
        setCustomer(response.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchdata();
  },[])
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get("http://localhost:5278/api/Color/TotalColor");
        setColor(response.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchdata();

  },[])
 

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
  const [inorder,setinorder]=useState([])
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get(`http://localhost:5278/api/OutOrder/GetCountOrder/${sessionData.ID}/${selectedMonth}`)
        setOrderData(response.data.result);
      }catch(error){
        console.log(error)
      }
    }
    if(sessionData && sessionData.ID){
      fetchdata();
    }
 
  },[selectedMonth,sessionData])
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get(`http://localhost:5278/api/InOrder/GetCountinOrder/${sessionData.ID}/${selectedMonthInorder}`)
        setinorder(response.data.result);
      }catch(error){
        console.log(error)
      }
    }
    if(sessionData && sessionData.ID){
      fetchdata();
    }
 
  },[selectedMonthInorder,sessionData])

  const [TotalInorder,setTotalInorder]=useState(null);
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get(`http://localhost:5278/api/InOrder/TotalInorder/${sessionData.ID}`);
        setTotalInorder(response.data)
      }catch(error){
        console.log(error)
      }
    }
    if(sessionData && sessionData.ID){
      fetchdata();
    }
    

  },[sessionData])
  const generateChartData = () => {
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
    const chartData = Array.from({ length: daysInMonth }, (_, index) => 0);

    OrderData.forEach((orderCount) => {
      const orderDay = new Date(orderCount.orderDate).getDate();
      chartData[orderDay - 1] = orderCount.orderCount;
    });

    return chartData;
  };
  const generateInorderChartData = () => {
    const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
    const chartData = Array.from({ length: daysInMonth }, (_, index) => 0);

    inorder.forEach((orderCount) => {
      const orderDay = new Date(orderCount.orderDate).getDate();
      chartData[orderDay - 1] = orderCount.orderCount;
    });

    return chartData;
  };
  const chartData = {
    labels: Array.from({ length: new Date(new Date().getFullYear(), selectedMonth, 0).getDate() }, (_, index) => index + 1),
    datasets: [
      {
        label: 'Number of Unique Orders',
        data: generateChartData(),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  const chartInorderData = {
    labels: Array.from({ length: new Date(new Date().getFullYear(), selectedMonthInorder, 0).getDate() }, (_, index) => index + 1),
    datasets: [
      {
        label: 'Number of Unique Orders',
        data: generateInorderChartData(),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
  const[Employee,setEmployee]=useState(null)
  const [OutOrder,setOutOrder]=useState(null);
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get(`http://localhost:5278/api/OutOrder/TotalOutOrder/${sessionData.ID}`);
        setOutOrder(response.data)
      }catch(error){
        console.log(error)
      }
    }
    if(sessionData && sessionData.ID){
      fetchdata();
    }
    

  },[sessionData])
  const [Car,setCar]=useState(null);
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get(`http://localhost:5278/api/Car/TotalCar/${sessionData.idShowroom}`);
        setCar(response.data)
      }catch(error){
        console.log(error)
      }
    }
    if(sessionData && sessionData.idShowroom){
      fetchdata();
    }
    

  },[sessionData])
  useEffect(()=>{
    const fetchdata=async()=>{
      try{
        const response=await axios.get(`http://localhost:5278/api/Employee/TotalEmployee/${sessionData.role}`);
        setEmployee(response.data)
      }catch(error){
        console.log(error)
      }
    }
    if(sessionData && sessionData.role){
      fetchdata();
    }
    

  },[sessionData])
  const chartDataProduct = {
    labels: ['Color','Supplier','Customer','Employee','InOrder','OutOrder','Car'],
    datasets: [{
      data: [Color,Supplier,customer,Employee,TotalInorder,OutOrder,Car],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(199, 199, 199, 0.6)',
        // Add more colors if you have more categories
      ],
    }],
  };
  
  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Specify the scale type as 'category' for the x-axis
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  const chartOptions1 = {
    plugins: {
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value, context) => {
          return value;
        },
      },
    },
  };
  const style={
    minHeight:'auto'
  }
return(
    <>
   <LayoutAdmin>
   
   <div class="main-panel">
          <div class="content-wrapper">
            <div class="row">
              <div class="col-md-12 grid-margin">
                <div class="row">
                  <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                    <h3 class="font-weight-bold">Welcome {sessionData && sessionData.fullName ? sessionData.fullName : ''}</h3>
                    <h6 class="font-weight-normal mb-0">All systems are running smoothly! You have <span class="text-primary">3 unread alerts!</span></h6>
                  </div>
                  <div class="col-12 col-xl-4">
                    <div class="justify-content-end d-flex">
                      <div class="dropdown flex-md-grow-1 flex-xl-grow-0">
                        <button class="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          <i class="mdi mdi-calendar"></i> Today (10 Jan 2021) </button>
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate2">
                          <a class="dropdown-item" href="#">January - March</a>
                          <a class="dropdown-item" href="#">March - June</a>
                          <a class="dropdown-item" href="#">June - August</a>
                          <a class="dropdown-item" href="#">August - November</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row col-auto">
              <div class="col-md-6">
                <div class=" tale-bg">
                  <label htmlFor="">Outorder statistics</label>
                <Bar data={chartData} options={chartOptions} />
                  <label>Select Month:</label>
                  <select id="selectMonth"
                    className="form-select" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                    {[...Array(12).keys()].map((month) => (
                      <option key={month + 1} value={month + 1}>
                        {month + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div class="col-md-6 transparent">
                <div class="row">
                  <div class="col-md-12 mb-4 transparent">
                    <div class="card card-tale" style={style}>
                      <div class="card-body">
                      <Pie data={chartDataProduct} options={chartOptions1}/>
                      </div>
                    </div>
                  </div>
                 
                </div>
             
              </div>
            </div>
            <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">Inorder statistics</p>
                  <p class="font-weight-500">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc</p>
                  <div class="d-flex flex-wrap pt-10">
                    
                  <Bar data={chartInorderData} options={chartOptions} />
                  <label>Select Month:</label>
                  <select id="selectMonth"
                    className="form-select" value={selectedMonthInorder} onChange={(e) => setSelectedMonthInorder(e.target.value)}>
                    {[...Array(12).keys()].map((month) => (
                      <option key={month + 1} value={month + 1}>
                        {month + 1}
                      </option>
                    ))}
                  </select>
                  <canvas id="order-chart"></canvas>
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
export default HomePage;