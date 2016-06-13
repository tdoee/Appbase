import TransportServer from '../TransportServer'
import express from 'express'


export class TransportServerFetch extends TransportServer {

  constructor( app ) {
    super()
    this.app = app
  }

  /**
   * Inicializa las rutas en express
   */
  setUp( app = this.app ) {
    let router = express.Router()

    // por cada request sin importar el tipo
    router.use( function( req, res, next ) {
      // hacer algo
      console.log( "log tsf use" )
      next()
    } )

    // api/push
    router.post( '/push', ( req, res, next ) => {
      console.log( "log tsf push" )
    } )

    // api/update
    router.post( '/update', ( req, res, next ) => {
      console.log( "log tsf update" )
    } )

    // api/remove
    router.post( '/remove', ( req, res, next ) => {
      console.log( "log tsf remove" )
    } )

    // api/set
    router.post( '/set', ( req, res, next ) => {
      console.log( "log tsf set" )
    } )

    // api/request
    router.post( '/', ( req, res, next ) => {
      console.log( "log tsf request" )
    } )

    // los path comienzan con /api/
    app.use( '/api', router )
  }

  request( headers = {}, body = {} ) {
    super.request( headers, body )
  }

}

export default TransportServerFetch
