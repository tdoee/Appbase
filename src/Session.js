import { appbaseSymbol } from './Appbase'

export class Session {

	constructor( app,tokenId ) {
		this[appbaseSymbol] = app;
		this.tokenId = tokenId;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

	clear(){
		return new Promise((fulfill,reject) => {
			//content
		});
	}

}

export default Session
