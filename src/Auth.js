import { appbaseSymbol } from './Appbase'

export class Auth {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
		this.currentUser = null;
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	signInWithEmail( email ) {
		return new Promise( ( resolve, reject ) => {
			//content
			this
				.appbase
				.transport
				.request({
					path: '/auth/signInWithEmail',
					data: {
						email,
					},
				})
				.then(( ...e ) => {
					console.log( `sus:`, [...e] )
				})
				.catch((e) => {
					reject( e )
				})	
		} );
	}

	signInWithEmailAndPassword( email, password ) {
		return new Promise( ( resolve, reject ) => {
			//content
		} );
	}

}

export default Auth
