import { useLocation, useNavigate } from "react-router-dom";
import LayoutAdmin from "../Layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

function ShowContract() {
    const navigate = useNavigate();
    const location = useLocation();
   
    const [Contract, setContract] = useState([])
    const index=1;
    const[sessionData,setSessionData]=useState(null);
    useEffect(() => {
      const data = sessionStorage.getItem('sessionData');
      if (data) {
          setSessionData(JSON.parse(data));
      }
  }, []);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`http://localhost:5278/api/OutOrder/ShowContract/${sessionData.idOrder}`)
                setContract(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        if(sessionData && sessionData.idOrder){
            fetchdata();
        }
      
    }, [sessionData])
    const handleBackClick=()=>{
        const{idOrder,...restSessionData } = sessionData;
        sessionStorage.setItem('sessionData',JSON.stringify(restSessionData));
        navigate("/Employee/HistoryOrder",{state:restSessionData});
    }
    return (
        <>
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">

                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Contract</h4>
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded "
                                        onClick={handleBackClick}
                                        >Back
                                        </button>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th>Condition</th>
                                                        <th>create Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{index}</td>
                                                        <td>{Contract.condition}</td>
                                                        <td>{new Date(Contract.createDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                    </tr>
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
export default ShowContract;