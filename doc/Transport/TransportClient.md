# Transportador para cliente
El transportador del cliente es una librería que se nos permite conectarnos a un servidor para recurrir a distintos recursos del servidor.

[![Transportador Resaltando el cliente][draw (png) transport client]][draw transport client]
> [draw][draw transport client]

## Como usar
Se requiere tener previamente instalador [`appbase`][Appbase Doc].

## Eventos
### REQUEST
Lo `request` son eventos que nos permiten solicitar información al servidor obtenido una data de retorno con toda la información a leer. Como tal para lo que se requiere.

```javascript
app.transport.request({
    // Data to Send
})
.then(function (data) {
    // Data to response    
})
```

### PUSH
Los `push` son información que requieren solo enviar una información inmediata al servidor, esta no retorna ningún tipo de información.

```javascript
app.transport.push({})
.then(function () {
    // Se ha podido enviar correctamente.
})
.catch(function (err) {
    // No se ha podido enviar por errores del servidor.
})
```

### VALUE
los `values` son retornos de información en cuanto se requieran desde el servidor.

```javascript
app.transport.value({
    from: 'service email'
})
.then(function (feed) {
    feed.each(function (data) {
        // se ejecuta cuando el servidor emita un nuevo dato.
    })

    feed.close() // Cierra la conexión
})
```

[draw (png) transport client]: ../assets/Diagrama%20Transportadores%20Cliente.png
[draw transport client]: https://googledrive.com/host/0B7UPJuUjo-_WbkszaW9Xcll6M2s
[Appbase Doc]: ../Appbase/README.md
