import { appbaseSymbol } from '../Appbase'
import Transport from '../Transport'

export class TransportFetch extends Transport {

    constructor(app, url) {
        super(app, url)
    }

		request(data){
		 return new Promise((resolve,reject) => {
			 fetch('http://localhost:9000/',{
					 method: 'POST',
					 headers:{
						 'Content-Type': 'application/json'
					 },
					 body: JSON.stringify(data)
				 })
			 .then( ( res ) => {
					 return res.json()
				 } ).then((data) => {
						 //console.log(data);
						 resolve(data)
				 })
				 .catch( err => {
					 reject(err)
				 } )
		 }, 2000);
		}
}

export default TransportFetch
