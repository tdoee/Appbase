# Autentificacion para el cliente

## Inicio de sesion solo con el email
Enviar un email al servidor para activar una sesión con esta cuenta.

```javascript
let email = "example@gmail.com"

appbase.auth.signInWithEmail(email)
.then((session) => {
    let {tokenId, provider} = session
})
```

## Activa la cuenta

```javascript
appbase.auth.signInWithCodeTokenId(code, tokenId)
.then((session) => {
    let {tokenId, provider} = session
})
```

