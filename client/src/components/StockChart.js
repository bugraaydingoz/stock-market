import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { connect } from 'react-redux'

import './StockChart.css'

class StockChart extends Component {
	render() {
		let datasets = []
		console.log(this.props.labels)
		for (let i = 0; i < this.props.stocks.length; i++) {
			let colorIndex = i % this.props.colors.length
			let newData = {
				label: this.props.stocks[i].label,
				data: this.props.stocks[i].data,
				fill: false,
				backgroundColor: this.props.colors[colorIndex],
				borderColor: this.props.colors[colorIndex]
			}

			datasets.push(newData)
		}

		let data = {
			labels: this.props.labels,
			datasets: datasets
		}

		return (
			<div className="column is-9-desktop is-full-mobile stock-chart column-padding">
				<Line
					data={data}
					width={100}
					height={400}
					options={{
						maintainAspectRatio: false
					}}
				/>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		stocks: state.stocks,
		labels: state.labels,
		colors: state.colors
	}
}

export default connect(mapStateToProps)(StockChart)
