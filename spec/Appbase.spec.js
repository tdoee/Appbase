import { Appbase as AppbaseWithA } from '../src/Appbase'
import Appbase from '../src/Appbase'


describe( `Carga 'Appbase'`, function() {

	it( 'si esta definida la variable utilizando opción a', function() {

		// Si  es definido Appbase
		expect( AppbaseWithA ).toBeDefined();

	} )

	it( 'si esta definida la variable utilizando opción general', function() {

		// Si  es definido Appbase
		expect( Appbase ).toBeDefined();

	} )

} )
