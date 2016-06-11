/**
 * Comunicación con el servidor.
 */
class TransportServer {
	constructor() {

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
	 * @param  {Function} fn 			Función que sera ejecutada al momento de
	 *                          		se requerida por una solicitud.
	 * @return {TransportServer}		Retorna el mismo objeto.
	 */
	use( fn ) {
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
