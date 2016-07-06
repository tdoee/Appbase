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
	Obtiene los datos del usuario
	 */
	pullCurrenUser() {
		return new Promise((resolve, reject) => {

		})
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
		// console.log({code, tokenId})
		return new Promise( (resolve, reject) => {
			this.appbase
				.transport
				.request({
					path: '/auth/signInWithCodeTokenId',
					data: {
						tokenId, // token asociado a la session
						code, // Codigo de validación
					},
				})
				.then((data) => {
					resolve(data)
				})
				.catch(err => reject(err))
		} )
	}

	signInWithEmailAndPassword( email, password ) {
		return new Promise( ( resolve, reject ) => {
			//content
		} );
	}

}

export default Auth
