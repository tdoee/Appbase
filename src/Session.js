import { appbaseSymbol } from '../AppBase'

export class Session {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default Session
