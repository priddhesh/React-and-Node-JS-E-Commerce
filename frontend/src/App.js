import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import AddProduct from './Components/AddProduct';
import Login from './Components/Login';
import Products from './Components/Products'

import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
    <BrowserRouter>
    <Nav/>
    <Routes>
      
      <Route element={<PrivateComponent/>}>
      <Route path="/" element={<Products/>}></Route>
      <Route path="/add" element={<AddProduct/>}></Route>
      <Route path="/update" element={<h1>Update Product Component</h1>}></Route>
      <Route path="/logout" element={<h1>Logout</h1>}></Route>
      <Route path="/profile" element={<h1>Profile</h1>}></Route>
      </Route>

      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
    <Footer/>
    </>
  );
}

export default App;
