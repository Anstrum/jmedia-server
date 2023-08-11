import express from 'express';
import config from '../../config.json' assert { type: 'json' };
import * as router from './router.js';

const app = express();
const dbConfig = config.api;


async function start() {
    app.use(express.json());

    router.initRoutes(app);

    app.listen(dbConfig.port, () => {
        console.log("Setup: server")
        console.log("no error\n")
    });
}


export { start };