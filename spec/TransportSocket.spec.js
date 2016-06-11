import server from 'socket.io'
import IO from 'socket.io-client'
import TransportSocket from '../src/plugins/TransportSocket'
import middlewareTransportSocket from '../src/drivers/SocketIO'

describe( 'Levanta las pruebas al transporter', function() {
	let io
	let closeServer = () => {}
	let transporterClient
	let transporterServer

	/*
	Despliega el servidor
	 */
	beforeAll( function( done ) {
		io = server( 9001 )

		// Inicializa el transporter del servidor
		transporterServer = middlewareTransportSocket( io )




		closeServer = () => io.close()
		done()
	} )

	/*
	Cierra el servidor
	 */
	afterAll( function( done ) {
		closeServer()
		done()
	} )

	it( 'import TransportSocket from \'appbase/plugins/TransportSocket\'...', function() {
		expect( TransportSocket ).toBeDefined()
	} )

	it( 'crando un `transport`...', function() {

		// Detectando cuando se inicialice el Transport
		io.on( 'connect', function( socket ) {
			socket.on( 'update_header', function( data, cb ) {
				expect( typeof data ).toEqual( 'object' );
				cb( null, { status: 'ok' } )
			} )
		} )

		transporterClient = new TransportSocket( null, 'http://localhost:9001/' )
		expect( transporterClient ).toBeDefined()
		expect( transporterClient instanceof TransportSocket ).toBeTruthy()
		expect( e => JSON.stringify( transporterClient ) ).not.toThrow()
	} )

	it( 'provando request function...', function( next ) {
		/*
		Escucha la nueva conexión y pregunta cuando se realiza un nuevo request
		 */
		io.on( 'connect', function( socket ) {
			// console.log( `[TEST] Socket#on('request', cb(data, cb))` )
			socket.on( 'request', function( data, cb ) {
				// console.log( `[TEST] Socket#on('request', cb(data, cb)) = cb(data = ${JSON.stringify(data)})` )
				expect( data.saludo ).toEqual( 'hola' )
				cb( null, { respuesta: 'que tal' } )
			} )
		} )

		transporterClient
			.request( {
				saludo: 'hola'
			} )
			.then( function( data ) {
				expect( data.respuesta ).toEqual( 'que tal' )
				next()
			} )
	}, 4000 )

} )
