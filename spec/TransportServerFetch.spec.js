import TransportServerFetch from '../src/drivers/TransportServerFetch'
import TransportFetch from '../src/plugins/TransportFetch'
import express from 'express'
import fetch from 'node-fetch'

describe( 'pruebas TransportServerFetch', function() {
  let emulateApp
  let transportServer
  let transport
  let portTextServer = 9000
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
      console.log( `Require: [${req.method}] ${req.path}` )
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

  it( 'fue importado TransportServerFetch', function() {
    expect( TransportServerFetch ).toBeDefined()
  } )

  it( 'inicia un request', function() {
    transportServer.use( 'request', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    expect( transportServer.getGroup( 'request' ).size ).toEqual( 1 )
    expect( transportServer.getGroup( '*' ).size ).toEqual( 1 )
  } )

  it( 'inicia un push', function() {
    transportServer.use( 'push', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    expect( transportServer.getGroup( 'push' ).size ).toEqual( 1 )
    expect( transportServer.getGroup( '*' ).size ).toEqual( 2 )
  } )

  it( 'inicia un update', function() {
    transportServer.use( 'update', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    expect( transportServer.getGroup( 'update' ).size ).toEqual( 1 )
    expect( transportServer.getGroup( '*' ).size ).toEqual( 3 )
  } )

  it( 'inicia un set', function() {
    transportServer.use( 'set', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    expect( transportServer.getGroup( 'set' ).size ).toEqual( 1 )
    expect( transportServer.getGroup( '*' ).size ).toEqual( 4 )
  } )

  it( 'inicia un remove', function() {
    transportServer.use( 'remove', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )

    expect( transportServer.getGroup( 'remove' ).size ).toEqual( 1 )
    expect( transportServer.getGroup( '*' ).size ).toEqual( 5 )
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

  // it( 'probando un push', function( next ) {
  //   transport
  //     .push( {
  //       custom_this_value: randomValueToTest,
  //     } )
  //     .then( ( res ) => {
  //       expect( res.custom_value ).toEqual( randomValueToTest2 )

  //       next()
  //     } )
  //     .catch( err => {
  //       throw err
  //       next()
  //     } )
  // }, 2000 )

  // it( 'probando un update', function( next ) {
  //   transport
  //     .update( {
  //       custom_this_value: randomValueToTest,
  //     } )
  //     .then( ( res ) => {
  //       expect( res.custom_value ).toEqual( randomValueToTest2 )

  //       next()
  //     } )
  //     .catch( err => {
  //       throw err
  //       next()
  //     } )
  // }, 2000 )

  // it( 'probando un set', function( next ) {
  //   transport
  //     .set( {
  //       custom_this_value: randomValueToTest,
  //     } )
  //     .then( ( res ) => {
  //       expect( res.custom_value ).toEqual( randomValueToTest2 )

  //       next()
  //     } )
  //     .catch( err => {
  //       throw err
  //       next()
  //     } )
  // }, 2000 )

  // it( 'probando un remove', function( next ) {
  //   transport
  //     .remove( {
  //       custom_this_value: randomValueToTest,
  //     } )
  //     .then( ( res ) => {
  //       expect( res.custom_value ).toEqual( randomValueToTest2 )

  //       next()
  //     } )
  //     .catch( err => {
  //       throw err
  //       next()
  //     } )
  // }, 2000 )

} )
