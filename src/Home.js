import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './Home.css';
const Home = () => {
	return ( 
		<nav className="flex-container">
			<Link className="flex-item" to={'/update'}>UPDATE</Link>
			<Link className="flex-item" to={'/view'}>VIEW</Link>
		</nav>
	 );
}
 
export default Home;