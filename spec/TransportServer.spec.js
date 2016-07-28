import { TransportServer as TransportServerMember } from '../src/TransportServer.js'
import TransportServer from '../src/TransportServer.js'


describe( 'Pruebas a TransportServer', function() {

	describe( 'importando', function() {

		it( 'usando importación por defecto', function() {
			expect( TransportServer ).toBeDefined()
		} )

		it( 'usando importación nombrada', function() {
			expect( TransportServerMember ).toBeDefined()
		} )

	} )

	describe( 'creando un objeto tipo TransportServer', function() {
		let transportServer

		it( 'creando', () => {
			transportServer = new TransportServer()
			expect( transportServer instanceof TransportServer ).toBeTruthy()
		} )

		it( 'definiendo use(fn)\'s', () => {
			transportServer
				.use( ( head, data, next ) => {
					data.updateData = 3
					expect( data.updateData2 ).not.toBeDefined()
					expect( typeof( next ) ).toEqual( 'function' )
					next()
				} )

			transportServer
				.use( ( head, data, next ) => {
					data.updateData2 = 6
					expect( data.updateData ).toBeDefined()
					expect( typeof( next ) ).toEqual( 'function' )

					return new Promise( r => setTimeout( r, 200, true ) )
				} )
		} )

		it( 'emitiendo un request(head={}, data={})', ( next ) => {
			transportServer
				.request( '*', {}, {} )
				.then( ( { head, data } ) => {
					expect( data.updateData ).toBeDefined()
					expect( data.updateData2 ).toBeDefined()
					next()
				} )
				.catch( err => {
					next( err )
				} )
		}, 5000 )

	} )

} )
