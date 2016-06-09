import { appbaseSymbol } from '../Appbase'
import Transport from '../Transport'
import IO from 'socket.io-client'

let IOSymbol = Symbol( "IO" )
let IsInit = Symbol( 'initialized' )
let initializedProcess = Symbol( 'Initialized Process' )

export class TransportSocket extends Transport {
	constructor( app, url ) {
		super( app, url )
		this[ IOSymbol ] = IO( url )
		this[ initializedProcess ] = Promise.reject( new Error( 'Not Initialized' ) )
		this[ IsInit ] = false
		this.init()
	}

	isInit() {
		return this[ IsInit ] === true
	}

	/*
	Enviá la opciones al servidor
	 */
	updateHeadersHeaders() {
		this[ initializedProcess ] = this
			.emitCallbackParsePromise( 'update_header', {} )
	}

	/*
	 * Inicia con el servidor las opciones de cabecera
	 */
	init() {
		if ( !this.isInit() ) {
			this[ IsInit ] = true
			this.updateHeadersHeaders()
		}
	}

	afterInit() {
		return this[ initializedProcess ]
	}

	get io() {
		return this[ IOSymbol ]
	}

	/**
	 * Obtiene una respuesta del tras emitir una señar de envio servidor.
	 *
	 *  --------   { JSON }   --------
	 * | Client | <========> | Server |
	 *  --------              --------
	 */
	emitCallbackParsePromise( name, data, sendCb = true ) {
		return new Promise( ( resolve, reject ) => {
			let cb = ( err, data ) => {
				if ( err ) {
					let e = new Error( err.message )
					e.code = err.code
					reject( e )
				} else {
					resolve( data )
				}
			}
			this.io.emit( name, data, sendCb && cb )
			if ( sendCb == false ) {
				resolve( {} )
			}
		} )
	}

	request( data ) {
		return this
			.afterInit()
			.then( () => this.emitCallbackParsePromise( 'request', data ) )
	}

	push( data ) {
		return this
			.afterInit()
			.then( () => this.emitCallbackParsePromise( 'push', data, false ) )
	}
	update( data ) {
		return this
			.afterInit()
			.then( () => this.emitCallbackParsePromise( 'update', data, false ) )
	}
	set( data ) {
		return this
			.afterInit()
			.then( () => this.emitCallbackParsePromise( 'set', data, false ) )
	}
	remove( data ) {
		return this
			.afterInit()
			.then( () => this.emitCallbackParsePromise( 'remove', data, false ) )
	}
	value( data ) {
		
	}

}

TransportSocket.IOSymbol = IOSymbol

export default TransportSocket
