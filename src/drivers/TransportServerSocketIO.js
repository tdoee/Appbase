import TransportServer from '../TransportServer'
import socketIo from 'socket.io'

const normalizePath = p => p.split('/').filter(Boolean).join('/')

export class TransportServerSocketIO extends TransportServer {
	constructor() {
		super()
	}

	_log(...messages) {
		console.log('[TransportServerSocketIO]', ...messages)
	}

	setUp() {
		// this._log(`use setup():(socket, next)`)

		return (socket, next) => {
			// this._log(`new connection "#${socket.id}" connected`)

			let tokenId
			if ('tokenId' in socket.handshake.query) {
				tokenId = socket.handshake.query.tokenId
			}

			socket.on('/request', (body, cb) => {
				/* Normalize Path */
				if ('path' in body) {
					body.path = normalizePath(body.path)
				}

				// this._log('[request]', 'use request data body:', body)

				let transport_head = {
					tokenId,
					body,
					customPath: (prefix) => normalizePath(`${prefix}/${body.path}`),
				}

				transport_head.path = transport_head.customPath('request')

				let transport_body = {}

				// this._log(transport_head, transport_body)

				this.exec(transport_head.path, transport_head, transport_body)
					.then(() => {
						// console.log(`Uper transport_body:`, transport_body)

						cb(void 0, transport_body)
					})
					.catch(err => {
						console.error(err.stack)

						let outErr = {}

						outErr.code = err.code
						outErr.name = err.name
						outErr.message = err.message

						if (process.env.NODE_ENV !== 'production') {
							outErr.stack = err.stack
						}

						cb(outErr)
					})
			})

			next()
		}
	}
}

export default TransportServerSocketIO
