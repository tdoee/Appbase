/**
 * Driver para el control de Appbase en express.js
 */

let middleware = function( io ) {
	let transportServer = {}

	// Set `uses` on socket.io
	io.use( ( socket, next ) => {
		// console.log( "Hola" )
		next()
	} )

	return transportServer
}

export default middleware
