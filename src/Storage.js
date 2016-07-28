import { appbaseSymbol } from './Appbase'
import ReferenceStorage from './ReferenceStorage'

/*
Storage is used to transfer files.
 */
export class Storage {
	constructor(app) {
		this[ appbaseSymbol ] = app;
		
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	ref(/* String */ refName) {
		return new ReferenceStorage(this.appbase, refName)
	}
}

export default Storage
