import babel from 'gulp-babel'
import gulp from 'gulp'
import pkg from './package.json'

const task = ::gulp.task,
	src = ::gulp.src,
	watch = ::gulp.watch,
	dest = ::gulp.dest

process.env.APPBASE_VERSION = pkg.version && `v${pkg.version}`

task( 'source', () => src( 'src/**/*.js' )
	.pipe( babel( {
		"plugins": [
			"transform-inline-environment-variables"
		]
	} ) )
	.pipe( dest( 'lib' ) ) )

task( 'source:watch', () => {
	watch( [ 'src/**/*.js' ], [ 'source' ] )
} )

task( 'build', [ 'source' ] )
task( 'watch', [ 'build', 'source:watch' ] )
task( 'default', [ 'build' ] )
