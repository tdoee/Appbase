import { appbaseSymbol } from './Appbase'

export class Transport {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default Transport
