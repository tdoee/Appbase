import { appbaseSymbol, appbaseStoreSymbol } from './Appbase'
import {EventEmitter} from 'events'

export const EVENTS = Symbol('events')

/*
Almacena la memoria usadas de forma local
 */
export class Store {
	constructor( app ) {
		this[ appbaseSymbol ] = app
		/* Save this events */
		this[EVENTS] = new EventEmitter
	}

	/*
	Events allows
	 */
	emit(...args){return this[EVENTS].emit(...args)}
	on(...args){return this[EVENTS].on(...args)}
	once(...args){return this[EVENTS].once(...args)}
	removeListener(...args){return this[EVENTS].removeListener(...args)}
	removeAllListeners(...args){return this[EVENTS].removeAllListeners(...args)}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	set( path, value ) {}
	get( path, defaultValue = undefined ) {}
	has( path ) {}
	* keys() {}
	* values() {}
	* [Symbol.iterator]() {}
	forEach(f = false) {
		if (typeof f === 'function') {
			let i = this[Symbol.iterator]()
			let c
			while((c = i.next()).done === false) {
				f(c.value[1], c.value[0])
			}
		}
	}
	delete( path ) {}
	save() {return Promise.resolve("Warningn! 'save()' is disable")}
	load() {return Promise.resolve("Warningn! 'load()' is disable")}
	clear() {}
}

Store.instance = appbaseStoreSymbol

export default Store
