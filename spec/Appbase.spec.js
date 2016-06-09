import { Appbase as AppbaseAsMember } from '../src/Appbase'
import Appbase from '../src/Appbase'


describe( `Carga 'Appbase'`, function() {
	it( `\`import Appbase from 'Appbase'\` ...`, function() {
		// Si  es definido Appbase
		expect( Appbase ).toBeDefined();
	} )

	it( `\`import { Appbase } from 'Appbase'\` ...`, function() {
		// Si  es definido Appbase
		expect( AppbaseAsMember ).toBeDefined();
	} )
} )
