# Una aplicación con Appbase

## Instalando Appbase
Para ello utiliza [NPM], en tu aplicación del cliente.

```bash
$ npm install --save appbase
```

Dentro de tu aplicación utiliza la función `require('appbase')` para [importar][import - javascript | MDN] appbase.

```javascript
const { Appbase } = require('appbase')
// Con Babel
import { Appbase } from 'appbase'
```

### Primera aplicación con Appbase

Usamos la sentencia `new Appbase` declarando un objeto con las aplicación conenida.

```javascript
const app = new Appbase() 
```

[import - javascript | MDN]: https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import
