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
import Layout from './Components/Admin/Home/Homepage';
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
import RequestSupplier from './Components/Admin/Request/RequestSupplier';
import ShowCarWareHouse from './Components/Admin/ShowCarWareHouse/ShowCarWareHouse';
import HistoryInVoice from './Components/Employee/InVoice/HistoryInVoice';
import AddOrder from './Components/Employee/Order/AddOrder';
import HistoryOrder from './Components/Employee/Order/HistoryOrder';
import ShowContactEmployee from './Components/Employee/ShowContact/ShowContact';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Inventory' element={<Inventory/>}/>
        <Route path='/EmployeeAdmin' element={<AddEmployee/>}/>
        <Route path='/Menu' element={<Menu/>}/>
        <Route path='/HomeAdminPage' element={<Layout/>}/>
        <Route path='/Homepage' element={<Homepage/>}/>
        <Route path='/DetailInventory/:id' element={<DetailInventory/>}/>
        <Route path='/AboutUs' element={<AboutUs/>}/>
        <Route path='/Footer' element={<Footer/>}/>
        <Route path='/DetailInOrder/:id' element={<DetailInOrders/>}/>
        <Route path='/Employee/'>
          <Route index path="Dashboard" element={<DashboardEmployee/>}/>
          <Route path='Show-Customer' element={<ShowCustomer/>}/>
          <Route path='Create-Customer' element={<CreateCustomer/>}/>
          <Route path='AddOrder' element={<AddOrder/>}/>
          <Route path='HistoryOrder' element={<HistoryOrder/>}/>
          <Route path='ShowContact' element={<ShowContactEmployee/>}/>
        </Route>
        <Route path='/InVoice/HistoryInVoice' element={<HistoryInVoice/>}/>
        <Route path='/ManagerAdminCustomer' element={<ManagerAdminCustomer/>}/>
        <Route path='/Supplier' element={<Supplier/>}/>
        <Route path='/Color' element={<Color/>}/>
        <Route path='/InOrder' element={<InOrder/>}/>
        <Route path='/OutOrder' element={<OutOrder/>}/>
        <Route path='/DetailOutOrder/:id' element={<DetailOutOrders/>}/>
        <Route path='/ShowContact' element={<ShowContact/>}/>
        <Route path='/RequestWareHouse' element={<Request/>}/>
        <Route path='/EditProfile' element={<EditProfile/>}/>
        <Route path='/RequestSupplier' element={<RequestSupplier/>}/>
        <Route path='/ShowCarWareHouse' element={<ShowCarWareHouse/>}/>
      
      </Routes>
    </Router>
  );
}

export default App;
