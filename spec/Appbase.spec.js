import { Appbase as AppbaseAsMember } from '../src/Appbase'
import Appbase from '../src/Appbase'
import pkg from '../package.json'
import SemVer from 'semver'


describe( `Carga 'Appbase'`, function() {
	let app

	it( `\`import Appbase from 'Appbase'\` ...`, function() {
		// Si  es definido Appbase
		expect( Appbase ).toBeDefined();
	} )

	it( `\`import { Appbase } from 'Appbase'\` ...`, function() {
		// Si  es definido Appbase
		expect( AppbaseAsMember ).toBeDefined();
	} )

	it( 'Load version number...', function() {
		expect( SemVer.eq( Appbase.VERSION, pkg.version ) ).toEqual( true )
	} )

	it( 'app.initialize()...', function() {
		let appl = new Appbase()
		appl.initialize( {
			apiKey: '...',
		} )
		expect( appl instanceof Appbase ).toEqual( true );
	} )

	it( 'Appbase.initialize()...', function() {
		app = Appbase.initialize( {
			apiKey: '...',
		} )
		expect( app instanceof Appbase ).toEqual( true );
	} )

} )
