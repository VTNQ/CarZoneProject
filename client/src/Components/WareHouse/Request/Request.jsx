import React, { useEffect, useState } from "react";
import LayoutAdmin from "../Layout/Layout";
import axios from "axios";
import Swal from 'sweetalert2';
import Pagination from 'react-paginate';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
function Request(){
    const[WareHouse,setWareHouse]=useState([]);
    const navigate = useNavigate();
    const [sessionData, setSessionData] = useState(null);
  const getUserSession=()=>{
    const UserSession=Cookies.get("UserSession");
    if(UserSession){
        return JSON.parse(UserSession);
    }
    return null;
}

useEffect(() => {
    const data = getUserSession();
    
    if (data && data.role=='WareHouse') {
        setSessionData(data);
    } else {
        // If no session data, redirect to login
        navigate('/login');
    }
}, [navigate]);
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get("http://localhost:5278/api/Request/ShowRequestWareHouse");
                setWareHouse(response.data.result)
            }catch(error){
                console.log(error)
            }
        }
        fetchdata();
    },[])
   const UpdateStatus=async(ID)=>{
    try{
        const response=await fetch(`http://localhost:5278/api/Request/UpdateRequest/${ID}`,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(response.ok){
            Swal.fire({
                icon: 'success',
                title: 'Update Status Success',
                showConfirmButton: false,
                timer: 1500,
            })
            const response=await axios.get("http://localhost:5278/api/Request/ShowRequestWareHouse");
            setWareHouse(response.data.result)
        }
    }catch(error){
        console.log(error)
    }
   }
    const [IsDescriptionChange, setIsDescriptionChange] = useState(false)
    const [FromData, setFromData] = useState({
        Description: '',
        ShowDescription: ''
    })
    const [searchTerm, setSearchtem] = useState('');
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const filterRequest=WareHouse.filter(Re=>
        Re.to.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastRequest=(currentPage + 1) * perPage;
    const indexOfFirtRequest= indexOflastRequest - perPage;
    const currentRequest=filterRequest.slice(indexOfFirtRequest, indexOflastRequest);
    const [isPopupVisible, setPopupVisibility] = useState(false);
    const handleShowDescription = (ID) => {
        const RequestFilter = WareHouse.find(re => re.id == ID)

        if (RequestFilter) {
            FromData.ShowDescription = RequestFilter.decription;
        }

        setPopupVisibility(true)
    }
    const DescriptionType = {
        animation: 'flipleft 0.5s',
        zindex: '1000000'
    }
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const handleClosepopup = () => {
        setIsDescriptionChange(true);
        setTimeout(() => {

            setFromData({
                ShowDescription: ''
            })

            setPopupVisibility(false)
            setIsDescriptionChange(false)
        }, 500);
    }
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
return(
    <>
    <LayoutAdmin>
        <div class="main-panel">
            <div class="content-wrapper">
 
                <div className="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">

                                <h4 class="card-title">Request WareHouse</h4>
                                <form class="forms-sample" >
                                    <label for="exampleInputUsername1">Search</label>
                                    <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)}  placeholder="Enter Name Or Email" />
                                </form>
                                <p class="card-description">
                                </p>
                                <div class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                            <th> # </th>
                                                        <th> To </th>


                                                        <th> Create Day</th>
                                                        <th>Description</th>
                                                        <th>Approve</th>
                                                       

                                            </tr>
                                            
                                        </thead>
                                        <tbody>
                                        {currentRequest.map((request, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{request.to}</td>

                                                            <td>{new Date(request.creadate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                                            <td>  <button
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleShowDescription(request.id)}

                                                            >Description
                                                            </button></td>
                                                            <td>  <button disabled={request.status==true}
                                                            style={{opacity:request.status==true ? 0.5:1,
                                                                cursor:request.status==true? 'not-allowed':'pointer'
                                                            }}
                                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>UpdateStatus(request.id)}

                                                            >Approve
                                                            </button></td>
                                                            
                                                        </tr>
                                                    ))}
                                        </tbody>
                                    </table>
                                    <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(filterRequest.length / perPage)}
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

<div className="preview-modal"      >


    <div className="preview-content1" style={IsDescriptionChange ? { ...DescriptionType, ...closingAnimation } : DescriptionType}>
        <div className='flex justify-end'>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right " onClick={handleClosepopup}><i className="fas fa-times"></i></button>
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center' }}>

            <h3 className="box-title1">Description</h3>
        </div>
        <p dangerouslySetInnerHTML={{ __html: FromData.ShowDescription }} />

    </div>
</div>
)}


</>
)
}
export default Request;