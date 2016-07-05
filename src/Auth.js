import { appbaseSymbol } from './Appbase'

export class Auth {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
		this.currentUser = null;
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	/*
	Envia un email para validar la sesion
	 */
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
				.then(( session ) => {
					// console.log( `sus:`, [...e] )
					resolve(session)
				})
				.catch((e) => {
					reject( e )
				})	
		} );
	}

	/*
	Utiliza un codigo random para validar la cuenta, este proceso utiliza
	previamente `signInWithEmail`.
	 */
	signInWithCodeTokenId(code, tokenId) {
		console.log({code, tokenId})
		return new Promise( (resolve, reject) => {

		} )
	}

	signInWithEmailAndPassword( email, password ) {
		return new Promise( ( resolve, reject ) => {
			//content
		} );
	}

}

export default Auth
