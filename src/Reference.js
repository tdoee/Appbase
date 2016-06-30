import { appbaseSymbol } from './Appbase'

export class Reference {

	constructor( app ) {
		this[appbaseSymbol] = app;
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
