import { appbaseSymbol } from '../Appbase'
import { app } from '../Appbase'

export class DataBase {

	constructor( app ,url ,transport) {
		this[appbaseSymbol] = app;
		this.url = url;
		this.transport = transport;
	}

	ref( referenceName ) {}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default DataBase
