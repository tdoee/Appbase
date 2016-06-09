import { Appbase as AppbaseAsMember } from '../src/Appbase'
import Appbase from '../src/Appbase'
import pkg from '../package.json'
import semver from 'semver'


describe( `Carga 'Appbase'`, function() {
	it( `\`import Appbase from 'Appbase'\` ...`, function() {
		// Si  es definido Appbase
		expect( Appbase ).toBeDefined();
	} )

	it( `\`import { Appbase } from 'Appbase'\` ...`, function() {
		// Si  es definido Appbase
		expect( AppbaseAsMember ).toBeDefined();
	} )

	it( 'Load version number...', function() {
		expect( semver.eq( Appbase.VERSION, pkg.version ) ).toEqual( true )
	} );
} )
