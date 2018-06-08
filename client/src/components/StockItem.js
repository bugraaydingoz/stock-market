import React from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import store from '../index'

const socket = io.connect(window.location.hostname)

class StockItem extends React.Component {
	handleDeleteButton(label) {
		socket.emit('remove stock', label)
	}

	removeStock(label) {
		this.props.dispatch({
			type: 'REMOVE_STOCK',
			label: label
		})
	}

	componentDidMount() {
		socket.on('response message', msg => {
			alert(msg)
		})

		socket.on('remove stock', label => {
			this.removeStock(label)
			socket.emit('save stocks', store.getState())
		})
	}

	render() {
		return (
			<div className="panel-block is-block">
				<div className="level is-mobile">
					<div className="level-left">
						<span className="panel-icon is-block">
							<i
								className="fas fa-chart-line"
								aria-hidden="true"
							/>
						</span>
						<span className="">{this.props.symbol}</span>
					</div>

					<div className="level-right">
						<span
							label={this.props.symbol}
							onClick={() =>
								this.handleDeleteButton(this.props.symbol)
							}
							className="delete"
						/>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		stocks: state.stocks
	}
}

export default connect(mapStateToProps)(StockItem)
