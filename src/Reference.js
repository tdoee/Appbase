import { appbaseSymbol } from './Appbase'

export class Reference {
	constructor( app, database, refname) {
		this[appbaseSymbol] = app;
		this.database = database
		this.refname = refname
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	set(value){
		return new Promise((fulfill,reject) => {
			//content
		});
	}
}

export default Reference
