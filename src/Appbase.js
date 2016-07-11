import SemVer from 'semver'
import url from 'url'
import TransportFetch from './plugins/TransportFetch'
import Session from './session'
import StoreLocalStore from './plugins/StoreLocalStore'
import Auth from './Auth'
import DataBase from './DataBase'

export const appbaseSymbol = Symbol( 'Appbase' );
export const appbaseOptionsSymbol = Symbol( 'Options' )
export const appbaseTransportSymbol = Symbol( 'Transport' )
export const appbaseSessionSymbol = Symbol( 'Session' )
export const appbaseStoreSymbol = Symbol( 'Store' )
export const appbaseDatabaseSymbol = Symbol( 'DataBase' )
export const appbaseAuthSymbol = Symbol( 'Auth' )

const versionAppbase = process.env.APPBASE_VERSION

export class Appbase {
	constructor( defaultOpts = {} ) {
		let {
			transport = TransportFetch,
			store = StoreLocalStore,
			name = 'DEFAULT',
		} = defaultOpts

		this[ appbaseOptionsSymbol ] = {}

		this.set( 'transport', transport )
		this.set( 'store', store )
		this.set( 'name', name )
	}

	/**
	 * Inicializa la aplicación con las opciones definidas.
	 * 
	 * @param  {String} options.apiKey  Clave del servicio.
	 * @param  {String} [options.URL='http://localhost/']   Url del servicio a
	 *                                                      utilizar.
	 * @return {Appbase}                Aplicación ya configurada.
	 */
	initialize( opts = {} ) {
		let {
			apiKey,
			url: URL = null,
			transport: TransportPluginsControl = this.get( 'transport' ),
			store: StorePluginControl = this.get( 'store' ),
		} = opts
		/*
		 * En caso de usar un browser utiliza 
		 */
		if ( URL === null ) {
			if ( Boolean( typeof( window ) !== 'undefined' ) && Boolean( window.location ) ) {
				let loc = url.parse( window.location.toString() )
				URL = url.format( {
					protocol: loc.protocol,
					hostname: loc.hostname,
					port: loc.port,
				} )
			} else {
				URL = 'http://localhost/'
			}
		}

		// Set option URL
		if ( URL ) {
			this.set( 'url', URL )
		}

		// Set option apiKey
		if ( apiKey ) {
			this.set( 'apiKey', apiKey )
		}

		this[ appbaseStoreSymbol ] = new StorePluginControl( this )

		// Memoria con la session actual
		this[ appbaseSessionSymbol ] = new Session( this )

		// Genera el transportador base para la comunicación
		this[ appbaseTransportSymbol ] = new TransportPluginsControl( this, this.get( 'url' ) )

		this[ appbaseAuthSymbol ] = new Auth( this )

		// Base de datos
		this[ appbaseDatabaseSymbol ] = new DataBase( this )

		return this
	}

	/**
	 * Define una opcion
	 * 
	 * @param {String} name  			Nombre de la opción.
	 * @param {Object} value            Valor que obtiene esta opción.
	 */
	set( name, value ) {
		this[ appbaseOptionsSymbol ][ name ] = value
	}

	/**
	 * Obtiene las opciones definidas.
	 * 
	 * @param  {String} name            Nombre asociado a la opción.
	 * @param  {String} [default=undefined]                 Valor por defecto a
	 *                                                      retornar.
	 * @return {Object}                 Valor asignado a la opción.
	 * @example
	 * conts opt = app.get('my option')
	 *
	 * it (opt === 'valid opt') {
	 *     console.log('option is valid')
	 * } else {
	 *     console.log('option no valid')
	 * }
	 */
	get( name, defaultValue = void 0 ) {
		return this[ appbaseOptionsSymbol ][ name ] || defaultValue
	}

	/**
	 * Numero de la versión de la librería.
	 * 
	 * @return {SemVer}
	 */
	get VERSION() {
		return versionAppbase
	}

	/**
	 * Obtiene el transportador que esta usando el elemento Appbase.
	 *
	 * @return {Transport}              Transportador.
	 */
	get transport() {
		return this[ appbaseTransportSymbol ]
	}

	get database() {
		return this[ appbaseDatabaseSymbol ]
	}
	get session() {
		return this[ appbaseSessionSymbol ]
	}
	get store() {
		return this[ appbaseStoreSymbol ]
	}
	get auth() {
		return this[ appbaseAuthSymbol ]
	}
}

/**
 * Experimental function
 */
const _APP_ENVS = new Map()
Appbase.ENV = ( name = 'DEFAULT' ) => _APP_ENVS.has( name ) ? _APP_ENVS.get( name ) : ( _APP_ENVS.set( name, ( new Appbase( { name } ) ) ) && _APP_ENVS.get( name ) )

Appbase.VERSION = versionAppbase
Appbase.initialize = function( opts, NAMEENV = 'DEFAULT' ) {
	let app = Appbase.ENV( NAMEENV )
	return app.initialize( opts )
}

export default Appbase
