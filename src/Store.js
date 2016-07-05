import { appbaseSymbol } from './Appbase'

/*
Almacena la memoria usadas de forma local
 */
export class Store {
	constructor( app ) {
		this[ appbaseSymbol ] = app
	}
	get appbase() {
		return this[ appbaseSymbol ]
	}

	set( path, value ) {}
	get( path, defaultValue = undefined ) {}
	has( path ) {}
	delete( path ) {}
	save() {}
	clear() {}
}

export default Store
