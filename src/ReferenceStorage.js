import { appbaseSymbol } from './Appbase'


export class ReferenceStorage {
	constructor(app, refName) {
		this[ appbaseSymbol ] = app;
		this.refName = refName
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	child(refNameChild) {
		return new ReferenceStorage(this.appbase, `${this.refName}/${refNameChild}`)
	}

	put(/* Array */ file, metadata = {}) {
		// if (!Array.isArray(file) && file.length == 0) return Promise.reject(new Error('File is no define'))
		return this.appbase
			.transport
			.request({
				action: 'put',
				path: `/storage/${this.refName}`,
				value: {
					file,
					metadata,
				}
			})
	}
}

export default ReferenceStorage
