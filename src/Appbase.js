import SemVer from 'semver'
import pkg from '../package.json'
const appbaseSymbol = Symbol( "Appbase" );

const versionAppbase = SemVer( pkg.version )

export class Appbase {
	transport() {}
	get VERSION () {
		return versionAppbase
	}
	dataBase() {}
	session() {}
}

Appbase.VERSION = versionAppbase

export { appbaseSymbol }

export default Appbase
