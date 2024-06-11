import React, {useEffect, useState} from 'react';
import LayoutEmployee from '../Layout/Layout';
import Pagination from "react-paginate";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from 'js-cookie'
function HistoryInVoice() {
    const [perPage] = useState(5);
    const [InVoice, setInVoice] = useState([]);
    const [Order,setOrder]=useState([]);
    const [Employee,setEmployee]=useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();
    const [ActiveTab,setActiveTab]=useState(0);
    const [loading, setloading] = useState(true);

    const navigate = useNavigate();
    const[sessionData,setSessionData]=useState(null);
    const getUserSession=()=>{
        const UserSession=Cookies.get("UserSession");
        if(UserSession){
            return JSON.parse(UserSession);
        }
        return null;
    }
    
    useEffect(() => {
        const data = getUserSession();
   
        if (data && data.role=='Employee') {
            setSessionData(data);
        } else{
          navigate('/login');
        }
    }, [navigate]);
    const [FromData,setFromData]=useState({
        id:''
    })
  
    useEffect(() => {
        const fetchdataInVoice = async () => {
           try{
            const response = await axios.get(`http://localhost:5278/api/InVoice/ShowInvoice/${sessionData.idShowroom}`);
            setInVoice(response.data)
           }catch(error){
            console.log(error)
           }finally{
            setloading(false)
           }
        };
        if(sessionData && sessionData.idShowroom){
            fetchdataInVoice();
        }
        
    }, [sessionData])
  const [DetailOrder,setDetailOrder]=useState([])
  useEffect(()=>{
    const fetchdata=async()=>{
        try{
            const response=await axios.get(`http://localhost:5278/api/InVoice/DetailOutOrder`);
            setDetailOrder(response.data)
        }catch(error){

        }
    }
    fetchdata();
  },[])
  
  const filterDetailOrder = DetailOrder.filter(Detail =>
    Detail.idOrder==FromData.id
);


    const indexOflastInVoice = (currentPage + 1) * perPage;
    const indexOfFirtInVoice = indexOflastInVoice - perPage;
    const[isPopupVisible,setPopupVisibility]=useState(false)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
 
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
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
    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setFromData({
                id: '',
                UpdateName: ''
            })
       

            setPopupVisibility(false)
            setIsClosingPopup(false)
        }, 500);
    }
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    
   
    const handleViewClick=(ID)=>{
        setFromData({
            id:ID
        })
        setPopupVisibility(true)
        
    }
    const handleTabChange = (index) => {
        setActiveTab(index);
    };
    return(
        <>
         {loading &&(
         <div
         className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{zIndex:'10000'}}>
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
     </div>

       )}
         <LayoutEmployee>
            <div className="main-panel">
                <div className="content-wrapper">
                    <div className="row">
                        <div class="col-lg-12 grid-margin stretch-card">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">History InVoice</h4>
                                    <p class="card-description">
                                    </p>
                                    <div class="table-responsive">
                                        <table class="table table-striped">
                                            <thead>
                                            <tr>
                                                <th> # </th>
                                                <th> ID Order</th>
                                                <th>Create Day</th>
                                                <th>Detail</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {InVoice.map((iv, index) => (
                                                <tr>
                                                    <td>{++index}</td>
                                                    <td>{iv.idorder}</td>
                                                    <td>{iv.createDate}</td>
                                                    <td>
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>handleViewClick(iv.idorder)} >View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                        <Pagination
                                            previousLabel={'previous'}
                                            nextLabel={'next'}
                                            breakLabel={'...'}
                                            pageCount={Math.ceil(InVoice.length / perPage)}
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
            </div>

        </LayoutEmployee>
        {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div style={{ marginTop: '16px' }}>

                            <h3 className="box-title1">Detail Order</h3>
                        </div>
                        <div className="tab-container">
                        <div className="tabs">
                        {filterDetailOrder.map((order,index)=>(
                            <button key={index}     className={`tab ${ActiveTab === index ? 'active' : ''}`} onClick={()=>handleTabChange(index)}>
                                {order.car}
                            </button>
                        ))}
                     </div>
                     <div className="tab-content">
                     {filterDetailOrder[ActiveTab] && (
                        <div>
                            <h4>Car Information</h4>
                                    <p><strong>Delivery Date:</strong>{new Date(filterDetailOrder[ActiveTab].deliveryDate).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    <p><strong>Price:</strong>{filterDetailOrder[ActiveTab].price}$</p>
                                    <p><strong>Tax:</strong>{filterDetailOrder[ActiveTab].tax}</p>
                         
                        </div>
                    )}
                     </div>
                        </div>
                  


                    </div>
                </div>
            )}

        
        </>
       
        
        )
}
export default HistoryInVoice;