import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import LayoutAdmin from "../Layout/Layout";
import axios from "axios";
import Pagination from 'react-paginate';
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
function Version() {
    const [FromData, setFromData] = useState({
        releaseYear: ''
    })
    const [loading, setloading] = useState(true);
    const navigate = useNavigate();
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

        if (data && data.role == 'WareHouse') {
            setSessionData(data);
        } else {
            // If no session data, redirect to login
            navigate('/login');
        }
    }, [navigate]);
    const [Version, setVersion] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:5278/api/Version/ShowVersion");
                setVersion(response.data.result)
            } catch (error) {
                console.log(error)
            } finally {
                setloading(false)
            }
        }
        fetchdata();
    }, [])
    const [perPage, setperPage] = useState(5);
    const [searchTerm, setSearchtem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const FilterVersion = Version.filter(ver =>
        ver.relaseYear.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const indexOflastVersion = (currentPage + 1) * perPage;
    const indexOfFirtVersion = indexOflastVersion - perPage;
    const currentVersion = FilterVersion.slice(indexOfFirtVersion, indexOflastVersion)
    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setloading(true)
            const response = await fetch("http://localhost:5278/api/Version/AddVersion", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ version: FromData.releaseYear })
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Add Version successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await axios.get("http://localhost:5278/api/Version/ShowVersion");
                setVersion(response.data.result)

                setFromData({
                    releaseYear: ''
                })
            } else {
                setloading(false)
                const responseBody = await response.json();
                if (responseBody.message) {
                    Swal.fire({
                        icon: 'error',
                        title: responseBody.message || 'Failed to add genre',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteSubmit = async (ID) => {
        try {
            const confirmation = await Swal.fire({
                title: 'Are you sure?',
                text: 'You won\'t be able to revert this!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Delete it',
            });
            if (confirmation.isConfirmed) {
                setloading(true)
                const response = await fetch(`http://localhost:5278/api/Version/DeleteVersion/${ID}`, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                if (response.ok) {
                    setloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Deletion successful',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const response = await axios.get("http://localhost:5278/api/Version/ShowVersion");
                    setVersion(response.data.result)

                } else {
                    setloading(false)
                    const responseBody = await response.json();
                    if (responseBody.message) {
                        Swal.fire({
                            icon: 'error',
                            title: responseBody.message || 'Failed to add genre',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
            <LayoutAdmin>
                <div class="main-panel">
                    <div class="content-wrapper">
                        <div class="row">
                            <div class="col-md-12 grid-margin stretch-card">
                                <div class="card" style={{ height: 'auto' }}>
                                    <div class="card-body">
                                        <h4 class="card-title">Version</h4>
                                        <p class="card-description"> Basic form layout </p>
                                        <form class="forms-sample" onSubmit={handleSubmit}>

                                            <div class="form-group">
                                                <label for="exampleInputEmail1">Release year</label>
                                                <input type="number" min={1000} value={FromData.releaseYear} onChange={(e) => setFromData({ ...FromData, releaseYear: e.target.value })} class="form-control" id="exampleInputEmail1" placeholder="Enter Version" />
                                            </div>

                                            <button type="submit" class="btn btn-primary me-2">Submit</button>

                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div class="col-lg-12 grid-margin stretch-card">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 class="card-title">Version</h4>
                                        <form class="forms-sample" >
                                            <label for="exampleInputUsername1">Search</label>
                                            <input type="text" class="form-control" id="exampleInputUsername1" value={searchTerm} onChange={(e) => setSearchtem(e.target.value)} placeholder="Enter Release Year" />
                                        </form>
                                        <p class="card-description">
                                        </p>
                                        <div class="table-responsive">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th>Release Year</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentVersion.map((version, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{version.relaseYear}</td>
                                                            <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => DeleteSubmit(version.id)}>Delete</button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                            <Pagination
                                                previousLabel={'previous'}
                                                nextLabel={'next'}
                                                breakLabel={'...'}
                                                pageCount={Math.ceil(FilterVersion.length / perPage)}
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



        </>
    )
}
export default Version;