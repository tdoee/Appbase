import waterfall from 'async/waterfall'
// import PathExec from 'path-exec'
import PathExec from 'C:/Users/alfa30/Repositories/path-exec/index.js'

let symbolUses = Symbol( 'Uses' )

/**
 * Comunicación con el servidor.
 */
export class TransportServer {
	constructor() {
		this[ symbolUses ] = new Map()

		this.paths = new PathExec()
	}

	getGroup( name ) {
		if ( !this[ symbolUses ].has( name ) ) {
			this[ symbolUses ].set( name, new Set() )
		}
		return this[ symbolUses ].get( name )
	}

	setUp() {}

	/**
	 * 	Usada para modificar el comportamiento del request del servidor, el cual
	 * 	como parámetro requiere una función con los. La función es ejecutada 
	 * 	según reciba una solicitud. con los parametros head y data.
	 *
	 *   * Head [Object]: Contiene valores respectivos a la solicitud del
	 *   		servidor. Ej. Token Id, session Id
	 *   * data [Object]: Contiene la información enviada. 
	 *
	 * @param  {String}   [group='*']   Nombre del grupo al cual pertenece los
	 *                                  use's a utilizar, por defecto: *
	 * @param  {...Function} fns        Función que sera ejecutada al momento de
	 *                          		se requerida por una solicitud.
	 * @return {TransportServer}        Retorna el mismo objeto.
	 */
	use( ...params ) {
		let path, fns

		if (typeof(params[0]) === 'string') {
			[path, ...fns] = params

			path = `:method/${path}`
		} else {
			[...fns] = params
			path = ':method/*'
		}

		this.paths.use(path, ["method"], ...fns)

		return this
	}

	request(...params) {
		let path, fns

		if (typeof(params[0]) === 'string') {
			[path, ...fns] = params

			path = `request/${path}`
		} else {
			[...fns] = params
			path = 'request/*'
		}

		this.paths.use(path, [], ...fns)

		return this
	}

	push(...params) {
		let path, fns

		if (typeof(params[0]) === 'string') {
			[path, ...fns] = params

			path = `push/${path}`
		} else {
			[...fns] = params
			path = 'push/*'
		}

		this.paths.use(path, [], ...fns)

		return this
	}

	/**
	 * Emite una solicitud que mas tarde sera ejecutada por el servidor.
	 * 
	 * @param  {String} group           Nombre del grupo a ejecutar.
	 * @param  {Object} head 			Opciones de cabecera.
	 * @param  {Object} data 			Data a enviar.
	 * @return {Promise}      			Cuando la operación aya concluido.
	 */
	exec( path, head = {}, data = {} ) {
		return this.paths.exec(path, head, data)
	}
}

export default TransportServer
