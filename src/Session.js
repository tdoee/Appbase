import { appbaseSymbol } from './Appbase'

// state
/*
gestion la sesion actual mediante el control de almacenamiento interno
 */
export class Session {
	constructor( app ) {
		this[ appbaseSymbol ] = app
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	get tokenId () {
		if (this.appbase.store.has('session/token_id')) {
			return this.appbase
				.store
				.get('session/token_id')
				.session
		} else {
			return void 0
		}
	}

	/*
	Estructura de session:

		Object session {
			session* : Session id, unico para el uso del servidor.
			expire   : Fecha ISO en la que se expirara la sesion.
		}

	 */
	initialize(session) {
		return Promise.resolve(this.appbase
			.store
			.set('session/token_id', session))
	}

	// Si no existe ningun token de sesion
	isWithoutSession () {
		return !this.appbase
			.store
			.has('session/token_id')
	}

	clear() {
		return this.appbase
			.store
			.delete('session/token_id')
	}

}

export default Session
