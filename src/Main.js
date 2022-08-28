import React, { useState, useEffect } from 'react';
import Home from './Home'
import Update from './Update';
import View from './View';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

const Main = ()=>{
	return(
		<div className="Main">
		
		<Router>
			<Home />
			<Routes>
				<Route exact path='/' />
				<Route path={'/update'} element={
					<Update />
				} />
				<Route path={'/view'} element={
					<View />
				} />
			</Routes>
		</Router>
		</div>
	);
}

export default Main;