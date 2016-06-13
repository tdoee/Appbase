import TransportServerFetch from '../src/drivers/TransportServerFetch'
import TransportFetch from '../src/plugins/TransportFetch'
import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'

describe('test',function() {
  let emulateApp
  let closeServer = () => {}

  beforeAll(function(done){
    emulateApp = express()
    emulateApp.use(bodyParser.json())

    new TransportServerFetch(emulateApp).setUp()

    let server = emulateApp.listen(9000, function() {
      done()
    })

    closeServer = server.close.bind(server)
  })

  afterAll(function(done) {
    closeServer()
    done()
  })

  it('import TransportServerFetch', function() {
    expect(TransportServerFetch).toBeDefined()
  })

  it('import TransportFetch',function() {
    expect(TransportFetch).toBeDefined()
  })

  const transporter = new TransportFetch(null,'http://localhost:9000/api/')

  it('initialize transport fetch',function(){
    expect( transporter instanceof TransportFetch ).toBeTruthy()
  })

  it('metodo push en transport fetch', function() {
    let data = {name: "push"}
    transporter.push(data).then((res) => {
      expect(res).not.toBe(null)
    },(err) => {
      expect(true).not.toBe(true)
    })
  },2000)

  it('metodo remove en transport fetch', function() {
    let data = {name: "remove"}
    transporter.remove(data).then((res) => {
      expect(res).not.toBe(null)
    },(err) => {
      expect(true).not.toBe(true)
    })
  },2000)

  it('metodo request en transport fetch',function(){
    let data = {name: "request"}
    transporter.request(data).then((res) => {
      expect( res.name ).toEqual('respuesta server')
    },(err) => {
      expect(true).not.toBe(true)
    })
  })

  it('metodo update en transport fetch',function(){
    let data = {name: "update"}
    transporter.update(data).then((res) => {
      expect(res).not.toBe(null)
    },(err) => {
      expect(true).not.toBe(true)
    })
  })

  it('metodo set en transport fetch',function(){
    let data = {name: "set"}
    transporter.set(data).then((res) => {
      expect(res).not.toBe(null)
    },(err) => {
      expect(true).not.toBe(true)
    })
  })

  it('descarga la cabecera del localhost...', function(next) {
    // Obitiene el fetch element
    fetch('http://localhost:9000/').then((res) => {
      // Una prueba
      expect(true).toEqual(true)
      next()
    }).catch(err => {
      throw err
    })
  }, 2000)




})
