import { Appbase as AppbaseAsMember } from '../src/Appbase'
import Appbase from '../src/Appbase'
import pkg from '../package.json'
import Transport from '../src/Transport'


describe( `Carga 'Appbase'`, function() {
	let app
	let apiKey = 'LIiEXrtDBk'
	let url = 'http://localhost/'

	it( `\`import Appbase from 'Appbase'\` ...`, function() {
		// Si  es definido Appbase
		expect( Appbase ).toBeDefined()
	} )

	it( `\`import { Appbase } from 'Appbase'\` ...`, function() {
		// Si  es definido Appbase
		expect( AppbaseAsMember ).toBeDefined()
	} )

	it( 'app.initialize()...', function() {
		let appl = new Appbase()
		appl.initialize( {
			apiKey,
			url,
		} )
		expect( appl instanceof Appbase ).toEqual( true )
	} )

	it( 'Appbase.initialize()...', function() {
		app = Appbase.initialize( {
			apiKey,
			url,
		} )
		expect( app instanceof Appbase ).toEqual( true )
	} )

	it( 'verificando la carga de las opciones...', function() {
		expect( app.get( 'url' ) ).toEqual( url )
		expect( app.get( 'apiKey' ) ).toEqual( apiKey )
		expect( app.get( 'false option' ) ).toBeUndefined()
	} )

	describe( 'usando los transport', function() {

		it( 'si coincide los tipos retornados', function() {
			expect( app.transport instanceof Transport ).toBeTruthy()
		} )

		it( 'si coincide el Appbase objeto obtenido', function() {
			expect( app.transport.appbase instanceof Appbase ).toBeTruthy();
		} )

	} )

} )
