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
				cb(head.body.data.email, (err, session /* define a id by session */) => {
					if (err) {
						next(err)
					} else {
						body.session = session // Send Session id
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

				cb(tokenId, code, (err, session) => {
					if (err) {
						next(err)
					} else {
						body.session = session
						next()
					}
				})
			})
	}

	pullCurrenUser(cb) {
		this.appbase
			.transport
			.request('auth/currenUser', (params, head, body, next) => {
				let { tokenId } = head

				cb(tokenId, (err, session) => {
					if (err) { next(err) }
					else {
						body.session = session
						next()
					}
				})
			})
	}

	checkToken(cb) {
		this.appbase
			.transport
			.request('session/check', (params, head, body, next) => {
				let { tokenId } = head

				cb(tokenId, (err, status) => {
					if (err) {
						next(err)
					} else {
						body.status = status
						next()
					}
				})
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
