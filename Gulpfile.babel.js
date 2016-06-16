import babel from 'gulp-babel'
import gulp from 'gulp'
import pkg from './package.json'

const task = gulp.task.bind( gulp )
const src = gulp.src.bind( gulp )
const watch = gulp.watch.bind( gulp )
const dest = gulp.dest.bind( gulp )

process.env.APPBASE_VERSION = pkg.version && `v${pkg.version}`

task( 'build', () => src( 'src/**/*.js' )
	.pipe( babel( {
		"plugins": [
			"transform-inline-environment-variables"
		]
	} ) )
	.pipe( dest( 'lib' ) ) )

task( 'default', [ 'build' ] )
