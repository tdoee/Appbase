import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import TransportFetch from '../src/plugins/TransportFetch'

describe('Levanta las pruebas al transporter', function() {
  let emulateApp
  let closeServer = () => {}

  /*
  Despliega el servidor
  */
  beforeAll(function(done) {
    emulateApp = express()

    emulateApp.use(bodyParser.json())

    emulateApp.use('/', function functionName(req, res, next) {
      //console.log(req.body);
      let test = {
        name: "respuesta server",
        age: 23
      }
      res.send(test)
    })

    let server = emulateApp.listen(9000, function() {
      //console.log( "Ready Server port 9000" )
      done()
    })

    closeServer = server.close.bind(server)
  })

  /*
  Cierra el servidor
  */
  afterAll(function(done) {
    closeServer()
    done()
  })

  it('import TransportFetch from appbase-plugins-TransportSocket', function() {
    expect(TransportFetch).toBeDefined()
  })


  const transporter = new TransportFetch(null,'http://localhost:9000')

  it('crear un transport fetch', function() {
    expect( transporter instanceof TransportFetch ).toBeTruthy()
  })

  it('metodo request en transport fetch', function() {
    let data = {name: "jona",age: 23}
    transporter.request(data).then((res) => {
      expect( res.name ).toEqual('respuesta server')
      next()
    },(err) => {
      expect(err).toBe(null);
    })
  },2000);


  it('metodo push en transport fetch', function() {
    let data = {name: "jona",age: 23}
    transporter.push(data).then((res) => {
      expect(res).not.toBe(null);
    },(err) => {
      expect(err).toBe(null);
    })
  },2000)

  it('metodo update en transport fetch', function() {
    let data = {name: "jona",age: 23}
    transporter.update(data).then(() => {
      expect(res).not.toBe(null);
    },(err) => {
      expect(err).toBe(null);
    })
  })

  it('metodo set en transport fetch', function() {
    let data = {name: "jona",age: 23}
    transporter.set(data).then((res) => {
      expect(res).not.toBe(null);
    },(err) => {
      expect(err).toBe(null);
    })
  })

  it('metodo remove en transport fetch', function() {
    let data = {name: "jona",age: 23}
    transporter.remove(data).then((res) => {
      expect(res).not.toBe(null);
    },(err) => {
      expect(err).toBe(null);
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
  }, 2000);

})
