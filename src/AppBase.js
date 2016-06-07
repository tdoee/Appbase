const appbaseSymbol = Symbol( "AppBase" );

export class AppBase {
	transport() {}
	dataBase() {}
	session() {}
}

export { appbaseSymbol }

export default AppBase
