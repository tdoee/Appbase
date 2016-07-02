import PathExec from 'path-exec'

let SymbolPaths = Symbol( 'paths' )

export class Auth {
	constructor( app ) {
		this.app = app
	}

	signInWithEmail( cb ) {
		// this.use( '/auth/signInWithEmail', cb )
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


		// this.transport.use( 'request' , () => {
			
		// } )


		this.auth = new Auth( this )
	}

	use( path, ...fns ) {
		// this[ SymbolPaths ].use( path, ...fns )
	}
}

export default Server
