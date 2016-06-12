import TransportServer from '../TransportServer'


export class TransportServerFetch extends TransportServer {

  constructor() {}

  request(headers = {}, body = {}) {
    return new Promise((resolve, reject) => {
      
    })
  }

}

export default TransportServerFetch
