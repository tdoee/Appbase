import express from 'express'
import fetch from 'node-fetch'

describe( 'Levanta las pruebas al transporter', function() {
	let emulateApp
	let closeServer = () => {}

	/*
	Despliega el servidor
	 */
	beforeAll( function( done ) {
		emulateApp = express()

		let server = emulateApp.listen( 9000, function() {
			console.log( "Ready Server port 9000" )

			done()
		} )

		closeServer = server.close.bind( server )
	} )

	/*
	Cierra el servidor
	 */
	afterAll( function( done ) {
		closeServer()
		done()
	} )


	it( 'descarga la cabecera del localhost...', function( next ) {
		// Obitiene el fetch element
		fetch( 'http://localhost:9000/' )
			.then( ( res ) => {
				expect( true ).toEqual( true )
				next()
			} )
			.catch( err => {
				throw err
			} )
	}, 2000 );

} )
