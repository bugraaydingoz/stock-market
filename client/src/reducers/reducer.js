import initialState from './initialState'

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case 'ADD_STOCK':
			return Object.assign({}, state, {
				stocks: [...state.stocks, action.stock],
				labels: action.stock.labels
			})

		case 'REMOVE_STOCK':
			return Object.assign({}, state, {
				stocks: state.stocks.filter(stock => {
					return stock.label !== action.label
				})
			})

		case 'READ_FROM_MEMORY':
			return action.json

		default:
			return state
	}
}
