import { appbaseSymbol } from '../AppBase'

export class TransitionLocalStorage {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}
}

export default TransitionLocalStorage
