import waterfall from 'async/waterfall'

let symbolUses = Symbol( 'Uses' )

/**
 * Comunicación con el servidor.
 */
export class TransportServer {
	constructor() {
		this[ symbolUses ] = new Map()
	}

	getGroup( name ) {
		if ( !this[ symbolUses ].has( name ) ) {
			this[ symbolUses ].set( name, new Set() )
		}
		this[ symbolUses ].get( name )
	}

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
	use( evalVar, ...onlyfns ) {
		let groupName
		let fns
		if ( typeof evalVar === 'function' ) {
			fns = [ evalVar, ...onlyfns ]
			groupName = '*'
		} else {
			groupName = evalVar
			fns = onlyfns
		}

		let group = this.getGroup( groupName )

		for ( const fn of fns ) {
			// statement
		}

		return this
	}

	/**
	 * Emite una solicitud que mas tarde sera ejecutada por el servidor.
	 * 
	 * @param  {Object} head 			Opciones de cabecera.
	 * @param  {Object} data 			Data a enviar.
	 * @return {Promise}      			Cuando la operación aya concluido.
	 */
	request( head = {}, data = {} ) {
		return new Promise( ( resolve, reject ) => {

		} )
	}
}

export default TransportServer