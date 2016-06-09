import { appbaseSymbol } from '../Appbase'

export class Session {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default Session
