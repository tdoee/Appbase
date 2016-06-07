import { appbaseSymbol } from '../AppBase'

export class TransitionSocket {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}
}

export default TransitionSocket
