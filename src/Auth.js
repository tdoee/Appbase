import { appbaseSymbol } from './Appbase'

export class Auth {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
		this.currentUser = void 0;
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	/*
	Obtiene los datos del usuario
	 */
	pullCurrenUser() {
		return this.appbase
			.transport
			.request({
				path: '/auth/pullCurrenUser'
			})
			.then(data => {
				return Promise.resolve(data.session)
			})
			.then(session => {
				if (session) {
					this.currentUser = session
				}
				this.currentUser = session
				return Promise.resolve(session)
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
				.then(data => {
					return Promise.resolve(data.session)
				})
				.then(( session ) => {
					if (session) {
						this.currentUser = session
					}
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
		return this.appbase
			.transport
			.request({
				path: '/auth/signInWithCodeTokenId',
				data: {
					tokenId, // token asociado a la session
					code, // Codigo de validación
				},
			})
			.then(data => {
				return Promise.resolve(data.session)
			})
			.then((session) => {
				if (session) {
					this.currentUser = session
				}
				resolve(session)
			})
	}

	// signInWithEmailAndPassword( email, password ) {
	// 	return new Promise( ( resolve, reject ) => {
	// 		//content
	// 	} );
	// }

	checkToken() {
		return this.appbase
			.transport
			.request({
				path: '/session/check',
			})
	}
}

export default Auth
