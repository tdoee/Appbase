import { appbaseSymbol } from '../Appbase'

export class TransportLocalStorage {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}
}

export default TransportLocalStorage
