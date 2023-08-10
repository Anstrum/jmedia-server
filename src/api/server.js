import express from 'express';
import config from '../../config.json' assert { type: 'json' };

const app = express();
const dbConfig = config.api;


async function start() {


    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

    app.listen(dbConfig.port, () => {
        console.log("Api ready: no error");
    });
}


export { start };