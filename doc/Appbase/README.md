# Una aplicación con Appbase

## Instalando Appbase
Para ello utiliza [NPM][], en tu aplicación del cliente.

```bash
$ npm install --save appbase
```

Dentro de tu aplicación utiliza la función `require('appbase')` para [importar][import - javascript | MDN] appbase.

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


[import - javascript | MDN]: https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import
[NPM]: https://www.npmjs.com/
[Window.location]: https://developer.mozilla.org/en-US/docs/Web/API/Window/location
