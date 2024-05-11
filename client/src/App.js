import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormLayout from './Components/Admin/Layout/Form';
import { Homepage } from './Components/ClientUI/Homepage/Homepage';
import Menu from './Components/Menu/Menu';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/layoutAdmin' element={<FormLayout/>}/>
        <Route path='/Menu' element={<Menu/>}/>
        <Route path='/Homepage' element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
