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
				cb(head.body.data.email, (err, idsession /* define a id by session */) => {
					if (err) {
						next(err)
					} else {
						body.session = idsession // Send Session id
						next()
					}
				})
			})
	}

	signInWithCodeTokenId( cb ) {
		this.appbase
			.transport
			.request('auth/signInWithCodeTokenId', (params, head, body, next) => {
				let {tokenId, code} = head.body.data

				cb(tokenId, code, (err) => {
					if (err) {
						next(err)
					} else {
						body.session = true
						next()
					}
				})
			})
	}

	pullCurrenUser(cb) {
		this.appbase
			.transport
			.request('auth/currenUser', (params, head, body, next) => {
				
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