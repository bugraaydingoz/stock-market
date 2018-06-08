import React, { Component } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import StockItem from './StockItem'
import './ControlCenter.css'
import store from '../index'

const socket = io.connect(window.location.hostname)

class ControlCenter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			disabled: ''
		}
	}

	handleAddButton(e) {
		socket.emit('add stock', this.state.text)
		this.setState({ text: '', disabled: 'disabled' })
	}

	onInputChange(text) {
		this.setState({ text: text })
	}

	componentDidMount() {
		socket.on('connection', json => {
			this.props.dispatch({ type: 'READ_FROM_MEMORY', json: json })
		})

		socket.on('response message', msg => {
			alert(msg)
			this.setState({ disabled: '' })
		})

		socket.on('new stock', data => {
			console.log(data)
			this.props.dispatch({ type: 'ADD_STOCK', stock: data })
			socket.emit('save stocks', store.getState())
			this.setState({ disabled: '' })
		})
	}

	render() {
		return (
			<div className="column column-padding">
				<nav className="panel" />
				<p className="panel-heading is-bg-white">Stocks</p>

				{this.props.stocks.map((stock, i) => {
					return (
						<StockItem
							delete={() => this.removeStock()}
							key={i}
							symbol={stock.label}
						/>
					)
				})}

				<div className="panel-block">
					<div className="columns is-mobile">
						<div className="column is-9">
							<p className="control has-icons-left">
								<input
									value={this.state.text}
									onChange={e =>
										this.onInputChange(e.target.value)
									}
									className="input"
									type="text"
									placeholder="Search by symbol"
								/>
								<span className="icon is-small is-left">
									<i
										className="fas fa-search"
										aria-hidden="true"
									/>
								</span>
							</p>
						</div>

						<div className="column">
							<button
								disabled={this.state.disabled}
								onClick={e => this.handleAddButton(e)}
								className="button is-dark is-3"
							>
								Add
							</button>
						</div>
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

export default connect(mapStateToProps)(ControlCenter)
