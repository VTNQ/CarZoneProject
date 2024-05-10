import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormLayout from './Components/Admin/Layout/Form';
import Menu from './Components/Menu/Menu';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/layoutAdmin' element={<FormLayout/>}/>
        <Route path='/Menu' element={<Menu/>}/>
      </Routes>
    </Router>
  );
}

export default App;
