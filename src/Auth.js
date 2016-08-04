import { appbaseSymbol, appbaseAuthSymbol } from './Appbase'

const SymbolCurrentUser = Symbol('Current User')

export class Auth {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
		this[ SymbolCurrentUser ] = this.appbase.store.get('user-data');
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	get currentUser () {
		return this[ SymbolCurrentUser ]
	}

	set currentUser(v) {}

	updateUser(session = {}) {
		let {tokenId, uid = void 0, provider} = session

		let _u = {}
		if (tokenId) {
			_u.tokenId = tokenId

			if (provider) {
				_u.provider = provider
			}

			if (uid) {
				_u.uid = uid
			}

			this[ SymbolCurrentUser ] = _u

			this.appbase.store.set('user-data', _u)
		}
	}

	// /*
	// Obtiene los datos del usuario
	//  */
	// pullCurrenUser() {
	// 	return this.appbase
	// 		.transport
	// 		.request({
	// 			path: '/auth/pullCurrenUser'
	// 		})
	// 		.then(data => {
	// 			return Promise.resolve(data.session)
	// 		})
	// 		.then(session => {
	// 			if (session) {
	// 				this.updateUser(session)
	// 			}
	// 			return Promise.resolve(session)
	// 		})
	// }

	/*
	Envia un email para validar la sesion
	 */
	signInWithEmail( email ) {
		return this
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
					this.updateUser(session)
				}
				// console.log( `sus:`, [...e] )
				return Promise.resolve(session)
			})
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
					this.updateUser(session)
				}
				return Promise.resolve(session)
			})
	}

	checkToken() {
		return this.appbase
			.transport
			.request({
				path: '/session/check',
			})
			.then(data => {
				return Promise.resolve(data.session)
			})
			.then((session) => {
				if (session) {
					this.updateUser(session)
				}
				return Promise.resolve(session)
			})
	}

	singOut() {
		return new Promise((resolve, reject) => {
			
		})
	}
}

Auth.instance = appbaseAuthSymbol

export default Auth
