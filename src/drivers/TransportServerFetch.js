import TransportServer from '../TransportServer'
import express from 'express'
import bodyParser from 'body-parser'


export class TransportServerFetch extends TransportServer {

  constructor( appexpress = void 0 ) {
    super()
    this.appexpress = appexpress
  }

  /**
   * Inicializa las rutas en express
   *
   * @param {express} appexpress               Aplicación express a la se asignan las
   *                                    rutas usando el prefijo en el path
   *                                    '/'.
   * @param {String} prefix             Prefijo definido a las rutas en 'appexpress' de
   *                                    ser definida.
   * @return {Router}                   Router de la aplicación con las rutas de
   *                                    la aplicación.
   */
  setUp( appexpress = this.appexpress, prefixRoute = '/' ) {
    let router = express.Router()
    router.use( bodyParser.json() )

    // por cada request sin importar el tipo
    router.use( function( req, res, next ) {
      req.accepts( "json" )

      // Formando los header
      req.transport_head = {
        body: req.body,
      }
      req.transport_body = {}

      next()
    } )

    // api/push
    router.post( '/push', ( req, res, next ) => {
      this
        .request( 'request', req.transport_head, req.transport_body )
        .then( ( { head, data } ) => {
          res.json( {
            status: 'ok',
          } )
        } )
        .catch( err => {
          next( err )
        } )
    } )

    // api/update
    router.post( '/update', ( req, res, next ) => {
      this
        .request( 'request', req.transport_head, req.transport_body )
        .then( ( { head, data } ) => {
          res.json( {
            status: 'ok',
          } )
        } )
        .catch( err => {
          next( err )
        } )
    } )

    // api/remove
    router.post( '/remove', ( req, res, next ) => {
      this
        .request( 'request', req.transport_head, req.transport_body )
        .then( ( { head, data } ) => {
          res.json( {
            status: 'ok',
          } )
        } )
        .catch( err => {
          next( err )
        } )
    } )

    // api/set
    router.post( '/set', ( req, res, next ) => {
      this
        .request( 'request', req.transport_head, req.transport_body )
        .then( ( { head, data } ) => {
          res.json( {
            status: 'ok',
          } )
        } )
        .catch( err => {
          next( err )
        } )
    } )

    // api/request
    router.post( '/request', ( req, res, next ) => {
      this
        .request( 'request', req.transport_head, req.transport_body )
        .then( ( { head, data } ) => {
          res.json( data )
        } )
        .catch( err => {
          next( err )
        } )
    } )

    // los path comienzan con /api/
    if ( appexpress ) {
      appexpress.use( prefixRoute, router )
    }

    return router
  }

}

export default TransportServerFetch
