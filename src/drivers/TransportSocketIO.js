import { appbaseSymbol } from '../Appbase'
import Transport, { ErrorTransportServer } from '../Transport'
import url from 'url'
import socketIo from 'socket.io-client'

const makeError = (opts = {}) => {
	let {
		name = 'error',
		message = '',
		stack = '',
	} = opts

	return new ErrorTransportServer(name, message, stack)
}

const normalizePath = p => p.split('/').filter(Boolean).join('/')

export class TransportSocketIO extends Transport {
	constructor(app) {
		super(app)

		let { currentUser = {} } = this.appbase.auth
		let { tokenId } = currentUser 

		console.log(`use this url ${this.appbase.get('url')}`)

		this.io = global.io = socketIo(this.appbase.get('url'), {
			query: `tokenId=${tokenId}`,
			autoConnect: false,
		})

		this.socketConnect()
	}

	socketConnect() {
		this.io.connect()
	}

	socketDisconnect() {
		this.io.disconnect()
	}

	request(body) {
		/* Normalize Path */
		if ('path' in body) {
			body.path = normalizePath(body.path)
		}

		return new Promise((resolve, reject) => {
			this.io.emit('/request', body, (err, dataReturn = {}) => {
				if (err) {
					reject(makeError(err))
				} else {
					// make at function
					dataReturn.at = (child) => child in dataReturn ? Promise.resolve(dataReturn[child]) : Promise.reject(new Error(`No defined ${child}`))

					resolve(dataReturn)
				}
			})
		})
	}
}

export default TransportSocketIO
