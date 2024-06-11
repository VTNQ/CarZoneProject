import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Img from "../../Admin/assets/images/dashboard/people.svg";
import LayoutEmployee from "../Layout/Layout";
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto'; // Import the Chart object from 'chart.js/auto'
import { CategoryScale, LinearScale, BarController, Title } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Cookies from 'js-cookie'
import axios from "axios";
function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [customer, setCustomer] = useState(null);
    const [sessionData, setSessionData] = useState(null);
    const [Order, setOrder] = useState(null)
    Chart.register(ChartDataLabels)
    const [OrderData, setOrderData] = useState([]);
    const [Invoice, setInvoice] = useState(null);
    const [Contact, setContact] = useState(null);
    const [Contract, setContract] = useState(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/Contact/CountContact`)
                setContact(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    const getUserSession = () => {
        const UserSession = Cookies.get("UserSession");
        if (UserSession) {
            return JSON.parse(UserSession);
        }
        return null;
    }
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/GetCountOrder/${sessionData.ID}/${selectedMonth}`)
                setOrderData(response.data.result);
            } catch (error) {
                console.log(error)
            }
        }
        if (sessionData && sessionData.ID) {
            fetchdata();
        }

    }, [selectedMonth, sessionData])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/TotalContract/${sessionData.ID}`)
                setContract(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (sessionData && sessionData.ID) {
            fetchdata();
        }

    }, [sessionData])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/TotalOutOrder/${sessionData.ID}`)
                setOrder(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (sessionData && sessionData.ID) {
            fetchdata()
        }

    }, [sessionData])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Customer/CountCustomer");
                setCustomer(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata();
    }, [])
    useEffect(() => {
        const data = getUserSession();

        if (data && data.role == 'Employee') {
            setSessionData(data);
        } else {
            navigate('/login');
        }
    }, [navigate]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/InVoice/TotalInvoice/${sessionData.idShowroom}`);
                setInvoice(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (sessionData && sessionData.idShowroom) {
            fetchdata();
        }

    }, [sessionData])
    const chartDataProduct = {
        labels: ['Customer', 'Invoice', "Order", "Contact", "Contract"],
        datasets: [{
            data: [customer, Invoice, Order, Contact, Contract],
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
    const generateChartData = () => {
        const daysInMonth = new Date(new Date().getFullYear(), selectedMonth, 0).getDate();
        const chartData = Array.from({ length: daysInMonth }, (_, index) => 0);

        OrderData.forEach((orderCount) => {
            const orderDay = new Date(orderCount.orderDate).getDate();
            chartData[orderDay - 1] = orderCount.orderCount;
        });

        return chartData;
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
    return (
        <>
            <LayoutEmployee>

                <div className="main-panel">
                    <div className="content-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="row">
                                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                                        <h3 className="font-weight-bold">Welcome {sessionData && sessionData.fullName ? sessionData.fullName : ''}</h3>
                                        <h6 className="font-weight-normal mb-0">All systems are running smoothly! You
                                            have <span className="text-primary">3 unread alerts!</span></h6>
                                    </div>
                                    <div className="col-12 col-xl-4">
                                        <div className="justify-content-end d-flex">
                                            <div className="dropdown flex-md-grow-1 flex-xl-grow-0">
                                                <button className="btn btn-sm btn-light bg-white dropdown-toggle"
                                                    type="button" id="dropdownMenuDate2" data-bs-toggle="dropdown"
                                                    aria-haspopup="true" aria-expanded="true">
                                                    <i className="mdi mdi-calendar"></i> Today (10 Jan 2021)
                                                </button>
                                                <div className="dropdown-menu dropdown-menu-right"
                                                    aria-labelledby="dropdownMenuDate2">
                                                    <a className="dropdown-item" href="#">January - March</a>
                                                    <a className="dropdown-item" href="#">March - June</a>
                                                    <a className="dropdown-item" href="#">June - August</a>
                                                    <a className="dropdown-item" href="#">August - November</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6  ">
                                <div className="card tale-bg" style={{ minHeight: 'auto' }}>
                                    <div className="card-people mt-auto">
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
                            </div>
                            <div className="col-md-6  transparent">
                                <div className="row">
                                    <div className="col-md-12 mb-4  transparent">
                                        <div className="card card-tale" style={{ minHeight: 'auto' }}>
                                            <div className="card-body">
                                                <Pie data={chartDataProduct} options={chartOptions1} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                       
                    </div>

                    <footer className="footer">
                        <div className="d-sm-flex justify-content-center justify-content-sm-between">
                            <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2023. Premium <a
                                href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
                            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i
                                className="ti-heart text-danger ms-1"></i></span>
                        </div>
                    </footer>

                </div>

            </LayoutEmployee>
        </>
    )
}

export default Dashboard;