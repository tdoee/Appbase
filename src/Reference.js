import { appbaseSymbol } from './Appbase'

export class Reference {
	constructor( app, database, refname) {
		this[appbaseSymbol] = app;
		this.database = database
		this.refname = refname
	}

	get appbase() {
		return this[ appbaseSymbol ]
	}

	value() {
		return this.appbase
			.transport
			.request({
				action: 'value',
				path: `/database/${this.refname}`,
			})
			.then(e => {
				return e.at('ref.value')
			})

		// return Promise.resolve({
		// 	id: this.appbase.auth.currentUser.uid,
		// 	name: {
		// 		givenName: 'Bruce',
		// 		familyName: 'Wayne',
		// 	},
		// 	email: 'hola@bruce.wayne',
		// 	lema: 'nanananana... batman 🦇',
		// })
	}

	set(value){
		return new Promise((fulfill,reject) => {
			//content
		});
	}
}

export default Reference
