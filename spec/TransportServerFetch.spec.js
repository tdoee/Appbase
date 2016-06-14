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
      // Inicia las rutas
    transportServer.setUp( emulateApp )

    transport = new TransportFetch( null, `http://localhost:${ portTextServer }/` )

    // levantando el servidor
    let server = emulateApp.listen( portTextServer, function() {
      done()
    } )

    closeServer = server.close.bind( server )
  } )

  afterAll( function( done ) {
    closeServer()
    done()
  } )

  it( 'import TransportServerFetch', function() {
    expect( TransportServerFetch ).toBeDefined()
  } )

  it( 'inicia un request', function() {
    transportServer.use( 'request', ( head, body, next ) => {
      let custom_value = head.body.custom_this_value
      expect( custom_value ).toEqual( randomValueToTest )
      body.custom_value = randomValueToTest2
      next()
    } )
  } )

  it( 'inicia un push', function() {
    
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
        expect( res.custom_value ).toEqual( randomValueToTest2 )

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
        expect( res.custom_value ).toEqual( randomValueToTest2 )

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
        expect( res.custom_value ).toEqual( randomValueToTest2 )

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
        expect( res.custom_value ).toEqual( randomValueToTest2 )

        next()
      } )
      .catch( err => {
        throw err
        next()
      } )
  }, 2000 )

  // it( 'metodo push en transport fetch', function() {
  //   let data = { name: "push" }
  //   transporter.push( data ).then( ( res ) => {
  //     expect( res ).not.toBe( null )
  //   }, ( err ) => {
  //     expect( true ).not.toBe( true )
  //   } )
  // }, 2000 )

  // it( 'metodo remove en transport fetch', function() {
  //   let data = { name: "remove" }
  //   transporter.remove( data ).then( ( res ) => {
  //     expect( res ).not.toBe( null )
  //   }, ( err ) => {
  //     expect( true ).not.toBe( true )
  //   } )
  // }, 2000 )

  // it( 'metodo request en transport fetch', function() {
  //   let data = { name: "request" }
  //   transporter.request( data ).then( ( res ) => {
  //     expect( res.name ).toEqual( 'respuesta server' )
  //   }, ( err ) => {
  //     expect( true ).not.toBe( true )
  //   } )
  // } )

  // it( 'metodo update en transport fetch', function() {
  //   let data = { name: "update" }
  //   transporter.update( data ).then( ( res ) => {
  //     expect( res ).not.toBe( null )
  //   }, ( err ) => {
  //     expect( true ).not.toBe( true )
  //   } )
  // } )

  // it( 'metodo set en transport fetch', function() {
  //   let data = { name: "set" }
  //   transporter.set( data ).then( ( res ) => {
  //     expect( res ).not.toBe( null )
  //   }, ( err ) => {
  //     expect( true ).not.toBe( true )
  //   } )
  // } )

  // it( 'descarga la cabecera del localhost...', function( next ) {
  //   // Obitiene el fetch element
  //   fetch( 'http://localhost:9000/' ).then( ( res ) => {
  //     // Una prueba
  //     expect( true ).toEqual( true )
  //     next()
  //   } ).catch( err => {
  //     throw err
  //   } )
  // }, 2000 )

} )
