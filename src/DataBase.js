import { appbaseSymbol } from './Appbase'

export class DataBase {

	constructor( app ,url ,transport) {
		this[appbaseSymbol] = app;
		this.url = url;
		this.transport = transport;
	}

	ref( referenceName ) {}

	get appbase() {
		return this[ appbaseSymbol ]
	}

}

export default DataBase
