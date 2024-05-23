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
    console.log(InVoice)
    const indexOflastInVoice = (currentPage + 1) * perPage;
    const indexOfFirtInVoice = indexOflastInVoice - perPage;
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    return(
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
                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " >View</button>
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
        )
}
export default HistoryInVoice;