import TransportServer from '../TransportServer'
import express from 'express'
import bodyParser from 'body-parser'


export class TransportServerFetch extends TransportServer {

  constructor( app = void 0 ) {
    super()
    this.app = app
  }

  /**
   * Inicializa las rutas en express
   *
   * @param {express} app               Aplicación express a la se asignan las
   *                                    rutas usando el prefijo en el path
   *                                    '/'.
   * @param {String} prefix             Prefijo definido a las rutas en 'app' de
   *                                    ser definida.
   * @return {Router}                   Router de la aplicación con las rutas de
   *                                    la aplicación.
   */
  setUp( app = this.app, prefixRoute = '/api' ) {
    let router = express.Router()

    router.use( bodyParser.json() )

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
    if ( app ) {
      app.use( prefixRoute, router )
    }

    return router
  }

  request( headers = {}, body = {} ) {
    super.request( headers, body )
  }

}

export default TransportServerFetch
