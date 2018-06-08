import React, { Component } from 'react'
import Header from './components/Header'
import StockChart from './components/StockChart'
import ControlCenter from './components/ControlCenter'
import Footer from './components/Footer'

import './App.css'

class App extends Component {
	render() {
		return (
			<div className="container">
				<Header />
				<div className="columns">
					<StockChart />
					<ControlCenter />
				</div>
				<Footer />
			</div>
		)
	}
}

export default App
