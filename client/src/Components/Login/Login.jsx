import React, { useState } from "react";
import '../Admin/assets/vendors/feather/feather.css'
import '../Admin/assets/vendors/ti-icons/css/themify-icons.css';
import '../Admin/assets/vendors/css/vendor.bundle.base.css';
import '../Admin/assets/vendors/font-awesome/css/font-awesome.min.css';
import '../Admin/assets/vendors/mdi/css/materialdesignicons.min.css';
import '../Admin/assets/vendors/ti-icons/css/themify-icons.css';
import '../Admin/assets/css/style.css';
import Img from '../Admin/assets/images/Carzone.png';
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
function Login(){
    const navigate = useNavigate();
    const [FromData,setFromData]=useState({
        Email:'',
        Password:''
    })
    const [loading, setloading] = useState(false);
  
    const handleLogin=async (event)=>{
        event.preventDefault();
        try{
          setloading(true)
            const response=await fetch(`http://localhost:5278/api/Account/LoginAccount/${FromData.Email}/${FromData.Password}`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const responseData = await response.json();
            const { id, fullName,email,role,idShowroom,idWarehouse } = responseData;
            const sessionData = {
              ID: id,
              fullName: fullName,
              email: email,
              role:role,
              idShowroom: idShowroom,
              idWarehouse:idWarehouse
          };
          Cookies.set('UserSession', JSON.stringify(sessionData), { expires: 0.5, secure: true, sameSite: 'strict' });
        
            if(response.ok){
              setloading(false)
                Swal.fire({
                    icon: 'success',
                    title: 'Login success',
                    showConfirmButton: false,
                    timer: 1500,
                }).then(()=>{
                    if(role==='Admin'){
                        navigate('/HomeAdminPage',{state:sessionData})
                    }else if (role==="Employee"){
                        navigate("/Employee/Dashboard",{state:sessionData})
                    }else if(role=='WareHouse'){
                      navigate("/WareHouse/Dashboard",{state:sessionData})
                    }else if(role=='Superadmin'){
                      navigate("/superadmin",{state:sessionData})
                    }
                })
            }
        }catch(error){
          setloading(false)
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }
return(
  <>
   {loading && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center z-50" style={{ zIndex: '10000' }}>
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600"></div>
                </div>

            )}
    <div class="container-scroller">
    <div class="container-fluid page-body-wrapper full-page-wrapper">
      <div class="content-wrapper d-flex align-items-center auth px-0">
        <div class="row w-100 mx-0">
          <div class="col-lg-4 mx-auto">
            <div class="auth-form-light text-left py-5 px-4 px-sm-5">
              <div class="brand-logo" style={{display:'flex',justifyContent:'center'}}>
                <img src={Img} alt="logo"/>
              </div>
             
              <form class="pt-3" onSubmit={handleLogin}>
         
                <div class="form-group">
                <label htmlFor="" className="wpforms-field-label" style={{display:'block',fontWeight:'700',fontSize:'16px',float:'none',lineHeight:'1.3',margin:'0 0 4px 0',padding:'0',wordBreak:'break-word',wordWrap:'break-word'}}>Your Email
                                                <span className="wpforms-required-label" style={{color:'#ff0000',fontWeight:'400'}}>*</span>
                                            </label>
                  <input type="email" class="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" onChange={(e)=>setFromData({...FromData,Email:e.target.value})}/>
                </div>
         
                <div class="form-group">
                <label htmlFor="" className="wpforms-field-label" style={{display:'block',fontWeight:'700',fontSize:'16px',float:'none',lineHeight:'1.3',margin:'0 0 4px 0',padding:'0',wordBreak:'break-word',wordWrap:'break-word'}}>Your Password
                                                <span className="wpforms-required-label" style={{color:'#ff0000',fontWeight:'400'}}>*</span>
                                            </label>
                  <input type="password" class="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" onChange={(e)=>setFromData({...FromData,Password:e.target.value})}/>
                </div>
                <div class="mb-4">
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input"/> I agree to all Terms & Conditions </label>
                  </div>
                </div>
                <div class="mt-3 d-grid gap-2">
                  <button class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn">SIGN IN</button>
                </div>
              
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
   
  </div>
  </>
  
)
}
export default Login;