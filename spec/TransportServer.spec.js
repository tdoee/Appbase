import { TransportServer as TransportServerMember } from '../src/TransportServer.js'
import TransportServer from '../src/TransportServer.js'


describe( 'Pruebas a TransportServer', function() {
	describe( 'importando', function() {
		it( 'usando importación por defecto', function() {
			expect( TransportServer ).toBeDefined();
		} )
		it( 'usando importación nombrada', function() {
			expect( TransportServerMember ).toBeDefined();
		} )
	} )

	describe( 'creando objetos', function() {
		let transportServer

		it( 'siendo creado', () => {
			transportServer = new TransportServer()

			expect( transportServer instanceof TransportServer ).toBeTruthy();
		} )

		it('', () => {
		  
		});

		
	} )

} )
