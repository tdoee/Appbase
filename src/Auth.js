import { appbaseSymbol } from '../Appbase'

export class Auth {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default Auth
