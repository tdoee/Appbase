import { appbaseSymbol } from '../AppBase'

export class Reference {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default Reference
