import React from 'react'
import { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Select from "react-select"
import Pagination from "react-paginate";
export const BrandSpm = () => {
    const [Brand, setBrand] = useState([]);
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const indexOflastEmployee = (currentPage + 1) * perPage; 
    const indexOfFirtEmployee = indexOflastEmployee - perPage;
    const [isPopupVisible,setPopupVisible]= useState(false);
    const [IsClosingPopup, setIsClosingPopup] = useState(false);
    const closingAnimation = {
        animation: 'flipright 0.5s forwards',
    };
    const [FromData,setFromData] = useState({
        id: '',
        UpdateName: '',
        UpdateHeadQuaters:''
    })
    const [UpdateSelectCountry, setUpdateSelectCountry] = useState(null);

    const handleClosepopup = () => {
        setIsClosingPopup(true);
        setTimeout(() => {
            setFromData({
                id: '',
                UpdateName: '',
                c: ''
            })
            setUpdateSelectCountry(null);


            setPopupVisible(false)
            setIsClosingPopup(false)
        }, 500);
    }
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

    const currentBrand = Brand.slice(indexOfFirtEmployee, indexOflastEmployee);

    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };

  const fetchDataBrand = async () => {
        const response = await axios.get(`http://127.0.0.1:5278/api/Brand/GetBrand`);
        setBrand(response.data.result);
        console.log(response.data)
    }
  useEffect(()=>{
    fetchDataBrand();
  },[])

  const handleDeleteBrand = async (id) => {
    Swal.fire({
        title:"Do you want to delete this brand ?",
        showCancelButton: true,
        denyButtonText:"dont delete",
        confirmButtonText: "Delete",
        timer:1500
    }).then(async(result)=>{
        if(result.isConfirmed){
            const response = await fetch(`http://127.0.0.1:5278/api/Brand/DeleteBrand/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            })
            if(response.ok){
                Swal.fire({
                    icon:'success',
                    title:'Delete Success',
                    timer:1500
                })
                fetchDataBrand();
            }else{
                Swal.fire({
                    icon:'error',
                    title:'Delete Fail',
                    timer:1500
                })
            }
        }
    })
  }
  const handleUpdateSelectCountry = (event) => {
    setUpdateSelectCountry(event.target.value)
}
  const handleUpdateBrand = async (event) => {
    event.preventDefault();
    console.log(FromData)
    try {
        const response = await fetch(`http://localhost:5278/api/Brand/UpdateBrand/${FromData.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: FromData.UpdateName,
                headquarters: FromData.UpdateHeadQuaters,
                idCountry: UpdateSelectCountry
            })
        })
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Update Brand Success',
                showConfirmButton: false,
                timer: 1500,
            });
            setFromData({
                id: '',
                UpdateName: '',
                UpdateHeadQuaters: ''
            })
            setUpdateSelectCountry(null);
            setPopupVisible(false);
            const response = await axios.get("http://localhost:5278/api/Brand/GetBrand");
            setBrand(response.data)
        } else {
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
const [Country,setCountry] = useState([]);
useEffect(() => {
    const fetchdata = async () => {
        try {
            const response = await axios.get("http://localhost:5278/api/Brand/GetCountry");
            setCountry(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    fetchdata();
}, [])
const handleEditClick = (ID) => {
    const SelectBrand = Brand.find(brand => brand.id == ID)
    if (SelectBrand) {
        FromData.id = SelectBrand.id;
        FromData.UpdateHeadQuaters = SelectBrand.headQuaters;
        FromData.UpdateName = SelectBrand.name;
        setUpdateSelectCountry(SelectBrand.idCountry)
    }
    setPopupVisible(true)
}
  
  return (
    <div class="card">
                                  <div class="card-body">
                                      <h4 class="card-title">BRAND LIST</h4>
                                      
                                      <p class="card-description">
                                      </p>
                                      <div class="table-responsive">
                                      <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Name </th>
                                                        <th>Logo</th>
                                                        <th> Head Quaters </th>
                                                        <th> Country </th>
                                                        <th>Edit</th>
                                                        {/* <th>Delete</th> */}


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentBrand.map((brand, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{brand.name}</td>
                                                            <td><img src={brand.logo} width="100px" height="100px" style={{ objectFit: 'cover', borderRadius: '0%' }}
                                                                alt="" /></td>
                                                            <td>{brand.headQuaters}</td>
                                                            <td>{brand.country}</td>
                                                            <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(brand.id)}>Edit</button></td>
                                                            {/* <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={()=>{handleDeleteBrand(brand.id)}}>Delete</button></td> */}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                          <Pagination
                                              previousLabel={'previous'}
                                              nextLabel={'next'}
                                              breakLabel={'...'}
                                              pageCount={Math.ceil(Brand.length / perPage)}
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
                                  {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div style={{ marginTop: '16px' }}>

                            <h3 className="box-title1">Edit Brand</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdateBrand}>
                            <div className="box-body">
                                {/* Form fields go here */}
                                <div class="form-group">
                                    <label className='float-left'>Name</label>
                                    <input type="text" class="form-control" value={FromData.UpdateName} onChange={(e) => setFromData({ ...FromData, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>

                                <div class="form-group">
                                    <label className='float-left'>Country</label>
                                    <br />
                                    <select className="form-select" aria-label="Default select example" value={UpdateSelectCountry} onChange={handleUpdateSelectCountry}>
                                        {Country.map((country, index) => (
                                            <option value={country.id} selected={country.id == UpdateSelectCountry}>{country.name}</option>
                                        ))}
                                    </select>

                                </div>
                                <div class="form-group">
                                    <label className='float-left'>Head Quaters</label>
                                    <input type="text" class="form-control" value={FromData.UpdateHeadQuaters} onChange={(e) => setFromData({ ...FromData, UpdateHeadQuaters: e.target.value })} id="exampleInputUsername1" placeholder="Full Name" />
                                </div>


                            </div>

                            <div className="box-footer">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded ">Update</button>
                            </div>
                        </form>


                    </div>
                </div>
            )}
                              </div>
                              
  )
}
