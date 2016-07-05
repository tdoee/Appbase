# Autentificacion desde el servidor

## Usando una autentificación solo con el correo electronico

```javascript

appbase.auth
.signInWithEmail((email /* Enviado al servidor */, next) => {
    // Usamos el email entregado por el cliente para crear una sesión

    let sessionid
    // Creamos un `sessionid`

    next(sessionid) // enviamos el sesión id al cliente
})

```