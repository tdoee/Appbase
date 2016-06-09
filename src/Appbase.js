import SemVer from 'semver'
import url from 'url'
import pkg from '../package.json'
const appbaseSymbol = Symbol( "Appbase" );

const versionAppbase = SemVer( pkg.version )

export class Appbase {
	constructor() {
		this.options = {}
	}

	/**
	 * Inicializa la aplicación con las opciones definidas.
	 * 
	 * @param  {String} options.apiKey  Clave del servicio.
	 * @param  {String} [options.URL = ]     Url del servicio a utilizar.
	 * @return {Appbase}                Aplicación ya configurada.
	 */
	initialize( { apiKey, URL = null } ) {
		/*
		 * En caso de usar un browser utiliza 
		 */
		if ( URL === null ) {
			if ( Boolean( global.location ) ) {
				let loc = url.parse( global.location )
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
		this.options.URL = URL

		// Set option apiKey
		this.options.apiKey = apiKey

		return this
	}

	get VERSION() {
		return versionAppbase
	}

	database() {}
	session() {}
}

Appbase.VERSION = versionAppbase
Appbase.initialize = function( ...opts ) {
	let app = new Appbase()
	return app.initialize( ...opts )
}

export { appbaseSymbol }

export default Appbase
