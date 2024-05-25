import React, { useEffect, useState } from "react";
import LayoutEmployee from "../Layout/Layout";
import Pagination from 'react-paginate';
import axios from "axios";
function ShowContact(){
    const [ShowContact,setShowContact]=useState([]);
    const [searchTerm, setSearchtem] = useState('');
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response=await axios.get("http://localhost:5278/api/Contact/ShowContact");
                setShowContact(response.data)
            }catch(error){
                console.log(error)
            }
        }
        fetchdata();
    },[])
    const FilterContact=ShowContact.filter(Contact=>
        Contact.nameCustomer.toLowerCase().includes(searchTerm.toLowerCase()) || Contact.emailCustomer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastContact = (currentPage + 1) * perPage;
    const indexOfFirtContact = indexOflastContact - perPage;
    const currentContact = FilterContact.slice(indexOfFirtContact, indexOflastContact)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
return(
    <>
    <LayoutEmployee>
        <div class="main-panel">
            <div class="content-wrapper">

                <div className="row">
                    <div class="col-lg-12 grid-margin stretch-card">
                        <div class="card">
                            <div class="card-body">
                      
                                <h4 class="card-title">Contact</h4>
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
                                                <th> Name Customer </th>
                                                <th> Email Customer </th>
                                                <th> Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {currentContact.map((contact,index)=>(
                                            <tr>
                                                <td>{++index}</td>
                                                <td>{contact.nameCustomer}</td>
                                                <td>{contact.emailCustomer}</td>
                                                <td>{contact.description}</td>
                                            </tr>
                                           ))}
                                        </tbody>
                                    </table>

                                    <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterContact.length / perPage)}
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


    </LayoutEmployee>
</>
)
}
export default ShowContact