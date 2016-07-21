import { appbaseSymbol } from './Appbase'
import url from 'url'

export class ErrorTransportServer extends Error {
	constructor(name, message, /* Optional!DEV */ stack = false) {
		super(message)
		this.name = name
		this.message = message

		if (stack) {
			this.stack = stack + "\n" + this.stack
		}
	}
}

export class DisableElementError extends Error {}
DisableElementError.prototype.code = 1400 /* Disabled element */

export class Transport {
	constructor( app, url = void 0 ) {
		this[ appbaseSymbol ] = app;

		if ( url ) {
			this.url = url
		} else {
			this.url = app.get( 'url' )
		}
	}

	resolveUrl( urlToResolve ) {
		return url.resolve( this.url, urlToResolve )
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	request() {return Promise.reject(new DisableElementError(`Transport.request() Is Disabled`))}
	push() {return Promise.reject(new DisableElementError(`Transport.push() Is Disabled`))}
	update() {return Promise.reject(new DisableElementError(`Transport.update() Is Disabled`))}
	set() {return Promise.reject(new DisableElementError(`Transport.set() Is Disabled`))}
	remove() {return Promise.reject(new DisableElementError(`Transport.remove() Is Disabled`))}

	/* Capturing a signal from server */
	value() {return Promise.reject(new DisableElementError(`Transport.value() Is Disabled`))}
}

export default Transport
