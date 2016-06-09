import server from 'socket.io'
import IO from 'socket.io-client'
import TransportSocket from '../src/plugins/TransportSocket'

describe( 'Levanta las pruebas al transporter', function() {
	let io
	let closeServer = () => {}
	let transporter

	/*
	Despliega el servidor
	 */
	beforeAll( function( done ) {
		io = server( 9001 )

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
		transporter = new TransportSocket( null, 'http://localhost:9001/' )
		expect( transporter ).toBeDefined()
		expect( transporter instanceof TransportSocket ).toBeTruthy()
		expect( e => JSON.stringify( transporter ) ).not.toThrow()
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

		transporter
			.request( {
				saludo: 'hola'
			} )
			.then( function( data ) {
				expect( data.respuesta ).toEqual( 'que tal' )
				next()
			} )
	}, 4000 )

} )
