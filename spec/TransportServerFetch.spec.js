import TransportServerFetch from '../src/drivers/TransportServerFetch'
import TransportFetch from '../src/plugins/TransportFetch'
import express from 'express'
import fetch from 'node-fetch'

describe( 'pruebas a TransportServerFetch', function() {
  let emulateApp
  let transportServer
  let transport
  let portTextServer = 9000
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
    transportServer = new TransportServerFetch( emulateApp )
      // Inicia las rutas
    transportServer.setUp()

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

  const transporter = new TransportFetch( null, 'http://localhost:9000/api/' )

  it( 'initialize transport fetch', function() {
    expect( transporter instanceof TransportFetch ).toBeTruthy()
  } )

  it( 'metodo push en transport fetch', function() {
    let data = { name: "push" }
    transporter.push( data ).then( ( res ) => {
      expect( res ).not.toBe( null )
    }, ( err ) => {
      expect( true ).not.toBe( true )
    } )
  }, 2000 )

  it( 'metodo remove en transport fetch', function() {
    let data = { name: "remove" }
    transporter.remove( data ).then( ( res ) => {
      expect( res ).not.toBe( null )
    }, ( err ) => {
      expect( true ).not.toBe( true )
    } )
  }, 2000 )

  it( 'metodo request en transport fetch', function() {
    let data = { name: "request" }
    transporter.request( data ).then( ( res ) => {
      expect( res.name ).toEqual( 'respuesta server' )
    }, ( err ) => {
      expect( true ).not.toBe( true )
    } )
  } )

  it( 'metodo update en transport fetch', function() {
    let data = { name: "update" }
    transporter.update( data ).then( ( res ) => {
      expect( res ).not.toBe( null )
    }, ( err ) => {
      expect( true ).not.toBe( true )
    } )
  } )

  it( 'metodo set en transport fetch', function() {
    let data = { name: "set" }
    transporter.set( data ).then( ( res ) => {
      expect( res ).not.toBe( null )
    }, ( err ) => {
      expect( true ).not.toBe( true )
    } )
  } )

  it( 'descarga la cabecera del localhost...', function( next ) {
    // Obitiene el fetch element
    fetch( 'http://localhost:9000/' ).then( ( res ) => {
      // Una prueba
      expect( true ).toEqual( true )
      next()
    } ).catch( err => {
      throw err
    } )
  }, 2000 )

} )
