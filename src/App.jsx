import React, { useState, useEffect } from "react";
import './App.css'
import Navbar from './components/Navbar';
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from '@mui/material';

function App() {
	return (
		<Router>
			<Navbar />
      <CssBaseline />
			<Routes>
        <Route path="/" element={<CustomerList />} />
				<Route path="/CustomerList" element={<CustomerList />} />
        <Route path="/TrainingList" element={<TrainingList />} />
			</Routes>
		</Router>
	)
}

export default App;
