import * as readline from 'readline';
import { cli } from './src/cli/cli.js';
import { Server, Database } from './src/global-state.js';

Server.getInstance();
Database.getInstance();

await Database.init();
await Server.start();


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