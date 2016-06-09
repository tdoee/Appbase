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
	emitCallbackParsePromise( name, data ) {
		return new Promise( ( resolve, reject ) => {
			this.io.emit( name, data, ( err, data ) => {
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

	request( data ) {
		return this
			.afterInit()
			.then( () => this.emitCallbackParsePromise( 'request', data ) )
	}

}

TransportSocket.IOSymbol = IOSymbol

export default TransportSocket
