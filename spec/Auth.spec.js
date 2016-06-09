import { Auth as AuthAsMember } from '../src/Auth'
// By default (export default)
import Auth from '../src/Auth'

describe( 'Requerir a Auth', function() {
	it( 'Si fue definido por defecto...', function() {
		expect( Auth ).toBeDefined()
	} )
	it( 'Si fue definido de forma nombrada...', function() {
		expect( AuthAsMember ).toBeDefined()
	} )
} )
