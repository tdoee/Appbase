import { appbaseSymbol } from '../Appbase'

export class TransportFetch {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}
}

export default TransportFetch
