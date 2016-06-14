import { appbaseSymbol } from '../Appbase'
import Transport from '../Transport'
import fetch from 'node-fetch'

export class TransportFetch extends Transport {

  constructor( app, url ) {
    super( app, url )
  }

  request( data ) {
    return fetch( this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'tokenId': 'testToken',
          'sessionId': 'testSession'
        },
        body: JSON.stringify( data ),
      } )
      .then( res => {
        if ( res.ok ) {
          return res.json()
        } else {
          return Promise.reject( new Error( res.statusText ) )
        }
      } )
  }

  push( data ) {
    return new Promise( ( resolve, reject ) => {
      fetch( this.resolveUrl( 'push' ), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'tokenId': 'testToken',
            'sessionId': 'testSession'
          },
          body: JSON.stringify( data )
        } )
        .then( () => {
          resolve()
        } )
        .catch( err => {
          reject( err )
        } )
    } )
  }

  update( data ) {
    return new Promise( ( resolve, reject ) => {
      fetch( this.resolveUrl( 'update' ), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'tokenId': 'testToken',
            'sessionId': 'testSession'
          },
          body: JSON.stringify( data )
        } )
        .then( () => {
          resolve()
        } )
        .catch( err => {
          reject( err )
        } )
    } )
  }

  set( data ) {
    return new Promise( ( resolve, reject ) => {
      fetch( this.resolveUrl( 'set' ), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'tokenId': 'testToken',
            'sessionId': 'testSession'
          },
          body: JSON.stringify( data )
        } )
        .then( () => {
          resolve()
        } )
        .catch( err => {
          reject( err )
        } )
    } )
  }

  remove( data ) {
    return new Promise( ( resolve, reject ) => {
      fetch( this.resolveUrl( 'remove' ), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'tokenId': 'testToken',
            'sessionId': 'testSession'
          },
          body: JSON.stringify( data )
        } )
        .then( () => {
          resolve()
        } )
        .catch( err => {
          reject( err )
        } )
    } )
  }
}

export default TransportFetch
