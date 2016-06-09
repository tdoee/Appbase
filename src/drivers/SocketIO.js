/**
 * Driver para el control de Appbase en express.js
 */

let middleware = function( io ) {
	let transportServer = {}

	// Set `uses` on socket.io
	io.use( ( socket, next ) => {
		console.log( "Hola" )

		socket.on( 'update_header', function() {
			console.log( 'is call' )
		} )

		next()
	} )

	return transportServer
}

export default middleware
