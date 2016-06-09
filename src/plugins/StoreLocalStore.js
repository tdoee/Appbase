import { appbaseSymbol } from '../Appbase'

export class StoreLocalStore {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}
}

export default StoreLocalStore
