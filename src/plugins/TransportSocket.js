import { appbaseSymbol } from '../Appbase'
import Transport from '../Transport'
import IO from 'socket.io-client'

let IOSymbol = Symbol( "IO" )

export class TransportSocket extends Transport {
	constructor( app, url ) {
		super( app, url )
		this[ IOSymbol ] = IO( url )
	}

	get io() {
		return this[ IOSymbol ]
	}

	/**
	 * Obtiene una respuesta del trans emitir una señar de envio servidor.
	 *
	 *  --------   {JSON}   --------
	 * | Client | <======> | Server |
	 *  --------            --------
	 */
	request( data ) {
		// console.log( `TransportSocket#request(data = ${JSON.stringify(data)})` )
		return new Promise( ( resolve, reject ) => {
			// console.log( `Socket#emit('request', data = ${JSON.stringify(data)}, cb(err, data)) ` )
			this.io.emit( 'request', data, ( err, data ) => {
				// console.log( `Socket#emit('request', data = ${JSON.stringify(data)}, cb(err, data)) = cb(err = ${JSON.stringify(err)}, data = ${JSON.stringify(data)})` )
				if ( err ) {
					let e = new Error( err.message )
					e.code = err.code
					reject( e )
				} else {
					resolve( data )
				}
			} )
		} )
	}

}

TransportSocket.IOSymbol = IOSymbol

export default TransportSocket
