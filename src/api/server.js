import express from 'express';
import config from '../../config.json' assert { type: 'json' };
import * as router from './router.js';

const app = express();
const dbConfig = config.api;


app.use(express.json());

router.initRoutes(app);

app.listen(dbConfig.port, () => {
    console.log("\nSetup: server")
    console.log("no error\n")
});