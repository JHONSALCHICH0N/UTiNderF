import {BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from '../pages/LoginForm';
import MenuAdmin from "../pages/MenuAdmin";


function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<LoginForm/>}/>
        <Route exact path='/menuadmin' element={<MenuAdmin/>}/>
      </Routes>
    </BrowserRouter>


  );
}

export default Rutas;
