# Inicio Rápido

## ¿Que es Appbase?
Appbase es una librería para el control de los distintos servicios para manejar el usuario con una aplicación.

## Contenido
1. [Una aplicación con Appbase][Appbase]
2. [Transportadores (Transport)][Transports]
    1. [Transportadores para el Cliente][Transport Client]
    2. [Transportadores para el Servidor][Transport Server]
3. [Servicio de Autentificacion][Authentication]

## Instalación

```bash
npm install --save appbase
```

## Configuración inicial

```javascript
app.initialize( {
    url: 'http://localhost',
    apiKey: '0',
} )
```

[Appbase]: ./Appbase/README.md
[Transports]: ./Transport/README.md
[Transport Client]: ./Transport/TransportClient.md
[Transport Server]: ./Transport/TransportServer.md
[Authentication]: ./Auth/README.md
