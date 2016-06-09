import { Appbase as AppbaseAsMember } from '../src/Appbase'
import Appbase from '../src/Appbase'
import pkg from '../package.json'
import SemVer from 'semver'


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

	it( 'Load version number...', function() {
		expect( SemVer.eq( Appbase.VERSION, pkg.version ) ).toEqual( true )
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

	it( 'varificando loas configuraciones...', function() {
		expect( app.options.url ).toEqual( url )
		expect( app.options.apiKey ).toEqual( apiKey )
	} )
} )
