import * as database from './src/services/database/database.js';
import * as readline from 'readline';
import { Worker, isMainThread, parentPort } from 'worker_threads';
import { cli } from './src/cli/cli.js';

await database.init(false);

const worker = await new Worker('./src/api/server.js');

setTimeout(() => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }); 
    rl.setPrompt('Server reading: '); // Définir l'invite de commande

    rl.on('line', (input) => {
        cli(input);
        rl.prompt();
    });
    rl.prompt();
}, 300);