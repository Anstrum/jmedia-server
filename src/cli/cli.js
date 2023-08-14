import { Database, Server } from "../global-state.js";

async function cli(input) {
    switch (input) {
        case "database fill":
            await Database.fill();
            break;
        case "database reset":
            await Database.reset();
            break;
            
        case "server start":
            await Server.start();
            break;
        case "server shutdown":
            await Server.shutdown();
            break;
        case "server restart":
            await Server.shutdown();
            await Server.start();
        break;
        case "database test":
            await Database.test();
        break;
        default:
            console.log("Command not found");
            break;
    }
}

export { cli }