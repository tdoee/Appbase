import { appBaseSymbol } from '../AppBase'

export class Auth {

	constructor( app ) {
		this[ appBaseSymbol ] = app;
	}

	appbase() {
		return this[ appBaseSymbol ]
	}

}

export default Auth
