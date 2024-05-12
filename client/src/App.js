import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormLayout from './Components/Admin/Layout/Form';
import Contact from './Components/Contact/Contact';
import Inventory from './Components/Inventory/Inventory';
import { Homepage } from './Components/ClientUI/Homepage/Homepage';
import Menu from './Components/Menu/Menu';
import DetailInventory from './Components/DetailInventory/DetailInventory';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/layoutAdmin' element={<FormLayout/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Inventory' element={<Inventory/>}/>
        <Route path='/Menu' element={<Menu/>}/>
        <Route path='/Homepage' element={<Homepage/>}/>
        <Route path='/DetailInventory' element={<DetailInventory/>}/>
      </Routes>
    </Router>
  );
}

export default App;
