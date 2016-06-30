import { appbaseSymbol } from '../Appbase'
import Store from '../Store'


export class StoreLocalStore extends Store {
	constructor( app, opts = {} ) {
		super( app )

		let { prefix = app.get( 'name' ) } = opts
		this.prefix = prefix

		/* Validate suppot localstore */
		if ( 'localStorage' in window ) {
			console.log( 'is window' )
		} else {
			throw new Error( 'localstore no support' )
		}
	}

	set( path, value ) {
		localStorage.setItem( this.prefix + path, JSON.stringify( value ) )
	}
	get( path, defaultValue = undefined ) {
		return ( localStorage.getItem( this.prefix + path ) || defaultValue )
	}
	has( path ) {
		return localStorage.hasOwnProperty( this.prefix + path )
	}
	delete( path, use_prefix = true ) {
		localStorage.removeItem( ( use_prefix ? this.prefix : '' ) + path )
	}
	save() {}
	clear() {
		let regxfind = new RegExp( `^${ String( this.prefix ).replace( /([^a-z0-9])/g, "\\$1" ) }`, 'i' )
		Object.keys( localStorage )
			.filter( e => ( e.match( regxfind ) != null ) )
			.map( e => this.delete( e, false ) )
	}
}


export default StoreLocalStore
