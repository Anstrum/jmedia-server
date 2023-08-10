import * as database from './src/services/database/database.js';
import * as server from './src/api/server.js'

await database.init();
await server.start();
