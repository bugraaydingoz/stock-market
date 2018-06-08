import { createStore } from 'redux'
import reducer from '../reducers/reducer'

const configureStore = () => {
	return createStore(reducer)
}

export default configureStore
