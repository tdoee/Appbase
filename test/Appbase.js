import { Appbase as AppbaseAsMember } from '../src/Appbase'
import Appbase from '../src/Appbase'
import pkg from '../package.json'
import Transport from '../src/Transport'
import expect from 'expect.js'

describe( 'Appbase', function() {
	let app
	let apiKey = 'LIiEXrtDBk'
	let url = 'http://localhost/'

	it( `use import Appbase by default`, function() {
		expect( Appbase ).not.to.be( undefined )
	} )

	it( `use import Appbase by member`, function() {
		expect( AppbaseAsMember ).not.to.be( undefined )
	} )

	describe( 'app', function() {
		let app
		before( function() {
			app = new Appbase()
		} )

		it( '#initialize()', function() {
			app.initialize( {
				apiKey,
				url,
			} )
		} )

		it( 'type Appbase', function() {
			expect( app ).to.be.an( Appbase )
		} )
	} )


} )
