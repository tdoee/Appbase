# Autentificacion para el cliente

## Inicio de sesion solo con el email

```javascript
let email = "example@gmail.com"

appbase.auth.signInWithEmail(email)
.then((session) => {
    // Obtiene el id de la sesion generada del servidor
    let {sessionid} = session
})
```


