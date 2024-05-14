import React from "react";
import LayoutAdmin from "../Layout/Layout";
function AddEmployee(){
    
   return(
    <>
    <LayoutAdmin/>
       <div class="container-fluid page-body-wrapper">
  
  <nav class="sidebar sidebar-offcanvas" id="sidebar">
<ul class="nav">
<li class="nav-item">
<a class="nav-link" href="index.html">
  <i class="icon-grid menu-icon"></i>
  <span class="menu-title">Dashboard</span>
</a>
</li>
<li class="nav-item">
<a class="nav-link" data-bs-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
  <i class="icon-layout menu-icon"></i>
  <span class="menu-title">UI Elements</span>
  <i class="menu-arrow"></i>
</a>
<div class="collapse" id="ui-basic">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item"> <a class="nav-link" href="pages/ui-features/buttons.html">Buttons</a></li>
    <li class="nav-item"> <a class="nav-link" href="pages/ui-features/dropdowns.html">Dropdowns</a></li>
    <li class="nav-item"> <a class="nav-link" href="pages/ui-features/typography.html">Typography</a></li>
  </ul>
</div>
</li>
<li class="nav-item">
<a class="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
  <i class="icon-columns menu-icon"></i>
  <span class="menu-title">Form elements</span>
  <i class="menu-arrow"></i>
</a>
<div class="collapse" id="form-elements">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item"><a class="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></li>
  </ul>
</div>
</li>
<li class="nav-item">
<a class="nav-link" data-bs-toggle="collapse" href="#charts" aria-expanded="false" aria-controls="charts">
  <i class="icon-bar-graph menu-icon"></i>
  <span class="menu-title">Charts</span>
  <i class="menu-arrow"></i>
</a>
<div class="collapse" id="charts">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item"> <a class="nav-link" href="pages/charts/chartjs.html">ChartJs</a></li>
  </ul>
</div>
</li>
<li class="nav-item">
<a class="nav-link" data-bs-toggle="collapse" href="#tables" aria-expanded="false" aria-controls="tables">
  <i class="icon-grid-2 menu-icon"></i>
  <span class="menu-title">Tables</span>
  <i class="menu-arrow"></i>
</a>
<div class="collapse" id="tables">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item"> <a class="nav-link" href="pages/tables/basic-table.html">Basic table</a></li>
  </ul>
</div>
</li>
<li class="nav-item">
<a class="nav-link" data-bs-toggle="collapse" href="#icons" aria-expanded="false" aria-controls="icons">
  <i class="icon-contract menu-icon"></i>
  <span class="menu-title">Icons</span>
  <i class="menu-arrow"></i>
</a>
<div class="collapse" id="icons">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item"> <a class="nav-link" href="pages/icons/mdi.html">Mdi icons</a></li>
  </ul>
</div>
</li>
<li class="nav-item">
<a class="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
  <i class="icon-head menu-icon"></i>
  <span class="menu-title">User Pages</span>
  <i class="menu-arrow"></i>
</a>
<div class="collapse" id="auth">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item"> <a class="nav-link" href="pages/samples/login.html"> Login </a></li>
    <li class="nav-item"> <a class="nav-link" href="pages/samples/register.html"> Register </a></li>
  </ul>
</div>
</li>
<li class="nav-item">
<a class="nav-link" data-bs-toggle="collapse" href="#error" aria-expanded="false" aria-controls="error">
  <i class="icon-ban menu-icon"></i>
  <span class="menu-title">Error pages</span>
  <i class="menu-arrow"></i>
</a>
<div class="collapse" id="error">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item"> <a class="nav-link" href="pages/samples/error-404.html"> 404 </a></li>
    <li class="nav-item"> <a class="nav-link" href="pages/samples/error-500.html"> 500 </a></li>
  </ul>
</div>
</li>
<li class="nav-item">
<a class="nav-link" href="../../../docs/documentation.html">
  <i class="icon-paper menu-icon"></i>
  <span class="menu-title">Documentation</span>
</a>
</li>
</ul>
</nav>
<div class="main-panel">
      <div class="content-wrapper">
        <div class="row">
          <div class="col-md-12 grid-margin stretch-card">
            <div class="card" style={{height:'auto'}}>
              <div class="card-body">
                <h4 class="card-title">Default form</h4>
                <p class="card-description"> Basic form layout </p>
                <form class="forms-sample">
                  <div class="form-group">
                    <label for="exampleInputUsername1">Username</label>
                    <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Username"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputConfirmPassword1">Confirm Password</label>
                    <input type="password" class="form-control" id="exampleInputConfirmPassword1" placeholder="Password"/>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label text-muted">
                      <input type="checkbox" class="form-check-input" required/>
                      <a href="#">Remember me</a>
                      <i class="input-helper"></i></label>
                  </div>
                  <button type="submit" class="btn btn-primary me-2">Submit</button>
                  <button class="btn btn-light">Cancel</button>
                </form>
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


</div>
    </>
   )
 

}
export default AddEmployee;