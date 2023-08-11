import * as manga from './routes/mangas/mangaRouter.js';


async function initRoutes(app) {
    app.get('/', (req, res) => {
        res.send("pong");
    });
}

export { initRoutes };