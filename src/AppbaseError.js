import kebabCase from 'lodash/kebabCase'

const SymbolService = Symbol('Service') 
const SymbolCode = Symbol('Code') 

export class AppbaseCode {
	constructor(service, code = false) {
		if (service && !code) {
			[service, code] = service.split("/")
		}

		this.service = service
		this.code = code
	}

	set service (val) {
		this[SymbolService] = (typeof val === 'string') ? kebabCase(val) : ''
	}

	get service() {
		return this[SymbolService]
	}

	set code (val) {
		this[SymbolCode] = (typeof val === 'string') ? kebabCase(val) : ''
	}

	get code () {
		return this[SymbolCode]
	}

	toString() {
		return `${this.service}/${this.code}`
	}

	toJSON() {
		return this.toString()
	}
}

export class AppbaseError extends Error {
	constructor(code, message, name, stack) {
		super(message)

		this.code = new AppbaseCode(code)
		this.message = message
		this.name = name
		this.stack = stack
	}
}

export default AppbaseError
