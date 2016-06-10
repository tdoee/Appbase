import { appbaseSymbol } from './Appbase'
import url from 'url'

export class Transport {

	constructor( app, url ) {
		this[ appbaseSymbol ] = app;
		this.url = url
	}

	resolveUrl( urlToResolve ) {
		return url.resolve( this.url, urlToResolve )
	}

	appbase() {
		return this[ appbaseSymbol ]
	}

	request() {}
	push() {}
	update() {}
	set() {}
	remove() {}
	value() {}
}

export default Transport
