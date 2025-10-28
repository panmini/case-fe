import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LocationsPage from './pages/LocationsPage';
import TransportationsPage from './pages/TransportationsPage';
import RoutesPage from './pages/RoutesPage';
import './styles/globals.css';
import TestComponent from './components/TestComponent';
import ColorTest from './components/ColorTest';

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<LocationsPage />} />
					<Route path="/locations" element={<LocationsPage />} />
					<Route path="/transportations" element={<TransportationsPage />} />
					<Route path="/routes" element={<RoutesPage />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
