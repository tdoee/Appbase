import { appbaseSymbol } from './Appbase'

const __key_name_ref = Symbol('__key_name_ref')

const QuerySqueletonNames = [
	'orderBy',
	'limit',
	'filter',
	'getNearest',
	'getJoin',
	'ignoreContentFrom',/*Experimental: ignoreContentFrom( Array [row], Date )*/
]

const QuerySqueletonNamesByReference = [
	'set',
	'change',
	'value',
]

const SetterSymbol = Symbol('Set')
const MapperSymbol = Symbol('Map')

export class Query {
	constructor(ref, q = [], name, value){
		// super()

		this.ref = ref
		this[MapperSymbol] = new Map([...q])

		if (name && value) {
			this[SetterSymbol](name, value)
		}

		// console.log(this)
	}

	* [Symbol.iterator]() {
		yield * [...this[MapperSymbol]]
	}

	[SetterSymbol](name, value) {
		this[MapperSymbol].set(name, value)
	}
}

export class Reference {
	constructor( app, database, refname, opts = {}) {
		this[appbaseSymbol] = app;
		this.database = database
		this.refname = refname
		this.opts = {}

		let {
			expires = 24*60*60*1000 /* 1d */,
			cached = false,
		} = opts

		/* Time live cache */
		this.opts.expires = expires
		/* Cached actived or not */
		this.opts.cached = cached
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	[__key_name_ref]() {
		return `cached-pullvalue-${this.refname}`
	}

	value(query = []) {
		const nameCached = this[__key_name_ref]()

		if (this.opts.cached === true &&
			/* if Existe cache */
			this.appbase.store.has(nameCached)) {
				let cache = this.appbase.store.get(nameCached)

				console.log(`use cached to '${nameCached}'`)

				if ((cache['$created'] + this.opts.expires) >= Date.now()) {
					/* Utiliza el cache */
					return Promise.resolve(cache.value)
				} else {
					console.log(`cache '${nameCached}' is expired`)
				}
		}

		return this.appbase
			.transport
			.request({
				action: 'value',
				path: `/database/${this.refname}`,
				query: [...query],
			})
			.then(e => {
				return e.at('ref.value')
			})
			.then(value => {
				if (this.opts.cached === true) {
					this.appbase.store.set(nameCached, {'$created':Date.now(),value})
				}
				return Promise.resolve(value)
			})
	}

	set(value, query = []){
		return this.appbase
			.transport
			.request({
				action: 'set',
				path: `/database/${this.refname}`,
				value,
				query: [...query],
			})
	}

	change(query = []) {
		return this.appbase
			.transport
			.value({
				action: 'change',
				path: `/database/${this.refname}`,
				query: [...query],
			})
	}
}

/* Generate functions to Query */
QuerySqueletonNames.forEach(n => {
	if (n in Query.prototype || n in Reference.prototype) {
		throw new Error(`Error with QuerySqueletonNames ${n} is name restricted`)
	} else {
		Query.prototype[n] = function (...v) { return new Query(this.ref, this, n, v) }
	}
})

/* Generate functions to Reference */
QuerySqueletonNames.forEach(n => {
	if (n in Reference.prototype) {
		throw new Error(`Error with QuerySqueletonNames ${n} is usder by Reference`)
	} else {
		Reference.prototype[n] = function (...v) { return new Query(this, [], n, v) }
	}
})

/* Genearete references functions References to Query */
QuerySqueletonNamesByReference.forEach(n => {
	if (n in Reference.prototype && !(n in Query.prototype)) {
		Query.prototype[n] = function (...opts) {
			return this.ref[n](...opts, this)
		}
	} else {
		throw new Error(`Error ${n} can not defined in Reference`)
	}
})

export default Reference
