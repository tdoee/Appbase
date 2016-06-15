import TransportServerFetch from '../src/drivers/TransportServerFetch'
import TransportFetch from '../src/plugins/TransportFetch'
import express from 'express'
import fetch from 'node-fetch'

describe( 'pruebas TransportFetch', function() {
  let emulateApp
  let transportServer
  let transport
  let portTextServer = 9001
  let randomValueToTest = Math.floor( Math.random() * 40000 )
  let randomValueToTest2 = Math.floor( Math.random() * 40000 )
  let randomValueToTest3 = Math.floor( Math.random() * 40000 )
  let randomValueToTest4 = Math.floor( Math.random() * 40000 )
  let randomValueToTest5 = Math.floor( Math.random() * 40000 )
  let closeServer = () => {}

  /*
  Definiendo las variables que seran usadas en las pruebas.
   - emulateApp ― express
   - transportServer ― TransportServerFetch
   - transport ― TransportFetch
   - closeServer ― listen#exit()
   */
  beforeAll( function( done ) {
    emulateApp = express()
    transportServer = new TransportServerFetch()

    emulateApp.use( function( req, res, next ) {
      // console.log( `Require: [${req.method}] ${req.path}` )
      next()
    } )

    // Define Uses to Transports
    transportServer.use( 'request', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    transportServer.use( 'push', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    transportServer.use( 'update', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    transportServer.use( 'set', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    transportServer.use( 'remove', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )


    // Inicia las rutas
    emulateApp.use( transportServer.setUp() )

    transport = new TransportFetch( null, `http://127.0.0.1:${ portTextServer }/` )

    // levantando el servidor
    let server = emulateApp.listen( portTextServer, function() {
      closeServer = server.close.bind( server )
      done()
    } )
  } )

  afterAll( function( done ) {
    closeServer()
    done()
  } )

  it( 'fue importado TransportFetch', function() {
    expect( TransportFetch ).toBeDefined()
  } )

  it( 'probando un request', function( next ) {
    transport
      .request( {
        custom_this_value: randomValueToTest,
      } )
      .then( ( res ) => {
        expect( res.custom_value ).toEqual( randomValueToTest2 )
        next()
      } )
      .catch( err => {
        throw err
        next()
      } )
  }, 2000 )

  it( 'probando un push', function( next ) {
    transport
      .push( {
        custom_this_value: randomValueToTest,
      } )
      .then( ( res ) => {
        next()
      } )
      .catch( err => {
        throw err
        next()
      } )
  }, 2000 )

  it( 'probando un update', function( next ) {
    transport
      .update( {
        custom_this_value: randomValueToTest,
      } )
      .then( ( res ) => {
        next()
      } )
      .catch( err => {
        throw err
        next()
      } )
  }, 2000 )

  it( 'probando un set', function( next ) {
    transport
      .set( {
        custom_this_value: randomValueToTest,
      } )
      .then( ( res ) => {
        next()
      } )
      .catch( err => {
        throw err
        next()
      } )
  }, 2000 )

  it( 'probando un remove', function( next ) {
    transport
      .remove( {
        custom_this_value: randomValueToTest,
      } )
      .then( ( res ) => {
        next()
      } )
      .catch( err => {
        throw err
        next()
      } )
  }, 2000 )

} )
