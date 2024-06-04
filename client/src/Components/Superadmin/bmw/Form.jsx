import React from 'react'
import { useEffect,useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Pagination from "react-paginate";
export const FormSpm = () => {
    const [Version, setVersion] = useState([]);
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const indexOflastEmployee = (currentPage + 1) * perPage; 
    const indexOfFirtEmployee = indexOflastEmployee - perPage;
    const currentVersion = Version.slice(indexOfFirtEmployee, indexOflastEmployee);

    const handlePageclick = (data) => {
        setCurrentPage(data.selected);
    };

  const fetchDataVersion = async () => {
        const response = await axios.get(`http://127.0.0.1:5278/api/Form/ShowForm`);
        setVersion(response.data.result);
        console.log(response.data)
    }
  useEffect(()=>{
    fetchDataVersion();
  },[])

//   const handleDeleteModel = async (id) => {
//     Swal.fire({
//         title:"Do you want to delete this Model ?",
//         showCancelButton: true,
//         denyButtonText:"dont delete",
//         confirmButtonText: "Delete",
//         timer:1500
//     }).then(async(result)=>{
//         if(result.isConfirmed){
//             const response = await fetch(`http://127.0.0.1:5278/api/Brand/DeleteBrand/${id}`,{
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
//             if(response.ok){
//                 Swal.fire({
//                     icon:'success',
//                     title:'Delete Success',
//                     timer:1500
//                 })
//                 fetchDataBrand();
//             }else{
//                 Swal.fire({
//                     icon:'error',
//                     title:'Delete Fail',
//                     timer:1500
//                 })
//             }
//         }
//     })
//   }

const [isPopupVisible,setPopupVisibility] = useState(false);
const [idModel,setIdModel] = useState(null);
const handleClickEdit = async (id) => {
    const data = Version.find(model => model.id == id);
    if(data){
        setIdModel(id);
        setPopupVisibility(true);
    }
}

//fetch data brand
const [Brand,setBrand] = useState([]);

useEffect(() => {
    axios.get('http://localhost:5278/api/Brand/GetBrand')
      .then(response => {
        const ModelOptions = response.data.map(country => ({
          value: country.id,
          label: country.name
        }));
        setBrand(ModelOptions);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);
  
  return (
    <div class="card">
                                  <div class="card-body">
                                      <h4 class="card-title">FORM LIST</h4>
                                      
                                      <p class="card-description">
                                      </p>
                                      <div class="table-responsive">
                                      <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th> # </th>
                                                        <th> Name Form </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentVersion.map((version, index) => (
                                                        <tr>
                                                            <td>{++index}</td>
                                                            <td>{version.name}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                          <Pagination
                                              previousLabel={'previous'}
                                              nextLabel={'next'}
                                              breakLabel={'...'}
                                              pageCount={Math.ceil(Version.length / perPage)}
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
  )
}
