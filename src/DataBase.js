import { appbaseSymbol } from '../Appbase'

export class DataBase {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	ref( reference ) {}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default DataBase
