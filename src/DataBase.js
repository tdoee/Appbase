import { appbaseSymbol } from './Appbase'
import Reference from './Reference'

export class DataBase {

	constructor( app ) {
		this[appbaseSymbol] = app;
		// this.url = url;
		this.transport = this.appbase.transport;
	}

	ref( referenceName ) {
		return new Reference(this.appbase, this, referenceName)
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

}

export default DataBase
