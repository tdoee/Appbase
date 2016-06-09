import { appbaseSymbol } from './Appbase'

export class Store {
	constructor( app ) {
		this[ appbaseSymbol ] = app
	}
	appbase() {
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
