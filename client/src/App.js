import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './Components/Contact/Contact';
import Inventory from './Components/Inventory/Inventory';
import { Homepage } from './Components/ClientUI/Homepage/Homepage';
import Menu from './Components/Menu/Menu';
import DetailInventory from './Components/DetailInventory/DetailInventory';
import AboutUs from './Components/AboutUs/AboutUs';
import Footer from './Components/Footer/Footer';
import DashboardEmployee from './Components/Employee/Dashboard/Dashboard';
import CreateCustomer from './Components/Employee/Customer/AddCustomer';
import ShowCustomer from './Components/Employee/Customer/ShowCustomer';
import AddEmployee from './Components/Admin/AddEmployee/AddEmployee';
import Login from './Components/Login/Login';
import Layout from './Components/Admin/Layout/Layout';
import { LayoutSuperadmin } from './Components/Superadmin/LayoutSuperadmin';
import { Dashboard } from './Components/Superadmin/Dashboard';
import { Car } from './Components/Superadmin/Car/Car';
import { Countries } from './Components/Superadmin/Countries';
import { CityDistrict } from './Components/Superadmin/CityDistrict';
import LayoutHomepage from './Components/Admin/Home/Homepage';
import ManagerAdminCustomer from './Components/Admin/AddCustomer/ManagerAdminCustomer';
import Supplier from './Components/Admin/Supplier/Supplier';
import Color from './Components/Color/Color';
import InOrder from './Components/Admin/InOrder/InOrder';
import DetailInOrders from './Components/Admin/InOrder/DetailInOrder';
import OutOrder from './Components/Admin/OutOrder/OutOrder';
import DetailOutOrders from './Components/Admin/OutOrder/DetailOutOrder';
import ShowContact from './Components/Admin/ShowContact/ShowContact';
import Request from './Components/Admin/Request/Request';
import EditProfile from './Components/Admin/EditProfile/EditProfile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Inventory' element={<Inventory/>}/>
        <Route path='/EmployeeAdmin' element={<AddEmployee/>}/>
        <Route path='/Menu' element={<Menu/>}/>
        <Route path='/HomeAdminPage' element={<LayoutHomepage/>}/>
        <Route path='/Homepage' element={<Homepage/>}/>
        <Route path='/DetailInventory' element={<DetailInventory/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/Footer' element={<Footer/>}/>
        <Route path='/superadmin/' element={<LayoutSuperadmin/>}>
            <Route index element={<Dashboard/>} />
            <Route path='carPage' element={<Car/>}/>
            <Route path='countriesPage' element={<Countries/>}/>
            <Route path='CityDistrictPage' element={<CityDistrict/>}/>

        </Route>
        <Route path='/DetailInOrder/:id' element={<DetailInOrders/>}/>
        <Route path='/Employee/'>
          <Route index path="Dashboard" element={<DashboardEmployee/>}/>
          <Route path='Show-Customer' element={<ShowCustomer/>}/>
          <Route path='Create-Customer' element={<CreateCustomer/>}/>
        </Route>

        <Route path='/ManagerAdminCustomer' element={<ManagerAdminCustomer/>}/>
        <Route path='/Supplier' element={<Supplier/>}/>
        <Route path='/Color' element={<Color/>}/>
        <Route path='/Inorder' element={<InOrder/>}/>
        <Route path='/OutOrder' element={<OutOrder/>}/>
        <Route path='/DetailOutOrder/:id' element={<DetailOutOrders/>}/>
        <Route path='/ShowContact' element={<ShowContact/>}/>
        <Route path='/Request' element={<Request/>}/>
        <Route path='/EditProfile' element={<EditProfile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
