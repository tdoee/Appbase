import { appbaseSymbol } from '../AppBase'

export class Transition {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default Transition
