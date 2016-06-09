import { appbaseSymbol } from '../Appbase'

export class Reference {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default Reference
