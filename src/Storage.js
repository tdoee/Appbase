import { appbaseSymbol, appbaseStorageSymbol } from './Appbase'
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

Storage.instance = appbaseStorageSymbol

export default Storage
