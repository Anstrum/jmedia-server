import * as database from './src/services/database/database.js';
import * as server from './src/api/server.js'


console.log("\n\nSetup: start\n")
await database.init(false);
await server.start();

