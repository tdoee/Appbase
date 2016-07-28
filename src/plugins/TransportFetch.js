import { appbaseSymbol } from '../Appbase'
import Transport, { ErrorTransportServer } from '../Transport'
import fetch from 'node-fetch'
import URL from 'url'

const normalizePathRoutes = (...path) => path.split('/').filter(Boolean).join('/')
const normalizePathRoute = (path) => path.split('/').filter(Boolean).join('/')

export class TransportFetch extends Transport {

  constructor( app, url = void 0 ) {
    super( app, url )
  }

  _fetch( method, path, body ) {
    let {currentUser = {}} = this.appbase.auth
    let {tokenId} = currentUser 

    /* Parse Body */
    if ('path' in body && typeof(body.path) === 'string') {
      body.path = normalizePathRoute(body.path)
    }

    if (process.env.NODE_ENV !== 'production') {
      console.debug(`Send a request method:${method}` , {
        tokenId,
        body,
      })
    }

    return fetch( URL.resolve( this.url, path ), {
        method,
        headers: {
          'Content-Type': 'application/json',
          /*
          Usada para identificar una session en el servidor
           */
          tokenId,
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
        /*
        When exists a error
         */
        if ('error' in bodydata) {
          const {error:{name,message,stack = ''} = {}} = bodydata
          return Promise.reject(new ErrorTransportServer(name,message,stack))
        }

        // Custom parameters
        bodydata.at = (child) => child in bodydata ? Promise.resolve(bodydata[child]) : Promise.reject(new Error(`No defined ${child}`))

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
