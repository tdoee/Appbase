import TransportServer from '../TransportServer'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'


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
    router.use( cors({
      origin: '*',
      methods: ['POST'],
      allowedHeaders: ['Content-Type', 'tokenId', 'sessionId'],
    }) )
    router.use( bodyParser.json() )

    // por cada request sin importar el tipo
    router.use( function( req, res, next ) {
      req.accepts( "json" )

      // Formando los header
      req.transport_head = {
        tokenId: req.header('tokenId'),
        body: req.body,
        customPath: (prefix) => `${prefix}${do {
          if (typeof(req.body.path) === 'string') {
            if (req.body.path[0] == '/') {
              req.body.path
            } else {
              `/${req.body.path}`
            }
          } else {
            `/`
          }
        }}`,
      }
      req.transport_body = {}

      next()
    } )

    // api/push
    router.post( '/push', ( req, res, next ) => {
      req.transport_head.path = req.transport_head.customPath('push')

      this
        .exec( req.transport_head.path, req.transport_head, req.transport_body )
        .then( () => {
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
      req.transport_head.path = req.transport_head.customPath('update')

      this
        .exec( req.transport_head.path, req.transport_head, req.transport_body )
        .then( () => {
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
      req.transport_head.path = req.transport_head.customPath('remove')

      this
        .exec( req.transport_head.path, req.transport_head, req.transport_body )
        .then( () => {
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
      req.transport_head.path = req.transport_head.customPath('set')

      this
        .exec( req.transport_head.path, req.transport_head, req.transport_body )
        .then( () => {
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
      req.transport_head.path = req.transport_head.customPath('request')

      this
        .exec( req.transport_head.path, req.transport_head, req.transport_body )
        .then( () => {
          res.json( req.transport_body )
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
