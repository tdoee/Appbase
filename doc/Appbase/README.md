# Una aplicación con Appbase

## Instalando Appbase
Para ello utiliza [NPM][], en tu aplicación del cliente.

```bash
$ npm install --save appbase
```

Dentro de tu aplicación utiliza la función `require('appbase')` para [importar][import - javascript] appbase.

```javascript
const { Appbase } = require('appbase')
// Con Babel
import { Appbase } from 'appbase'
```

### Primera aplicación
Usamos la sentencia `new Appbase` declarando un objeto con las aplicación contenida.

```javascript
const app = new Appbase()
```

### Como Inicia una aplicación
Cuando se iniciada una aplicación se conforman los valores a utilizar durante el resto dela ejecución, permitiendo comunicar los distintos servicios como la base de datos para ello su utiliza el método `app.initialize()`.

```javascriot
app.initialize()
```

| Opciones | tipo | Valor por defecto | Descripción |
| -------- | ---- | ----------------- | ----------- |
| `url` | **String** | Basada en [`Window.location`][Window.location] | Utiliza como ruta para conectase con el servidor. |
| `apiKey` | **String** | `null` | Es una credencia para autentificar el uso de la API |
| `transport` | **Transport** | `TransportFetch` | Utiliza el transportador para la comunicación con el servidor |

### Entornos predefinidos
Según el uso que le demos a Appbase podemos crear uno o múltiples entornos, esto nos sirve para crear distintas conexiones o distintas aplicaciones en un mismo entorno de ejecución.

#### Nueva aplicación local
Si usamos el operado `new` este es asociado a una variable local pre-definida la cual no es asociada a ningún entorno almacenada.

```javascript
const app = new Appbase()
app.initialize({})
```

#### Entornos almacenados
Estos entornos son almacenados por una memoria en la variable `Appbase`.

```javascript
const app = Appbase.ENV('app 1')
app.initialize({})
```

> También se utilizando la función `Appbase.initialize({})` este obtiene un valor por defecto `DEFAULT`, pudiendo acceder a ella con `Appbase.ENV('DEFAULT')` o `Appbase.ENV()`.

[import - javascript]: https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import
[NPM]: https://www.npmjs.com/
[Window.location]: https://developer.mozilla.org/en-US/docs/Web/API/Window/location
