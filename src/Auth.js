import { appbaseSymbol } from '../AppBase'

export class Auth {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

}

export default Auth
