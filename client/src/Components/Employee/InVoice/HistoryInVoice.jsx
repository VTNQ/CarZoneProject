import React, {useEffect, useState} from 'react';
import LayoutEmployee from '../Layout/Layout';
import Pagination from "react-paginate";
import axios from "axios";
import {useLocation} from "react-router-dom";
function HistoryInVoice() {
    const [perPage] = useState(5);
    const [InVoice, setInVoice] = useState([]);
    const [Order,setOrder]=useState([]);
    const [Employee,setEmployee]=useState([])
    const [currentPage, setCurrentPage] = useState(0);
    const location = useLocation();
    const ID=location.state?.ID||"";
    const idShowroom=location.state?.idShowroom||"";
    useEffect(() => {
        const fetchdataInVoice = async () => {
            const response = await axios.get(`http://localhost:5278/api/InVoice/ShowInvoice/${ID}`);
            setInVoice(response.data)
        };
        fetchdataInVoice();
    }, [])
  
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
    
    const [FromData,setFromData]=useState({
        id:''
    })
    const handleViewClick=(ID)=>{
        setFromData({
            id:ID
        })
        setPopupVisibility(true)
        
    }
    return(
        <>
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
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>handleViewClick(iv.id)} >View</button>
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

                            <h3 className="box-title1">Edit Supplier</h3>
                        </div>
                     


                    </div>
                </div>
            )}

        
        </>
       
        
        )
}
export default HistoryInVoice;