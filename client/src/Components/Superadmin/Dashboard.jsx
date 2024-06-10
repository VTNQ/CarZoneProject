import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2';
import 'chart.js/auto';
import LinearProgress from '@mui/material/LinearProgress'

export const Dashboard = () => {
  const [showroom,setShowroom] = useState([]);
  const [order,setOrder] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Monthly Revenue',
      data: [],
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1
    }]
  });
  const [chartData1, setChartData1] = useState({
    labels: [],
    datasets: [{
      label: 'Monthly Revenue',
      data: [],
      backgroundColor: 'rgba(200,200,200,0.2)',
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1
    }]
  });
  
  const fetchDataShowroom = async () => {
    const response = await axios.get('http://localhost:5278/api/Showroom/showShowroom');
    setShowroom(response.data);
    console.log(response.data);
  }
  useEffect(()=>{
    fetchDataShowroom();
  },[])
  
  const [orderAvenue,setOrderAvanue] = useState([]);
  const [CustomerByPrecious,setCustomerByPrecious] = useState([]);
  const [NewOrder,setNewOrder] = useState([]);
  const [totalCar,setTotalCar] = useState(null);
  const [EachCar,setEachCar] = useState([]);
  const [EachShowroom,setEachShowroom] = useState([]);
  const [TopCar,setTopCar] = useState([]);
  const [AvenueCountry,setAvenueCountry] = useState([]);
  const [HighestAvenueCountry,setHighestAvenueCountry] = useState(null);
  useEffect(()=>{
    const fetchDataAvenue = async () =>{
      const response = await axios.get('http://localhost:5278/api/Statistic/getAvenueByPrecious');
      setOrderAvanue(response.data);
      console.log(response.data);
    };
    const fetchDataCustomer = async () =>{
      const response = await axios.get('http://localhost:5278/api/Statistic/getNewCustomerByPrecious');
      setCustomerByPrecious(response.data);
      console.log(response.data);
    };
    const fetchDataNewOrder = async () =>{
      const response = await axios.get('http://localhost:5278/api/Statistic/getNewOrderByPrecious');
      setNewOrder(response.data);
      console.log(response.data);
    };
    const fetchTotalCar = async () =>{
      const response = await axios.get('http://localhost:5278/api/Statistic/getTotalCar');
      setTotalCar(response.data.totalCar);
      console.log(response.data);
    };
    fetchDataAvenue();
    fetchDataCustomer();
    fetchDataNewOrder();
    fetchTotalCar();
  },[])
  const getCurrentDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };


  useEffect(() => {
    const fetchDataChart = async () => {
      try {
        const response = await axios.get('http://localhost:5278/api/Statistic/getAvenueByMonth');
        const months = response.data.map(item => `Month ${item.month}`);
        const amounts = response.data.map(item => item.totalAmount);
  
        setChartData({
          labels: months,
          datasets: [{
            label: 'Monthly Revenue',
            data: amounts,
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.1
          }]
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
  
    fetchDataChart();
  }, []);
  useEffect(() => {
    const fetchDataChartCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:5278/api/Statistic/getCustomerByMonth');
        const formattedData = response.data.map(item => ({
          label: `${item.month}/${item.year}`, 
          newCustomers: item.newCustomers, 
        }));
  
        setChartData1({
          labels: formattedData.map(item => item.label), 
          datasets: [{
            label: 'Monthly New Customers', 
            data: formattedData.map(item => item.newCustomers), 
            fill: true,
            backgroundColor: 'rgba(255, 192, 203, 0.2)',
    borderColor: 'rgba(255, 192, 203, 1)',
            tension: 0.1
          }]
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    const fetchDataEachCar = async () => {
      const response = await axios.get('http://localhost:5278/api/Statistic/getDataEachCar');
      setEachCar(response.data);
    }
    const fetchDataAvenueShowroom = async () => {
      const response = await axios.get('http://localhost:5278/api/Statistic/getAvenueEachShowroom');
      setEachShowroom(response.data);
    }
    const fetchDataTopCar = async () => {
      const response = await axios.get('http://localhost:5278/api/Statistic/getTopCar');
      setTopCar(response.data);
    }
    const fetchDataAvenueCountry = async () => {
      const response = await axios.get('http://localhost:5278/api/Statistic/getAvenueByCountry');
      setAvenueCountry(response.data);

    }
    const fetchDataAvenueHighestCountry = async () => {
      const response = await axios.get('http://localhost:5278/api/Statistic/getHighestAvenueCountry');
      setHighestAvenueCountry(response.data);

    }
  
    fetchDataChartCustomer();
    fetchDataEachCar();
    fetchDataAvenueShowroom();
    fetchDataTopCar();
    fetchDataAvenueCountry();
    fetchDataAvenueHighestCountry();
  }, []); 
  const data = {
    labels: AvenueCountry.map(item => item.countryName),
    datasets: [{
      data: AvenueCountry.map(item => item.totalAvenue),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  };
  
  
  return (
    <>
        <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-md-12 grid-margin">
              <div class="row">
                <div class="col-12 col-xl-8 mb-4 mb-xl-0">
                  <h3 class="font-weight-bold">Welcome Superadmin</h3>
                  <h6 class="font-weight-normal mb-0">All systems are running smoothly! You have <span class="text-primary">3 unread alerts!</span></h6>
                </div>
                <div class="col-12 col-xl-4">
                 <div class="justify-content-end d-flex">
                  <div class="dropdown flex-md-grow-1 flex-xl-grow-0">
                    <button class="btn btn-sm btn-light bg-white dropdown-toggle" type="button" id="dropdownMenuDate2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <i className="mdi mdi-calendar"></i> Today ({getCurrentDate()})
                    </button>
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
          <div class="row">
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <div className='flex justify-between'>
                    <div>
                        <h4 class="card-title">Showroom Table</h4>
                    <p class="card-description">
                        Hi Superadmin ! how ya doing ?
                    </p>
                    </div>
                    <td><button className="btn btn-dark btn-icon-text"  >Detail<i class="ti-file btn-icon-append"></i></button></td>

                  </div>
                  <div class="table-responsive max-h-[200px]">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          
                          <th>id</th>
                          <th>Name</th>
                          <th>Showroom</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                      {showroom.map((Emp, index) => (
                        <tr>
                          
                          <td>{index++}</td>
                          <td>{Emp.name}</td>
                          
                          <td>{Emp.nameDistrict}</td>

                        </tr>
                        
                        ))}
                      </tbody>
                    </table>
                    
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 grid-margin transparent">
              <div class="row">
                <div class="col-md-6 mb-4 stretch-card transparent">
                  <div class="card card-tale">

                    
                      <div class="card-body">
                      {orderAvenue.length > 0 && (
                        <>
                          <p className="mb-4">All Order Of Q{orderAvenue[0].quarter}</p>
                          <p className="fs-30 mb-2">{orderAvenue[0].totalAmount?.toFixed(2)}$</p>
                          <p>{orderAvenue[0].year}</p>
                        </>
                      )}
                      </div>
                    
                  </div>
                </div>
                <div class="col-md-6 mb-4 stretch-card transparent">
                  <div class="card card-dark-blue">
                    <div class="card-body">
                    {CustomerByPrecious.length > 0 && (
                        <>
                          <p className="mb-4">New Customer Of Q{CustomerByPrecious[0].quarter}</p>
                          <p className="fs-30 mb-2">{CustomerByPrecious[0].newCustomers} Customers</p>
                          <p>{CustomerByPrecious[0].year}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-4 mb-lg-0 stretch-card transparent">
                  <div class="card card-light-blue">
                    <div class="card-body">
                    {NewOrder.length > 0 && (
                        <>
                          <p className="mb-4">Total Amount for Q{NewOrder[0].quarter}</p>
                          <p className="fs-30 mb-2">{NewOrder[0].totalOrder?.toFixed(2)} / orders</p>
                          <p>{NewOrder[0].year}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div class="col-md-6 stretch-card transparent">
                  <div class="card card-light-danger">
                    <div class="card-body">
                    {totalCar !== null && (
                        <>
                          <p className="mb-4">Total Cars Product</p>
                          <p className="fs-30 mb-2">{totalCar} Car</p>
                        </>
                        
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title">Avenue By Month</p>
                  <p class="font-weight-500">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc</p>
                  <div class="d-flex flex-wrap pt-10">
                    
                  <Line data={chartData} />
                  </div>
                  <canvas id="order-chart"></canvas>
                </div>
              </div>
            </div>
            <div class="col-md-6 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                 <div class="d-flex justify-content-between">
                  <p class="card-title">Detail Customer By Month</p>
                  <a href="#" class="text-info">View all</a>
                 </div>
                  <p class="font-weight-500">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc</p>
                  <div class="d-flex flex-wrap pt-10">
                    
                  <Line data={chartData1} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 grid-margin stretch-card">
              <div class="card position-relative">
                <div class="card-body">
                  <div id="detailedReports" class="carousel slide detailed-report-carousel position-static pt-2" data-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <div class="row">
                          <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                             

                            <div class="ml-xl-4 mt-16">
                                {HighestAvenueCountry && (
                            <>
                            <p class="card-title">Detailed Reports</p>
                            <h1 class="text-primary">${HighestAvenueCountry.totalAvenue}</h1>
                              <h3 class="font-weight-500 mb-xl-4 text-primary">{HighestAvenueCountry.countryName}</h3>
                              <p class="mb-2 mb-xl-0">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc</p>
                              
                            </>
                      )}
                            </div>  

                            </div>
                          <div class="col-md-12 col-xl-9">
                            <div class="row">
                              <div class="col-md-6 border-right">
                                <div class="table-responsive mb-3 mb-md-0 mt-3">
                                  <table class="table table-borderless report-table">
                                    
                                    
                                    {AvenueCountry.map((av,index)=>(
                                    <tr key={index}>
                                    <td class="text-muted">{av.countryName}</td>
                                    {/* <td class="w-100 px-0">
                                      <div class="progress progress-md mx-4">
                                        <div class="progress-bar bg-primary" role="progressbar" style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                      </div>
                                    </td> */}
                                     
                                      <td><p class="mb-0"><span class="font-weight-bold mr-2">{av.totalAvenue}</span>({av.percentage}%)</p></td>
                                  </tr>
                                  ) )}
                                  </table>
                                </div>
                              </div>
                              <div class="col-md-6 mt-3">
                              <PolarArea data={data} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <div class="row">
                          <div class="col-md-12 col-xl-3 d-flex flex-column justify-content-start">
                            <div class="ml-xl-4 mt-3">
                            <p class="card-title">Detailed Reports</p>
                              <h1 class="text-primary">$34040</h1>
                              <h3 class="font-weight-500 mb-xl-4 text-primary">North America</h3>
                              <p class="mb-2 mb-xl-0">The total number of sessions within the date range. It is the period time a user is actively engaged with your website, page or app, etc</p>
                            </div>  
                            </div>
                          <div class="col-md-12 col-xl-9">
                            <div class="row">
                              <div class="col-md-6 border-right">
                                <div class="table-responsive mb-3 mb-md-0 mt-3">
                                  <table class="table table-borderless report-table">
                                    <tr>
                                      <td class="text-muted">Illinois</td>
                                      <td class="w-100 px-0">
                                        <div class="progress progress-md mx-4">
                                          <div class="progress-bar bg-primary" role="progressbar"  style={{width: '70%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </td>
                                      <td><h5 class="font-weight-bold mb-0">713</h5></td>
                                    </tr>
                                    <tr>
                                      <td class="text-muted">Washington</td>
                                      <td class="w-100 px-0">
                                        <div class="progress progress-md mx-4">
                                          <div class="progress-bar bg-warning" role="progressbar"  style={{width: '30%'}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </td>
                                      <td><h5 class="font-weight-bold mb-0">583</h5></td>
                                    </tr>
                                    <tr>
                                      <td class="text-muted">Mississippi</td>
                                      <td class="w-100 px-0">
                                        <div class="progress progress-md mx-4">
                                          <div class="progress-bar bg-danger" role="progressbar"  style={{width: '95%'}} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </td>
                                      <td><h5 class="font-weight-bold mb-0">924</h5></td>
                                    </tr>
                                    <tr>
                                      <td class="text-muted">California</td>
                                      <td class="w-100 px-0">
                                        <div class="progress progress-md mx-4">
                                          <div class="progress-bar bg-info" role="progressbar"  style={{width: '60%'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </td>
                                      <td><h5 class="font-weight-bold mb-0">664</h5></td>
                                    </tr>
                                    <tr>
                                      <td class="text-muted">Maryland</td>
                                      <td class="w-100 px-0">
                                        <div class="progress progress-md mx-4">
                                          <div class="progress-bar bg-primary" role="progressbar"  style={{width: '40%'}} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </td>
                                      <td><h5 class="font-weight-bold mb-0">560</h5></td>
                                    </tr>
                                    <tr>
                                      <td class="text-muted">Alaska</td>
                                      <td class="w-100 px-0">
                                        <div class="progress progress-md mx-4">
                                          <div class="progress-bar bg-danger" role="progressbar"  style={{width: '75%'}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                      </td>
                                      <td><h5 class="font-weight-bold mb-0">793</h5></td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                              <div class="col-md-6 mt-3">
                                <canvas id="south-america-chart"></canvas>
                                <div id="south-america-legend"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-7 grid-margin stretch-card">
              <div class="card">
                <div class="card-body">
                  <p class="card-title mb-0">Top Products</p>
                  <div class="table-responsive">
                    <table class="table table-striped table-borderless">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Brand</th>
                          <th>Total Sold</th>
                        </tr>  
                      </thead>
                      <tbody>
                        {TopCar.map((car,index)=>(
                        <tr key={index}>
                       <td>{car.nameCar}</td>
                          <td class="font-weight-bold">${car.price}</td>
                          <td>{car.brand}</td>
                          <td class="font-weight-medium">{car.totalCar}</td>
                        
                      </tr>
                       ) )}
                       
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-5 grid-margin stretch-card">
							<div class="card">
								<div class="card-body">
									<h4 class="card-title">To Do Lists</h4>
									<div class="list-wrapper pt-2">
										<ul class="d-flex flex-column-reverse todo-list todo-list-custom">
											<li>
												<div class="form-check form-check-flat">
													<label class="form-check-label">
														<input class="checkbox" type="checkbox"/>
														Meeting with Urban Team
													</label>
												</div>
												<i class="remove ti-close"></i>
											</li>
											<li class="completed">
												<div class="form-check form-check-flat">
													<label class="form-check-label">
														<input class="checkbox" type="checkbox" checked/>
														Duplicate a project for new customer
													</label>
												</div>
												<i class="remove ti-close"></i>
											</li>
											<li>
												<div class="form-check form-check-flat">
													<label class="form-check-label">
														<input class="checkbox" type="checkbox"/>
														Project meeting with CEO
													</label>
												</div>
												<i class="remove ti-close"></i>
											</li>
											<li class="completed">
												<div class="form-check form-check-flat">
													<label class="form-check-label">
														<input class="checkbox" type="checkbox" checked/>
														Follow up of team zilla
													</label>
												</div>
												<i class="remove ti-close"></i>
											</li>
											<li>
												<div class="form-check form-check-flat">
													<label class="form-check-label">
														<input class="checkbox" type="checkbox"/>
														Level up for Antony
													</label>
												</div>
												<i class="remove ti-close"></i>
											</li>
										</ul>
                  </div>
                  <div class="add-items d-flex mb-0 mt-2">
										<input type="text" class="form-control todo-list-input"  placeholder="Add new task"/>
										<button class="add btn btn-icon text-primary todo-list-add-btn bg-transparent"><i class="icon-circle-plus"></i></button>
									</div>
								</div>
							</div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card">
                <div class="card-body">
                  <p class="card-title mb-0">Total Brand</p>
                  <div class="table-responsive">
                    <table class="table table-borderless mt-6">
                      <thead>
                        <tr>
                          <th class="pl-0  pb-2 border-bottom">NameBrand</th>
                          <th class="border-bottom pb-2">car</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                       {EachCar.map((brand,index)=>(
                        <tr key={index}>
                        <td class="pl-0">{brand.brandName}</td>
                        <td><p class="mb-0"><span class="font-weight-bold mr-2">{brand.carCount}</span>({brand.percentage.toFixed(2)}%)</p></td>
                        
                      </tr>
                       ) )}
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 stretch-card grid-margin">
              <div class="row">
                <div class="col-md-12 grid-margin stretch-card">
                  <div class="card">
                    <div class="card-body">
                      <p class="card-title">Charts</p>
                      <div class="charts-data">
                        <div class="mt-3">
                          <p class="mb-0">Data 1</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="progress progress-md flex-grow-1 mr-4">
                              <div class="progress-bar bg-inf0" role="progressbar"  style={{width: '95%'}} aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mb-0">5k</p>
                          </div>
                        </div>
                        <div class="mt-3">
                          <p class="mb-0">Data 2</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="progress progress-md flex-grow-1 mr-4">
                              <div class="progress-bar bg-info" role="progressbar"  style={{width: '35%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mb-0">1k</p>
                          </div>
                        </div>
                        <div class="mt-3">
                          <p class="mb-0">Data 3</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="progress progress-md flex-grow-1 mr-4">
                              <div class="progress-bar bg-info" role="progressbar"  style={{width: '48%'}} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mb-0">992</p>
                          </div>
                        </div>
                        <div class="mt-3">
                          <p class="mb-0">Data 4</p>
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="progress progress-md flex-grow-1 mr-4">
                              <div class="progress-bar bg-info" role="progressbar"  style={{width: '25%'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <p class="mb-0">687</p>
                          </div>
                        </div>
                      </div>  
                    </div>
                  </div>
                </div>
                <div class="col-md-12 stretch-card grid-margin grid-margin-md-0">
                  <div class="card data-icon-card-primary">
                    <div class="card-body">
                      <p class="card-title text-white">Number of Meetings</p>                      
                      <div class="row">
                        <div class="col-8 text-white">
                          <h3>34040</h3>
                          <p class="text-white font-weight-500 mb-0">The total number of sessions within the date range.It is calculated as the sum . </p>
                        </div>
                        <div class="col-4 background-icon">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4 stretch-card grid-margin">
              <div class="card">
              <div class="card-body">
                  <p class="card-title mb-0">Avenue Each Showroom</p>
                  <div class="table-responsive">
                    <table class="table table-borderless mt-6">
                      <thead>
                        <tr>
                          <th class="pl-0  pb-2 border-bottom">Name Showroom</th>
                          <th class="border-bottom pb-2">Avenue</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                       {EachShowroom.map((sr,index)=>(
                        <tr key={index}>
                        <td class="pl-0">{sr.nameShowroom}</td>
                        <td><p class="mb-0">${sr.avenueShowroom}</p></td>
                        
                      </tr>
                       ) )}
                        
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
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Copyright © 2021.  Premium <a href="https://www.bootstrapdash.com/" target="_blank">Bootstrap admin template</a> from BootstrapDash. All rights reserved.</span>
            <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i class="ti-heart text-danger ml-1"></i></span>
          </div>
          <div class="d-sm-flex justify-content-center justify-content-sm-between">
            <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">Distributed by <a href="https://www.themewagon.com/" target="_blank">Themewagon</a></span> 
          </div>
        </footer> 
        
      </div>
    </>
  )
}
