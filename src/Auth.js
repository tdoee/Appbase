import { appbaseSymbol } from '../Appbase'

export class Auth {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
		this.currentUser=null;
	}

	appbase() {
		return this[ appbaseSymbol ]
	}


	signInWithEmail(email){
		return new Promise((fulfill,reject) => {
			//content
		});
	}

	signInWithEmailAndPassword(email,password){
		return new Promise((fulfill,reject) => {
			//content
		});
	}

}

export default Auth
