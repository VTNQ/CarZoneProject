import '../assets/vendors/feather/feather.css';
import '../assets/vendors/ti-icons/css/themify-icons.css';
import '../assets/vendors/css/vendor.bundle.base.css';
import '../assets/vendors/font-awesome/css/font-awesome.min.css';
import '../assets/vendors/mdi/css/materialdesignicons.min.css';
import '../assets/vendors/ti-icons/css/themify-icons.css';
import '../assets/css/style.css';
import logo from '../assets/images/logo.svg'
import avatar from '../assets/images/faces/face28.jpg'
import img from '../assets/images/dashboard/people.svg'
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
const LayoutAdmin=({children})=> {
  const navigate = useNavigate();
  const location = useLocation();
  const ID = location.state?.ID || '';
  const username=location.state?.fullName || '';
  const email = location.state?.email || '';
  const idShowroom=location.state?.idShowroom || '';
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
      setShowDropdown(!showDropdown);
    };

    return (
        <>
     <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row" style={{zIndex:'100'}}>
  <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
    <a class="navbar-brand brand-logo me-5" href="index.html"><img src={logo} class="me-2" alt="logo" /></a>
    <a class="navbar-brand brand-logo-mini" href="index.html"><img src="assets/images/logo-mini.svg" alt="logo" /></a>
  </div>
  <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
    <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
      <span class="icon-menu"></span>
    </button>
    <ul class="navbar-nav mr-lg-2">
      <li class="nav-item nav-search d-none d-lg-block">
        <div class="input-group">
          <div class="input-group-prepend hover-cursor" id="navbar-search-icon">
            <span class="input-group-text" id="search">
              <i class="icon-search"></i>
            </span>
          </div>
          <input type="text" class="form-control" id="navbar-search-input" placeholder="Search now" aria-label="search" aria-describedby="search"/>
        </div>
      </li>
    </ul>
    <ul class="navbar-nav navbar-nav-right">
      <li class="nav-item dropdown">
        <a class="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="#" data-bs-toggle="dropdown">
          <i class="icon-bell mx-0"></i>
          <span class="count"></span>
        </a>
        <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
          <p class="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
          <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <div class="preview-icon bg-success">
                <i class="ti-info-alt mx-0"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <h6 class="preview-subject font-weight-normal">Application Error</h6>
              <p class="font-weight-light small-text mb-0 text-muted"> Just now </p>
            </div>
          </a>
          <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <div class="preview-icon bg-warning">
                <i class="ti-settings mx-0"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <h6 class="preview-subject font-weight-normal">Settings</h6>
              <p class="font-weight-light small-text mb-0 text-muted"> Private message </p>
            </div>
          </a>
          <a class="dropdown-item preview-item">
            <div class="preview-thumbnail">
              <div class="preview-icon bg-info">
                <i class="ti-user mx-0"></i>
              </div>
            </div>
            <div class="preview-item-content">
              <h6 class="preview-subject font-weight-normal">New user registration</h6>
              <p class="font-weight-light small-text mb-0 text-muted"> 2 days ago </p>
            </div>
          </a>
        </div>
      </li>
      <li class="nav-item nav-profile dropdown">
        <a class="nav-link dropdown-toggle" onClick={handleDropdownToggle} data-bs-toggle="dropdown" id="profileDropdown">
          <img src={avatar} alt="profile" />
        </a>
        {showDropdown && (
            <div className="dropdown1">
              <a href="#" onClick={() => navigate('/Account')}>
                <i className="fa fa-sign-out" aria-hidden="true"></i> Logout
              </a>
              <a style={{cursor:'pointer'}}   onClick={() => navigate('/EditProfile', {state:{ID:ID,fullName:username,email:email,idShowroom:idShowroom}})}>
                <i className="fa fa-user" aria-hidden="true"></i> Account
              </a>

              {/* Các mục khác của dropdown có thể được thêm vào đây */}
            </div>
          )}
        <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
          <a class="dropdown-item">
            <i class="ti-settings text-primary"></i> Settings </a>
          <a class="dropdown-item">
            <i class="ti-power-off text-primary"></i> Logout </a>
        </div>
      </li>
      <li class="nav-item nav-settings d-none d-lg-flex">
        <a class="nav-link" href="#">
          <i class="icon-ellipsis"></i>
        </a>
      </li>
    </ul>
    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
      <span class="icon-menu"></span>
    </button>
  </div>
</nav>
<div className="container-fluid page-body-wrapper pt-0">
<nav class="sidebar sidebar-offcanvas" id="sidebar">
<ul class="nav">
  <li class="nav-item">
    <a class="nav-link">
      <i class="icon-grid menu-icon"></i>
      <span class="menu-title">Dashboard</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" onClick={()=>navigate('/HomeAdminPage',{state:{ID:ID,fullName:username,email:email,idShowroom:idShowroom}})}>
      <i class="icon-grid menu-icon"></i>
      <span class="menu-title">Home</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" onClick={()=>navigate('/WareHouse/InOrder',{state:{ID:ID,fullName:username,email:email,idShowroom:idShowroom}})}>
      <i class="icon-grid menu-icon"></i>
      <span class="menu-title">In Order</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" onClick={()=>navigate('/WareHouse/Form',{state:{ID:ID,fullName:username,email:email,idShowroom:idShowroom}})}>
      <i class="icon-grid menu-icon"></i>
      <span class="menu-title">Form</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" onClick={()=>navigate('/WareHouse/Version',{state:{ID:ID,fullName:username,email:email,idShowroom:idShowroom}})}>
      <i class="icon-grid menu-icon"></i>
      <span class="menu-title">Version</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" onClick={()=>navigate('/WareHouse/Brand',{state:{ID:ID,fullName:username,email:email,idShowroom:idShowroom}})}>
      <i class="icon-grid menu-icon"></i>
      <span class="menu-title">Brand</span>
    </a>
  </li>
 


</ul>
</nav>
{children}
</div>
        </>
    )
}
export default LayoutAdmin;