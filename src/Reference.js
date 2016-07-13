import { appbaseSymbol } from './Appbase'

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

	__key_name_ref() {
		return `cached-pullvalue-${this.refname}`
	}

	value() {
		const nameCached = this.__key_name_ref()

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

	set(value){
		return this.appbase
			.transport
			.request({
				action: 'set',
				path: `/database/${this.refname}`,
				value,
			})
	}
}

export default Reference
