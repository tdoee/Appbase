const appBaseSymbol = Symbol( "AppBase" );

export class AppBase {
	transport() {}
	dataBase() {}
	session() {}
}

export { appBaseSymbol }

export default AppBase
