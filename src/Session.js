import { appbaseSymbol, appbaseSessionSymbol } from './Appbase'

// state
/*
gestion la sesion actual mediante el control de almacenamiento interno
 */

/*
Una sesion cumple con 3 estados.

* No definida: En momento inicial en la cual no existe nigun tipo de sesion
* Inicializada: Es definida para establecer que fue creada
* Activa: Estado en la que se puede utilizar para majejar datos de distintas indoles

 */
export class Session {
	constructor( app ) {
		this[ appbaseSymbol ] = app

		this.status = 'undefiend' // undefined|initialized|actived
		this.load()
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
	Carga desde el store y define el valor 'status'
	 */
	load() {
		if (this.appbase.store.has('session/token_id')) {
			if (this.appbase.store.get('session/token_id').actived === true) {
				this.status = 'actived'
			} else {
				this.status = 'initialized'
			}
		} else {
			this.status = 'undefined'
		}
	}

	/*
	Retornar true si esta fue definida
	 */
	isUndefined() {
		if (this.status === 'undefined') {
			return true
		} else {
			return false
		}
	}

	/*
	Retornar true si esta fue definida
	 */
	isInitialized() {
		if (this.status === 'initialized') {
			return true
		} else {
			return false
		}
	}

	/*
	Retorna true si esta fue activada
	 */
	isActived() {
		if (this.status === 'actived') {
			return true
		} else {
			return false
		}
	}

	/*
	Estructura de session:

		Object session {
			session* : Session id, unico para el uso del servidor.
			expire   : Fecha en la que se expirara la sesion.
		}

	 */
	initialize(session) {
		this.appbase
			.store
			.set('session/token_id', session)

		this.load()
			
		return Promise.resolve()
	}

	activateSession() {
		let currentsession = this.appbase.store.get('session/token_id')

		currentsession.actived = true

		this.appbase.store.set('session/token_id', currentsession)

		this.load()
			
		return Promise.resolve()
	}

	// Si no existe ningun token de sesion
	isWithoutSession () {
		return !this.appbase
			.store
			.has('session/token_id')
	}

	clear() {
		this.appbase
			.store
			.delete('session/token_id')

		this.load()
			
		return Promise.resolve()
	}

	// Use Save process service
	save() {
		return Promise.resolve()
	}

	load() {
		return Promise.resolve()
	}
}

Session.instance = appbaseSessionSymbol

export default Session
