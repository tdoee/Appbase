import PathExec from 'path-exec'

let SymbolPaths = Symbol( 'paths' )

export class Auth {
	constructor( appbase ) {
		this.appbase = appbase
	}

	signInWithEmail( cb ) {
		this.appbase
			.transport
			.request('auth/signInWithEmail', (params, head, body, next) => {
				cb(head.body.data.email, next)
			})
	}
}

/*
Maneja todoas las entras desde el servidor
 */
export class Server {
	constructor( opts = {} ) {
		let { transport } = opts
		this[ SymbolPaths ] = new PathExec()
		this.transport = transport

		this.auth = new Auth( this )
	}
}

export default Server
