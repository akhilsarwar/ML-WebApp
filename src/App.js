import './Components/HomePage';
import HomePage from './Components/HomePage';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import ReportPage from './Components/ReportPage';
import SingleReview from './Components/SingleReview';

function App() {
  return (
    // <div class="form-label" style={{ textAlign: "center" }}>
    //   <p></p>
    //   <form method="POST" action="http://localhost:5000/result" enctype="multipart/form-data">
    //     <input type="file" name="file" class="form-control form-control-lg" />
    //     <p></p>
    //     <button class="btn btn-secondary">IMPORT CSV2</button>
    //   </form>
    // </div>

    <div>
      <Router>
        <Routes>
          <Route exact path='/' element={<HomePage />}></Route>
          <Route path='/report' element={<ReportPage />}></Route>
          <Route path='/singleReview' element={<SingleReview />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
