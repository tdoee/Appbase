import { appbaseSymbol } from '../Appbase'

export class TransitionFetch {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}
}

export default TransitionFetch
