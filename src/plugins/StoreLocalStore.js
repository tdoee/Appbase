import { appbaseSymbol } from '../Appbase'
import Store from '../Store'
import debug from 'debug'

const log = debug('appbase:store:localstore')

export class StoreLocalStore extends Store {
	constructor( app, opts = {} ) {
		super( app )

		let { prefix = `${app.get( 'name' )}-${app.get( 'url' )}-${app.get( 'keyName' )}` } = opts
		this.prefix = prefix
		log(`use prefix '${prefix}'`)

		this.RegExpFind = new RegExp( `^${ String( prefix ).replace( /([^a-z0-9])/ig, "\\$1" ) }`, 'i' )
		log(`use RegExpFind '${this.RegExpFind}'`)

		/* Validate suppot localstore */
		if ( 'localStorage' in window ) {
			log( 'this use Localstore from \'window\'' )
		} else {
			throw new Error( 'localstore no support' )
		}
	}

	_gen_path(path) {
		return `${this.prefix}-${path}`
	}

	set( path, value ) {
		localStorage.setItem( this._gen_path(path), JSON.stringify( value ) )
	}

	get( path, defaultValue = undefined ) {
		return ( JSON.parse(localStorage.getItem( this._gen_path(path) )) || defaultValue )
	}

	has( path ) {
		return localStorage.hasOwnProperty( this._gen_path(path) )
	}

	delete( path, use_prefix = true ) {
		localStorage.removeItem( ( use_prefix ? this._gen_path(path) : path ) )
	}

	* keys() {
		yield * Object.keys( localStorage )
			.filter( e => /* Match? */ ( e.match( this.RegExpFind ) != null ) )
			.map(e=>e.substring(`${this.prefix}-`.length, Infinity))
	}

	* values() {
		let keys = this.keys()

		let c
		while((c = keys.next()).done === false) {
			yield this.get(c.value)
		}
	}

	* [Symbol.iterator]() {
		let keys = this.keys()

		let c
		while((c = keys.next()).done === false) {
			yield [c.value, this.get(c.value)]
		}
	}

	clear() {
		/* RegExp que buscara los indices coincidentes con la clave del perfil */
		log(`Usa el RegExp: ${this.RegExpFind}`)
		const ndelted = Object.keys( localStorage )
			.filter( e => /* Match? */ ( e.match( this.RegExpFind ) != null ) )
			.map( e => this.delete( e, false ) )
		log(`Deleted ${ndelted} elements`)
		return Promise.resolve(ndelted)
	}

}


export default StoreLocalStore
