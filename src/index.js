import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Login from './components/Login/Login';




ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
      </Route>
      <Route path="/login" element={<Login />} />
     
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

