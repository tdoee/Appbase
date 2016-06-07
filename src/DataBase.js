import { appbaseSymbol } from '../AppBase'

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
