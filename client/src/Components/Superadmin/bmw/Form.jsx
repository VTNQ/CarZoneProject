import React from 'react'
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Pagination from "react-paginate";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
export const FormSpm = () => {
  const [Version, setVersion] = useState([]);
  const [perPage, setperPage] = useState(5);
  const [loading, setloading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  const indexOflastEmployee = (currentPage + 1) * perPage;
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
const closingAnimation = {
  animation: 'flipright 0.5s forwards',
};
const handleUpdateForm = async (event) => {
  event.preventDefault();
  if (FromData.UpdateName == '') {
      Swal.fire({
          icon: 'error',
          title: 'Name is required',
          showConfirmButton: false,
          timer: 1500,
      })
  } else {
      try {
          setloading(true)
          const response = await fetch(`http://localhost:5278/api/Form/UpdateForm/${FromData.id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: FromData.UpdateName })
          })
          if (response.ok) {
              setloading(false)
              Swal.fire({
                  icon: 'success',
                  title: 'Update Form success',
                  showConfirmButton: false,
                  timer: 1500,
              })
              setFromData({
                  id: '',
                  UpdateName: ''
              })
              setPopupVisibility(false)
              const response = await axios.get("http://localhost:5278/api/Form/ShowForm");
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
      } catch (error) {
          console.log(error)
      }
  }

}
const navigate=useNavigate();
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
     
      if (data && data.role=='Superadmin') {
          setSessionData(data);
      } else{
        navigate('/login');
      }
  }, [navigate]);
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
  const indexOfFirtEmployee = indexOflastEmployee - perPage;
  const currentVersion = Version.slice(indexOfFirtEmployee, indexOflastEmployee);

  const handlePageclick = (data) => {
    setCurrentPage(data.selected);
  };

  const fetchDataVersion = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5278/api/Form/ShowForm`);
      setVersion(response.data.result);
      console.log(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setloading(false)
    }
  }
  useEffect(() => {
    fetchDataVersion();
  }, [])

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
  const [FromData, setFromData] = useState({
   
    id: '',
    UpdateName: ''
})
  const handleEditClick = (ID) => {
    const SelectForm = Version.find(form => form.id == ID)
    if (SelectForm) {
        FromData.id = SelectForm.id;
        FromData.UpdateName = SelectForm.name;
    }
    setPopupVisibility(true)
}
  const [isPopupVisible, setPopupVisibility] = useState(false);
  const [idModel, setIdModel] = useState(null);
  const handleClickEdit = async (id) => {
    const data = Version.find(model => model.id == id);
    if (data) {
      setIdModel(id);
      setPopupVisibility(true);
    }
  }

  //fetch data brand
  const [Brand, setBrand] = useState([]);

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
            const response = await fetch(`http://localhost:5278/api/Form/DeleteForm/${ID}`, {
                method: 'Delete',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (response.ok) {
                setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Deletion Form successful',
                    showConfirmButton: false,
                    timer: 1500,
                });
                const response = await axios.get("http://localhost:5278/api/Form/ShowForm");
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
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {currentVersion.map((version, index) => (
                  <tr>
                    <td>{++index}</td>
                    <td>{version.name}</td>
                    <td><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => handleEditClick(version.id)}>Edit</button></td>
                    <td><button className="bg-red-500 hover:bg-red-700 text-white font-bold py-[0.8rem] px-4 rounded " onClick={() => DeleteSubmit(version.id)}>Delete</button></td>
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
      
      {isPopupVisible && (
                <div className="popup-container">

                    <div className="popup-content" style={IsClosingPopup ? { ...popupContentStyle, ...closingAnimation } : popupContentStyle}>
                        <div className='flex justify-end'>
                            <button onClick={handleClosepopup} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right "><i className="fas fa-times"></i></button>
                        </div>

                        <div style={{ marginTop: '16px' }}>

                            <h3 className="box-title1">Edit Form</h3>
                        </div>
                        <form role="form" onSubmit={handleUpdateForm}>
                            <div className="box-body">


                                <div class="form-group">
                                    <label className='float-left'>Name</label>
                                    <input type="text" class="form-control" value={FromData.UpdateName} onChange={(e) => setFromData({ ...FromData, UpdateName: e.target.value })} id="exampleInputUsername1" placeholder="Enter Name" />
                                </div>



                            </div>

                            <div className="box-footer">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-[0.8rem] px-4 rounded ">Update</button>
                            </div>
                        </form>


                    </div>
                </div>
            )}
    </>
    
  )
}
