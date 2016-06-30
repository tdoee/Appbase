import { appbaseSymbol } from './Appbase'

// state
export class Session {

	constructor( app, tokenId ) {
		this[ appbaseSymbol ] = app
		this.tokenId = tokenId
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	clear() {
		return new Promise( ( resolve, reject ) => {
			//content
		} )
	}

}

export default Session
