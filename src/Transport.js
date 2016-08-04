import { appbaseSymbol, appbaseTransportSymbol } from './Appbase'
import url from 'url'
import EventEmitter from 'events'

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

const FnsConnectSymbol = Symbol('Events onconnect')
const FnsConnectingSymbol = Symbol('Events onconnecting')
const FnsUnconnectSymbol = Symbol('Events onconnect')
const eventsSymbol = Symbol('Events')
const connectStateSymbol = Symbol('Connect Status')

export class Transport {
	constructor( app, url = void 0 ) {
		this[ appbaseSymbol ] = app;

		this[ connectStateSymbol ] = Transport.DISCONNECT
		this[ eventsSymbol ] = new EventEmitter

		// cli event
		this.onconnect
		this.onconnecting
		this.onunconnect

		if ( url ) {
			this.url = url
		} else {
			this.url = app.get( 'url' )
		}
	}

	on(name, fn) {
		if (name === 'disconnect' && this.connectState === 0) fn()
		if (name === 'connecting' && this.connectState === 1) fn()
		if (name === 'connected'  && this.connectState === 2) fn()

		this[ eventsSymbol ].on(name, fn)
	}

	emit(name, ...args) {
		if (name === 'disconnect') this[ connectStateSymbol ] = 0
		if (name === 'connecting') this[ connectStateSymbol ] = 1
		if (name === 'connected')  this[ connectStateSymbol ] = 2

		this[ eventsSymbol ].emit(name, ...args)
	}

	get connectState() {
		return this[ connectStateSymbol ]
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

Transport.instance = appbaseTransportSymbol

Transport.DISCONNECT = 0
Transport.CONNECTING = 1
Transport.CONNECTED = 2

export default Transport
