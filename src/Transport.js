import { appbaseSymbol } from './Appbase'
import _set from 'lodash/set'
import _get from 'lodash/get'
import _has from 'lodash/has'

export class Transport {

	constructor( app ) {
		this[ appbaseSymbol ] = app;
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

export default Transport
