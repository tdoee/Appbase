import { appbaseSymbol } from '../Appbase'
import Transport from '../Transport'
import fetch from 'node-fetch'
import URL from 'url'

export class TransportFetch extends Transport {

  constructor( app, url = void 0 ) {
    super( app, url )
  }

  _fetch( method, path, body ) {

    if (process.env.NODE_ENV !== 'production') {
      console.debug(`Send a request method:${method}` , {
        'tokenId': this.appbase.session.tokenId,
        'body': body,
      })
    }

    return fetch( URL.resolve( this.url, path ), {
        method,
        headers: {
          'Content-Type': 'application/json',
          /*
          Usada para identificar una session en el servidor
           */
          'tokenId': this.appbase.session.tokenId,
          /*
          Identificada para validar la session con el servidor
           */
          // 'sessionId': 'testSession',
        },
        'body': JSON.stringify( body ),
      } )
      .then( res => {
        if ( res.ok ) {
          return res.json()
        } else {
          return Promise.reject( new Error( res.statusText ) )
        }
      } )
      .then(bodydata => {
        // Custom parameters
        bodydata.at = (child) => bodydata[child] ? Promise.resolve(bodydata[child]) : Promise.reject(new Error(`No defined ${child}`))

        return Promise.resolve(bodydata)
      })
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

  value( data ) {
    return new Promise( ( resolve, reject ) => {
      if ( process.env.NODE_ENV == 'production' ) return reject( new Error( 'Function Disabled' ) )

      let delay = 2000
      let codeInterval
      let close = () => {

      }
      let _each = () => {}
      let feed = {
        each: ( fn ) => { _each = fn },
        close: () => { clearInterval( codeInterval ) },
      }

      codeInterval = setInterval( () => {
        this
          ._fetch( 'POST', 'value', data )
          .then( _each )
      }, delay )

      resolve( feed )
    } )
  }
}

export default TransportFetch
