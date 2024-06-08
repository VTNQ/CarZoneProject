import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import {useLocation, useNavigate} from "react-router-dom";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'

export const BMV = () => {
  
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
     
      if (data && data.role=='Superadmin') {
          setSessionData(data);
      } else{
        navigate('/login');
      }
  }, [navigate]);
    
  return (
    <div className="main-panel">
    <div className="content-wrapper">
        <div className="row">
            <div class="col-md-3 grid-margin stretch-card">
                <div class="card">
                    <div class="card-body">
                        <div className='flex flex-col gap-3'>
                        <button type="button" class="btn btn-primary btn-icon-text" onClick={()=>navigate('')}>
                        <i class="mdi mdi-emoticon-happy mr-2"></i>
                          Brand
                        </button>
                        <button type="button" class="btn btn-primary btn-icon-text" onClick={()=>navigate('model')}>
                        <i class="mdi mdi-emoticon-tongue mr-2"></i>
                          Model
                        </button>
                        <button type="button" class="btn btn-primary btn-icon-text " onClick={()=>navigate('version')}>
                        <i class="mdi mdi-emoticon-cool mr-2"></i>
                          Version
                        </button>
                        <button type="button" class="btn btn-primary btn-icon-text " onClick={()=>navigate('form')}>
                        <i class="mdi mdi-emoticon-cool mr-2"></i>
                          Form
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-9 grid-margin stretch-card">
                <div class="card">
                  
                    <div class="card-body">
                        <div className='flex flex-col'>
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}
