import { appbaseSymbol } from '../Appbase'
import { app } from '../Appbase'

export class Reference {

	constructor( app ) {
		this[appbaseSymbol] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

	set(value){
		return new Promise((fulfill,reject) => {
			//content
		});
	}

}

export default Reference
