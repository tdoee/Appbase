import { appbaseSymbol } from '../Appbase'
import Transport from '../Transport'
import fetch from 'node-fetch'
import URL from 'url'

export class TransportFetch extends Transport {

  constructor( app, url = void 0 ) {
    super( app, url )
  }

  _fetch( method, path, body ) {
    return fetch( URL.resolve(this.url, path), {
        method,
        headers: {
          'Content-Type': 'application/json',
          'tokenId': 'testToken',
          'sessionId': 'testSession',
        },
        body: JSON.stringify( body ),
      } )
      .then( res => {
        if ( res.ok ) {
          return res.json()
        } else {
          return Promise.reject( new Error( res.statusText ) )
        }
      } )
  }

  request( data ) {
    return this._fetch( 'POST', 'request', data )
  }

  push( data ) {
    return this._fetch( 'POST', 'push', data )
  }

  update( data ) {
    return this._fetch( 'POST', 'update', data )
  }

  set( data ) {
    return this._fetch( 'POST', 'set', data )
  }

  remove( data ) {
    return this._fetch( 'POST', 'remove', data )
  }
}

export default TransportFetch
