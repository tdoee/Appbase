import { appbaseSymbol } from '../Appbase'

export class TransportSocket {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}
}

export default TransportSocket
