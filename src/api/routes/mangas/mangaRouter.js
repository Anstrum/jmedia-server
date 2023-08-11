import express from 'express';

const mangaRouter = express.Router();

mangaRouter.get('/', (req, res) => {
  res.send('Liste des mangas');
});

mangaRouter.get('/:id', (req, res) => {
  const mangaId = req.params.id;
  res.send(`Détails du manga avec l'ID ${mangaId}`);
});

export { mangaRouter };